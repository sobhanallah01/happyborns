// ============================================================
// Happyborns — secure aggregate stats (read-only)
// Returns ONLY anonymous data (counts, display names + country).
// Never returns contact info.
//   GET /.netlify/functions/stats
//     -> { total, countries, byCountry }
//   GET /.netlify/functions/stats?day=4&month=4
//     -> { total, countries, byCountry, match: { count, countries, members } }
// Token stays server-side (AIRTABLE_TOKEN env var).
//
// Performance: one full Airtable scan is cached in memory for CACHE_TTL_MS
// and shared across all visitors, so a launch spike can't exhaust Airtable's
// rate limit — the table is read at most once per minute per warm instance.
// ============================================================

const AT_BASE  = process.env.AIRTABLE_BASE  || 'appakoQ9jGSHuVEDb';
const AT_TABLE = process.env.AIRTABLE_TABLE || 'Registrations';
const CACHE_TTL_MS = 60 * 1000; // serve cached scan for 60s

const norm = (v) => (v == null ? '' : String(v).trim());

// Module-level cache — persists across invocations on a warm container.
let cache = { at: 0, scan: null };
let inFlight = null; // stampede guard: concurrent requests share one fetch

async function scanTable(token) {
  const base = 'https://api.airtable.com/v0/' + AT_BASE + '/' + encodeURIComponent(AT_TABLE)
    + '?pageSize=100&fields%5B%5D=Day&fields%5B%5D=Month&fields%5B%5D=Country&fields%5B%5D=DisplayName';

  let offset = null;
  let pages  = 0;
  let total  = 0;
  const allCountries = new Set();
  const countryCounts = {};        // name -> count
  const byDate = {};               // "day-month" -> { count, countries:Set, members:[] }

  do {
    const url = base + (offset ? '&offset=' + encodeURIComponent(offset) : '');
    const res = await fetch(url, { headers: { 'Authorization': 'Bearer ' + token } });
    if (!res.ok) {
      const t = await res.text();
      const err = new Error('Airtable read ' + res.status + ': ' + t);
      err.status = res.status;
      throw err;
    }
    const data = await res.json();
    for (const rec of (data.records || [])) {
      const f = rec.fields || {};
      total++;
      const country = norm(f.Country);
      if (country) {
        allCountries.add(country.toLowerCase());
        countryCounts[country] = (countryCounts[country] || 0) + 1;
      }
      const d = norm(f.Day), m = norm(f.Month);
      if (d && m) {
        const key = d + '-' + m;
        let slot = byDate[key];
        if (!slot) { slot = byDate[key] = { count: 0, countries: new Set(), members: [] }; }
        slot.count++;
        if (country) slot.countries.add(country.toLowerCase());
        if (slot.members.length < 60) {
          slot.members.push({ name: norm(f.DisplayName).slice(0, 40), country: country });
        }
      }
    }
    offset = data.offset || null;
    pages++;
  } while (offset && pages < 50);

  return {
    total,
    countries: allCountries.size,
    byCountry: Object.keys(countryCounts).map(name => ({ name, n: countryCounts[name] })),
    byDate
  };
}

async function getScan(token) {
  const now = Date.now();
  if (cache.scan && (now - cache.at) < CACHE_TTL_MS) return cache.scan;
  if (inFlight) return inFlight; // another request is already fetching — share it
  inFlight = (async () => {
    try {
      const scan = await scanTable(token);
      cache = { at: Date.now(), scan };
      return scan;
    } finally {
      inFlight = null;
    }
  })();
  return inFlight;
}

exports.handler = async (event) => {
  const headers = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET, OPTIONS',
    // let the CDN/browser also cache briefly
    'Cache-Control': 'public, max-age=30'
  };

  if (event.httpMethod === 'OPTIONS') return { statusCode: 204, headers, body: '' };
  if (event.httpMethod !== 'GET') {
    return { statusCode: 405, headers, body: JSON.stringify({ error: 'Method not allowed' }) };
  }

  const token = process.env.AIRTABLE_TOKEN;
  if (!token) return { statusCode: 500, headers, body: JSON.stringify({ error: 'Server not configured' }) };

  const q = event.queryStringParameters || {};
  const wantDay   = norm(q.day);
  const wantMonth = norm(q.month);
  const hasDate   = wantDay !== '' && wantMonth !== '';

  try {
    let scan;
    try {
      scan = await getScan(token);
    } catch (err) {
      // If Airtable fails but we have a stale cache, serve it rather than erroring.
      if (cache.scan) { scan = cache.scan; }
      else {
        console.error('Stats scan error:', err && err.message);
        return { statusCode: 502, headers, body: JSON.stringify({ error: 'Read failed' }) };
      }
    }

    const payload = { total: scan.total, countries: scan.countries, byCountry: scan.byCountry };
    if (hasDate) {
      const slot = scan.byDate[wantDay + '-' + wantMonth];
      payload.match = slot
        ? { count: slot.count, countries: slot.countries.size, members: slot.members }
        : { count: 0, countries: 0, members: [] };
    }
    return { statusCode: 200, headers, body: JSON.stringify(payload) };
  } catch (err) {
    console.error('Stats error:', err);
    return { statusCode: 502, headers, body: JSON.stringify({ error: 'Read failed' }) };
  }
};

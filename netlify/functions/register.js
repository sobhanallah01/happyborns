// ============================================================
// Happyborns — server-side registration proxy
// Hides the Airtable token. The browser never sees it.
// Set these in Netlify → Site settings → Environment variables:
//   AIRTABLE_TOKEN   (required, secret)
//   AIRTABLE_BASE    (optional, defaults below)
//   AIRTABLE_TABLE   (optional, defaults below)
// ============================================================

const AT_BASE  = process.env.AIRTABLE_BASE  || 'appakoQ9jGSHuVEDb';
const AT_TABLE = process.env.AIRTABLE_TABLE || 'Registrations';

// Only these fields are accepted from the client (whitelist).
const ALLOWED = ['DisplayName', 'Day', 'Month', 'Country', 'Region', 'language', 'ContactType', 'ContactValue', 'Source'];

exports.handler = async (event) => {
  const headers = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS'
  };

  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 204, headers, body: '' };
  }
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, headers, body: JSON.stringify({ error: 'Method not allowed' }) };
  }

  const token = process.env.AIRTABLE_TOKEN;
  if (!token) {
    return { statusCode: 500, headers, body: JSON.stringify({ error: 'Server not configured' }) };
  }

  let incoming;
  try {
    incoming = JSON.parse(event.body || '{}');
  } catch {
    return { statusCode: 400, headers, body: JSON.stringify({ error: 'Bad JSON' }) };
  }

  // Build a clean record from the whitelist only.
  const fields = {};
  for (const key of ALLOWED) {
    if (typeof incoming[key] === 'string') {
      fields[key] = incoming[key].slice(0, 300); // basic length guard
    }
  }
  fields.SubmittedAt = new Date().toISOString();

  // Minimal validation.
  if (!fields.Day || !fields.Month) {
    return { statusCode: 400, headers, body: JSON.stringify({ error: 'Missing birthday' }) };
  }

  // POST to Airtable; if a column doesn't exist yet, drop it and retry.
  async function postFields(fieldsObj) {
    return fetch(
      'https://api.airtable.com/v0/' + AT_BASE + '/' + encodeURIComponent(AT_TABLE),
      {
        method: 'POST',
        headers: {
          'Authorization': 'Bearer ' + token,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ records: [{ fields: fieldsObj }] })
      }
    );
  }

  try {
    let attemptFields = { ...fields };
    let res, text;

    for (let attempt = 0; attempt < 4; attempt++) {
      res = await postFields(attemptFields);
      text = await res.text();
      if (res.ok) {
        return { statusCode: 200, headers, body: JSON.stringify({ ok: true }) };
      }
      // Unknown column? remove it and retry so the form never breaks.
      if (res.status === 422 && /UNKNOWN_FIELD_NAME/.test(text)) {
        const bad = Object.keys(attemptFields).find(k =>
          text.includes('"' + k + '"') || text.includes('\\"' + k + '\\"')
        );
        if (bad) { delete attemptFields[bad]; continue; }
      }
      break;
    }

    console.error('Airtable error:', res && res.status, text);
    return { statusCode: 502, headers, body: JSON.stringify({ error: 'Save failed' }) };
  } catch (err) {
    console.error('Proxy error:', err);
    return { statusCode: 502, headers, body: JSON.stringify({ error: 'Save failed' }) };
  }
};

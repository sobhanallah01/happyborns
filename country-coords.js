// ============================================================
// Happyborns — approximate country centroids (lon/lat)
// Used to place live dots on the rotating Earth.
// Keys are matched case-insensitively against COUNTRY_LIST names.
// ============================================================

const COUNTRY_COORDS = {
  'United States': [-98, 39],
  'United Kingdom': [-2, 54],
  'Canada': [-106, 56],
  'Australia': [134, -25],
  'France': [2, 46],
  'Germany': [10, 51],
  'Spain': [-4, 40],
  'Italy': [12, 42],
  'Netherlands': [5, 52],
  'Ireland': [-8, 53],
  'Portugal': [-8, 39],
  'Belgium': [4, 50],
  'Switzerland': [8, 47],
  'Austria': [14, 47],
  'Sweden': [15, 62],
  'Norway': [8, 61],
  'Denmark': [10, 56],
  'Finland': [26, 64],
  'Poland': [19, 52],
  'Greece': [22, 39],
  'Czech Republic': [15, 50],
  'Romania': [25, 46],
  'Hungary': [19, 47],
  'Russia': [100, 62],
  'Ukraine': [32, 49],
  'Turkey': [35, 39],
  'Brazil': [-51, -10],
  'Mexico': [-102, 23],
  'Argentina': [-64, -34],
  'Colombia': [-73, 4],
  'Chile': [-71, -35],
  'Peru': [-75, -10],
  'Venezuela': [-66, 7],
  'Ecuador': [-78, -1],
  'Bolivia': [-64, -17],
  'Uruguay': [-56, -33],
  'Paraguay': [-58, -23],
  'India': [79, 22],
  'China': [104, 35],
  'Japan': [138, 37],
  'South Korea': [128, 36],
  'Indonesia': [120, -2],
  'Philippines': [122, 12],
  'Thailand': [101, 15],
  'Vietnam': [106, 16],
  'Malaysia': [110, 3],
  'Singapore': [104, 1],
  'Pakistan': [70, 30],
  'Bangladesh': [90, 24],
  'Saudi Arabia': [45, 24],
  'United Arab Emirates': [54, 24],
  'Israel': [35, 31],
  'Iran': [53, 32],
  'Iraq': [44, 33],
  'Egypt': [30, 27],
  'Morocco': [-6, 32],
  'Algeria': [3, 28],
  'Tunisia': [9, 34],
  'Libya': [17, 27],
  'Nigeria': [8, 10],
  'Kenya': [38, 0],
  'South Africa': [24, -29],
  'Ghana': [-1, 8],
  'Ethiopia': [40, 9],
  'Tanzania': [35, -6],
  'Uganda': [32, 1],
  'Cameroon': [12, 6],
  'Ivory Coast': [-5, 8],
  'Senegal': [-14, 14],
  'New Zealand': [172, -42],
  'Jordan': [36, 31],
  'Lebanon': [36, 34],
  'Qatar': [51, 25],
  'Kuwait': [48, 29],
  'Palestine': [35, 32],
  'Syria': [38, 35],
  'Yemen': [48, 15],
  'Sudan': [30, 16],
  'Afghanistan': [66, 33]
};

// Convert lon/lat to a point on the 440x220 equirectangular strip
// used inside #worldStrip (image drawn at 0,0 sized 440x220).
function coordToStrip(lon, lat) {
  const x = (lon + 180) / 360 * 440;
  const y = (90 - lat) / 180 * 220;
  return { x, y };
}

// ---- Country -> ISO-2 code, for flag emoji ----
const COUNTRY_ISO2 = {
  'United States': 'US', 'United Kingdom': 'GB', 'Canada': 'CA', 'Australia': 'AU',
  'France': 'FR', 'Germany': 'DE', 'Spain': 'ES', 'Italy': 'IT', 'Netherlands': 'NL',
  'Ireland': 'IE', 'Portugal': 'PT', 'Belgium': 'BE', 'Switzerland': 'CH', 'Austria': 'AT',
  'Sweden': 'SE', 'Norway': 'NO', 'Denmark': 'DK', 'Finland': 'FI', 'Poland': 'PL',
  'Greece': 'GR', 'Czech Republic': 'CZ', 'Romania': 'RO', 'Hungary': 'HU', 'Russia': 'RU',
  'Ukraine': 'UA', 'Turkey': 'TR', 'Brazil': 'BR', 'Mexico': 'MX', 'Argentina': 'AR',
  'Colombia': 'CO', 'Chile': 'CL', 'Peru': 'PE', 'Venezuela': 'VE', 'Ecuador': 'EC',
  'Bolivia': 'BO', 'Uruguay': 'UY', 'Paraguay': 'PY', 'India': 'IN', 'China': 'CN',
  'Japan': 'JP', 'South Korea': 'KR', 'Indonesia': 'ID', 'Philippines': 'PH',
  'Thailand': 'TH', 'Vietnam': 'VN', 'Malaysia': 'MY', 'Singapore': 'SG', 'Pakistan': 'PK',
  'Bangladesh': 'BD', 'Saudi Arabia': 'SA', 'United Arab Emirates': 'AE', 'Israel': 'IL',
  'Iran': 'IR', 'Iraq': 'IQ', 'Egypt': 'EG', 'Morocco': 'MA', 'Algeria': 'DZ',
  'Tunisia': 'TN', 'Libya': 'LY', 'Nigeria': 'NG', 'Kenya': 'KE', 'South Africa': 'ZA',
  'Ghana': 'GH', 'Ethiopia': 'ET', 'Tanzania': 'TZ', 'Uganda': 'UG', 'Cameroon': 'CM',
  'Ivory Coast': 'CI', 'Senegal': 'SN', 'New Zealand': 'NZ', 'Jordan': 'JO',
  'Lebanon': 'LB', 'Qatar': 'QA', 'Kuwait': 'KW', 'Palestine': 'PS', 'Syria': 'SY',
  'Yemen': 'YE', 'Sudan': 'SD', 'Afghanistan': 'AF'
};

// Turn a country name into its flag emoji (🇪🇸). Returns '' if unknown.
function flagFor(name) {
  if (!name) return '';
  let iso = COUNTRY_ISO2[name];
  if (!iso) {
    const low = String(name).toLowerCase();
    for (const k in COUNTRY_ISO2) { if (k.toLowerCase() === low) { iso = COUNTRY_ISO2[k]; break; } }
  }
  if (!iso) return '';
  return iso.toUpperCase().replace(/./g, c =>
    String.fromCodePoint(127397 + c.charCodeAt(0)));
}

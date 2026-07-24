const COUNTRIES_DATA = {
  "United States": ["California","Texas","Florida","New York","Pennsylvania","Illinois","Ohio","Georgia","North Carolina","Michigan","New Jersey","Virginia","Washington","Arizona","Massachusetts","Tennessee","Indiana","Missouri","Maryland","Wisconsin","Colorado","Minnesota","South Carolina","Alabama","Louisiana","Kentucky","Oregon","Oklahoma","Connecticut","Utah","Nevada","Iowa","Arkansas","Mississippi","Kansas","New Mexico","Nebraska","Idaho","West Virginia","Hawaii","New Hampshire","Maine","Rhode Island","Montana","Delaware","South Dakota","North Dakota","Alaska","Vermont","Wyoming"],
  "United Kingdom": ["England","Scotland","Wales","Northern Ireland"],
  "Canada": ["Ontario","Quebec","British Columbia","Alberta","Manitoba","Saskatchewan","Nova Scotia","New Brunswick","Newfoundland and Labrador","Prince Edward Island"],
  "Australia": ["New South Wales","Victoria","Queensland","Western Australia","South Australia","Tasmania","Northern Territory","Australian Capital Territory"],
  "France": ["Île-de-France","Auvergne-Rhône-Alpes","Bourgogne-Franche-Comté","Brittany","Centre-Val de Loire","Corsica","Grand Est","Occitanie","Normandy","Nouvelle-Aquitaine","Pays de la Loire","Provence-Alpes-Côte d'Azur","Hauts-de-France"],
  "Germany": ["Bavaria","Berlin","Baden-Württemberg","Brandenburg","Bremen","Hamburg","Hesse","Lower Saxony","Mecklenburg-Vorpommern","North Rhine-Westphalia","Rhineland-Palatinate","Saarland","Saxony","Saxony-Anhalt","Schleswig-Holstein","Thuringia"],
  "Spain": ["Madrid","Catalonia","Andalusia","Valencia","Basque Country","Galicia","Castile and León","Castilla–La Mancha","Canary Islands","Balearic Islands","Aragon","Extremadura","Asturias","Murcia","Navarre","Cantabria","La Rioja"],
  "Italy": ["Lazio","Lombardy","Campania","Sicily","Veneto","Piedmont","Apulia","Emilia-Romagna","Tuscany","Sardinia","Calabria","Liguria","Marche","Abruzzo","Umbria","Friuli-Venezia Giulia","Trentino-Alto Adige","Molise","Aosta Valley","Basilicata"],
  "Japan": ["Tokyo","Osaka","Kanagawa","Aichi","Saitama","Chiba","Hyogo","Hokkaido","Fukuoka","Shizuoka"],
  "China": ["Beijing","Shanghai","Guangdong","Jiangsu","Shandong","Zhejiang","Henan","Sichuan","Hubei","Hunan"],
  "India": ["Delhi","Maharashtra","Uttar Pradesh","West Bengal","Tamil Nadu","Karnataka","Gujarat","Rajasthan","Kerala","Punjab","Haryana","Madhya Pradesh","Bihar","Andhra Pradesh","Telangana"],
  "Indonesia": ["Jakarta","West Java","East Java","Central Java","North Sumatra","Banten","South Sumatra","South Sulawesi","Bali","Riau"],
  "Malaysia": ["Selangor","Sabah","Sarawak","Johor","Perak","Kelantan","Kuala Lumpur","Penang","Kedah","Terengganu"],
  "Brazil": ["São Paulo","Rio de Janeiro","Minas Gerais","Bahia","Paraná","Rio Grande do Sul","Pernambuco","Ceará","Pará","Santa Catarina"],
  "Turkey": ["Istanbul","Ankara","Izmir","Bursa","Antalya","Adana","Konya","Gaziantep","Mersin","Diyarbakır","Kayseri","Samsun","Şanlıurfa","Trabzon"],
  "Iran": ["Tehran","Isfahan","Khuzestan","Razavi Khorasan","Fars","East Azerbaijan","West Azerbaijan","Mazandaran","Kerman","Sistan and Baluchestan"],
  "Pakistan": ["Punjab","Sindh","Khyber Pakhtunkhwa","Balochistan","Islamabad Capital Territory","Gilgit-Baltistan","Azad Kashmir"],
  "Nigeria": ["Lagos","Kano","Rivers","Kaduna","Oyo","Abuja","Ogun","Borno","Anambra","Delta"],
  "Senegal": ["Dakar","Thiès","Saint-Louis","Diourbel","Kaolack","Ziguinchor","Kolda","Matam","Fatick","Louga","Kaffrine","Sédhiou","Kédougou","Tambacounda"],
  "Saudi Arabia": ["Riyadh","Makkah","Madinah","Eastern Province","Asir","Tabuk","Ha'il","Northern Borders","Jazan","Najran","Al Bahah","Al Jawf","Qassim"],
  "United Arab Emirates": ["Abu Dhabi","Dubai","Sharjah","Ajman","Umm Al Quwain","Ras Al Khaimah","Fujairah"],
  "Egypt": ["Cairo","Giza","Alexandria","Dakahlia","Beheira","Sharqia","Monufia","Qalyubia","Kafr El Sheikh","Gharbia","Damietta","Port Said","Ismailia","Suez","North Sinai","South Sinai","Faiyum","Beni Suef","Minya","Asyut","Sohag","Qena","Luxor","Aswan","Red Sea","New Valley","Matrouh"],
  "Morocco": ["Rabat","Casablanca","Fez","Marrakesh","Tangier","Agadir","Meknes","Oujda","Kenitra","Tetouan","Safi","El Jadida","Beni Mellal","Khouribga","Settat","Nador","Laayoune","Essaouira","Taza","Taroudant","Errachidia","Ouarzazate","Al Hoceima","Salé","Mohammedia","Chefchaouen","Ifrane","Khenifra","Taounate","Zagora","Driouch","Sidi Bennour"],
  "Algeria": ["Adrar","Chlef","Laghouat","Oum El Bouaghi","Batna","Béjaïa","Biskra","Béchar","Blida","Bouira","Tamanrasset","Tébessa","Tlemcen","Tiaret","Tizi Ouzou","Algiers","Djelfa","Jijel","Sétif","Saïda","Skikda","Sidi Bel Abbès","Annaba","Guelma","Constantine","Médéa","Mostaganem","M'Sila","Mascara","Ouargla","Oran","El Bayadh","Illizi","Bordj Bou Arréridj","Boumerdès","El Tarf","Tindouf","Tissemsilt","El Oued","Khenchela","Souk Ahras","Tipaza","Mila","Aïn Defla","Naâma","Aïn Témouchent","Ghardaïa","Relizane","Timimoun","Bordj Badji Mokhtar","Ouled Djellal","Béni Abbès","In Salah","In Guezzam","Touggourt","Djanet","El M'Ghair","El Menia"],
  "Tunisia": ["Tunis","Sfax","Sousse","Kairouan","Bizerte","Gabès","Ariana","Gafsa","Monastir","Nabeul","Medenine","Tataouine","Tozeur","Sidi Bouzid","Jendouba","Kef","Siliana","Zaghouan","Béja","Kebili","Mahdia","Ben Arous","Manouba"],
  "Libya": ["Tripoli","Benghazi","Misrata","Zawiya","Sabha","Bayda","Zliten","Ajdabiya","Derna","Sirte","Gharyan","Khoms","Tobruk","Nalut","Sabratha","Ghat","Marzuq","Ubari"],
  "Sudan": ["Khartoum","Gezira","White Nile","Blue Nile","Sennar","Gedaref","Kassala","Red Sea","River Nile","North Kordofan","South Kordofan","West Kordofan","North Darfur","South Darfur","East Darfur","West Darfur","Central Darfur","Northern"],
  "Kuwait": ["Capital","Hawalli","Farwaniya","Mubarak Al-Kabeer","Ahmadi","Jahra"],
  "Qatar": ["Doha","Al Rayyan","Al Wakrah","Umm Salal","Al Khor","Al Shamal","Al Shahaniya","Al Daayen"],
  "Bahrain": ["Capital","Northern","Southern","Central","Muharraq"],
  "Oman": ["Muscat","Dhofar","Musandam","Al Buraimi","Ad Dakhiliyah","Ad Dhahirah","North Al Batinah","South Al Batinah","North Ash Sharqiyah","South Ash Sharqiyah","Al Wusta"],
  "Yemen": ["Sana'a","Aden","Taiz","Hodeidah","Ibb","Dhamar","Hadramaut","Al Mahrah","Shabwah","Abyan","Lahij","Al Dhale'e","Al Bayda","Ma'rib","Al Jawf","Saada","Hajjah","Al Mahwit","Amran","Raymah"],
  "Iraq": ["Baghdad","Basra","Nineveh","Erbil","Najaf","Karbala","Anbar","Diyala","Dhi Qar","Kirkuk","Babylon","Wasit","Maysan","Saladin","Muthanna","Al-Qādisiyyah","Dohuk","Sulaymaniyah"],
  "Syria": ["Damascus","Aleppo","Homs","Hama","Latakia","Tartus","Idlib","Daraa","As-Suwayda","Quneitra","Deir ez-Zor","Raqqa","Al-Hasakah","Rif Dimashq"],
  "Lebanon": ["Beirut","Mount Lebanon","North","Beqaa","Nabatieh","South","Akkar","Baalbek-Hermel"],
  "Jordan": ["Amman","Irbid","Zarqa","Balqa","Mafraq","Karak","Ma'an","Tafilah","Madaba","Jerash","Ajloun","Aqaba"],
  "Palestine": ["Jerusalem","Ramallah and al-Bireh","Gaza","Hebron","Nablus","Bethlehem","Jenin","Tulkarm","Qalqilya","Salfit","Tubas","Khan Yunis","Rafah","Deir al-Balah","North Gaza","Qabatiya"],
  "Mauritania": ["Nouakchott","Trarza","Brakna","Assaba","Gorgol","Dakhlet Nouadhibou","Tiris Zemmour","Adrar","Inchiri","Tagant","Guidimaka","Hodh Ech Chargui","Hodh El Gharbi"],
  "Somalia": ["Mogadishu","Banaadir","Jubaland","Puntland","Somaliland","Galmudug","Hirshabelle","Southwest"],
  "Djibouti": ["Djibouti","Ali Sabieh","Dikhil","Obock","Tadjourah","Arta"],
  "Comoros": ["Moroni","Anjouan","Mohéli","Grande Comore"]
};

const COUNTRY_LIST = [
  "United States","United Kingdom","Canada","Australia",
  "France","Germany","Spain","Italy",
  "Japan","China","India","Indonesia","Malaysia","Brazil",
  "Turkey","Iran","Pakistan","Nigeria","Senegal",
  "Saudi Arabia","United Arab Emirates","Egypt","Morocco","Algeria","Tunisia","Libya","Sudan",
  "Kuwait","Qatar","Bahrain","Oman","Yemen","Iraq","Syria","Lebanon","Jordan","Palestine",
  "Mauritania","Somalia","Djibouti","Comoros",
  "Other"
];

// ISO 3166-1 alpha-2 codes — used to translate country names via Intl.DisplayNames.
// Keys must match COUNTRY_LIST exactly. "Other" has no code (handled separately).
const COUNTRY_ISO = {
  "United States": "US", "United Kingdom": "GB", "Canada": "CA", "Australia": "AU",
  "France": "FR", "Germany": "DE", "Spain": "ES", "Italy": "IT",
  "Japan": "JP", "China": "CN", "India": "IN", "Indonesia": "ID",
  "Malaysia": "MY", "Brazil": "BR", "Turkey": "TR", "Iran": "IR",
  "Pakistan": "PK", "Nigeria": "NG", "Senegal": "SN", "Saudi Arabia": "SA",
  "United Arab Emirates": "AE", "Egypt": "EG", "Morocco": "MA", "Algeria": "DZ",
  "Tunisia": "TN", "Libya": "LY", "Sudan": "SD", "Kuwait": "KW",
  "Qatar": "QA", "Bahrain": "BH", "Oman": "OM", "Yemen": "YE",
  "Iraq": "IQ", "Syria": "SY", "Lebanon": "LB", "Jordan": "JO",
  "Palestine": "PS", "Mauritania": "MR", "Somalia": "SO", "Djibouti": "DJ",
  "Comoros": "KM"
};

const COUNTRY_CALLING_CODES = {
  "United States": "+1", "United Kingdom": "+44", "Canada": "+1",
  "Australia": "+61", "France": "+33", "Germany": "+49",
  "Spain": "+34", "Italy": "+39", "Japan": "+81",
  "China": "+86", "India": "+91", "Indonesia": "+62",
  "Malaysia": "+60", "Brazil": "+55", "Turkey": "+90",
  "Iran": "+98", "Pakistan": "+92", "Nigeria": "+234",
  "Senegal": "+221", "Saudi Arabia": "+966", "United Arab Emirates": "+971",
  "Egypt": "+20", "Morocco": "+212", "Algeria": "+213",
  "Tunisia": "+216", "Libya": "+218", "Sudan": "+249",
  "Kuwait": "+965", "Qatar": "+974", "Bahrain": "+973",
  "Oman": "+968", "Yemen": "+967", "Iraq": "+964",
  "Syria": "+963", "Lebanon": "+961", "Jordan": "+962",
  "Palestine": "+970", "Mauritania": "+222", "Somalia": "+252",
  "Djibouti": "+253", "Comoros": "+269"
};

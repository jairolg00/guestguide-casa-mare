// GuestGuide: carga los datos públicos del alojamiento desde property.js.
let lang = 'es';
const property = window.GUESTGUIDE_PROPERTY || {};
const btn = document.getElementById('langBtn');

function applyPropertyData() {
  const localized = (value) => {
    const text = typeof value === 'string' ? value : (value?.[lang] || '');
    return text.replaceAll('{{name}}', property.name || '');
  };
  document.title = (property.name || 'GuestGuide') + ' | GuestGuide';
  const fields = {
    propertyName: property.name,
    propertyLocation: property.locationLabel,
    propertyEyebrow: property.eyebrow,
    propertyWelcome: property.welcomeTitle,
    propertyIntro: property.intro,
    propertyCity: property.cityLabel,
    demoLabel: property.demoLabel
  };
  for (const [id, value] of Object.entries(fields)) {
    const el = document.getElementById(id);
    if (el && value) el.innerHTML = localized(value);
  }
}

function applyLanguage() {
  document.documentElement.lang = lang;
  document.querySelectorAll('[data-es]').forEach((el) => {
    const value = el.getAttribute('data-' + lang);
    if (value !== null) el.innerHTML = value;
  });
  btn.textContent = lang === 'es' ? 'ENGLISH ↗' : 'ESPAÑOL ↗';
  applyPropertyData();
}

btn.addEventListener('click', () => {
  lang = lang === 'es' ? 'en' : 'es';
  applyLanguage();
});
applyLanguage();

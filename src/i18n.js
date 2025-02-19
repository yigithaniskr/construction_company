import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import translationTR from './locales/tr.json';
import translationEN from './locales/en.json';

// ✅ LocalStorage'den önceki dili al (Varsayılan olarak Türkçe)
const savedLanguage = localStorage.getItem('selectedLanguage') || 'tr';

const resources = {
  tr: { translation: translationTR },
  en: { translation: translationEN }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: savedLanguage, // ✅ Kullanıcının seçtiği dil
    fallbackLng: 'tr', // ✅ Eğer seçili dil yüklenemezse Türkçe kullan
    interpolation: { escapeValue: false }
  });

// ✅ Dil değiştiğinde yeni dili LocalStorage'e kaydet
i18n.on('languageChanged', (lng) => {
  localStorage.setItem('selectedLanguage', lng);
});

export default i18n;

import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import es from './locales/es';
import en from './locales/en';

let savedLanguage = 'es';
try {
    savedLanguage = localStorage.getItem('language') || 'es';
} catch {
    // localStorage not available
}

i18n.use(initReactI18next).init({
    resources: {
        es: { translation: es },
        en: { translation: en },
    },
    lng: savedLanguage,
    fallbackLng: 'es',
    interpolation: {
        escapeValue: false,
    },
});

i18n.on('languageChanged', (lng) => {
    try {
        localStorage.setItem('language', lng);
    } catch {
        // localStorage not available
    }
});

export default i18n;

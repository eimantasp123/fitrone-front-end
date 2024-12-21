import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// Initialize i18n for the test environment
i18n.use(initReactI18next).init({
  lng: "en", // Set default test language
  fallbackLng: "en",
  resources: {
    en: {
      translation: {}, // Mock resources can be empty or include keys used in your tests
    },
  },
  interpolation: {
    escapeValue: false, // React already handles escaping
  },
});

export default i18n;

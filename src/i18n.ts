import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

// Import  translation files
import enAuth from "./locales/en/authentication.json";
import ltAuth from "./locales/lt/authentication.json";
import enLanguage from "./locales/en/languageSwitcher.json";
import ltLanguage from "./locales/lt/languageSwitcher.json";
import enProfileSettings from "./locales/en/profileSettings.json";
import ltProfileSettings from "./locales/lt/profileSettings.json";
import enHeader from "./locales/en/header.json";
import ltHeader from "./locales/lt/header.json";
import enSidebar from "./locales/en/sidebarMenu.json";
import ltSidebar from "./locales/lt/sidebarMenu.json";
import enErrorPage from "./locales/en/errorPage.json";
import ltErrorPage from "./locales/lt/errorPage.json";

// Initialize i18n
i18n
  .use(LanguageDetector)
  .use(initReactI18next) // Pass i18n instance to react-i18next.
  .init({
    resources: {
      en: {
        auth: enAuth,
        language: enLanguage,
        profileSettings: enProfileSettings,
        header: enHeader,
        sidebar: enSidebar,
        errorPage: enErrorPage,
      },
      lt: {
        auth: ltAuth,
        language: ltLanguage,
        profileSettings: ltProfileSettings,
        header: ltHeader,
        sidebar: ltSidebar,
        errorPage: ltErrorPage,
      },
    },
    fallbackLng: "en", // Fallback language if the current language is not available
    interpolation: {
      escapeValue: false, // React already does escaping
    },
    detection: {
      order: [
        "localStorage",
        "cookie",
        "navigator",
        "htmlTag",
        "path",
        "subdomain",
      ],
      caches: ["localStorage", "cookie"],
    },
  });

export default i18n;

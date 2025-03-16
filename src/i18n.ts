import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

/**
 * Importing all the translation files
 */
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
import enCommon from "./locales/en/common.json";
import ltCommon from "./locales/lt/common.json";
import enMeals from "./locales/en/meals.json";
import ltMeals from "./locales/lt/meals.json";
import enSubscription from "./locales/en/subscription.json";
import ltSubscription from "./locales/lt/subscription.json";
import enDashboard from "./locales/en/dashboard.json";
import ltDashboard from "./locales/lt/dashboard.json";
import enWeeklyPlan from "./locales/en/weeklyPlan.json";
import ltWeeklyPlan from "./locales/lt/weeklyPlan.json";
import enMenu from "./locales/en/weeklyMenu.json";
import ltMenu from "./locales/lt/weeklyMenu.json";
import enTimezones from "./locales/en/timezones.json";
import ltTimezones from "./locales/lt/timezones.json";
import enCustomers from "./locales/en/customers.json";
import ltCustomers from "./locales/lt/customers.json";
import enGroups from "./locales/en/groups.json";
import ltGroups from "./locales/lt/groups.json";
import enOrders from "./locales/en/orders.json";
import ltOrders from "./locales/lt/orders.json";
import enFaq from "./locales/en/faq.json";
import ltFaq from "./locales/lt/faq.json";

/**
 *  Instance of i18n
 */
i18n
  .use(LanguageDetector)
  .use(initReactI18next) // Pass i18n instance to react-i18next.
  .init({
    resources: {
      en: {
        common: enCommon,
        auth: enAuth,
        language: enLanguage,
        profileSettings: enProfileSettings,
        header: enHeader,
        sidebar: enSidebar,
        errorPage: enErrorPage,
        meals: enMeals,
        subscription: enSubscription,
        dashboard: enDashboard,
        weeklyPlan: enWeeklyPlan,
        weeklyMenu: enMenu,
        timezone: enTimezones,
        customers: enCustomers,
        groups: enGroups,
        orders: enOrders,
        faq: enFaq,
      },
      lt: {
        common: ltCommon,
        auth: ltAuth,
        language: ltLanguage,
        profileSettings: ltProfileSettings,
        header: ltHeader,
        sidebar: ltSidebar,
        errorPage: ltErrorPage,
        meals: ltMeals,
        subscription: ltSubscription,
        dashboard: ltDashboard,
        weeklyPlan: ltWeeklyPlan,
        weeklyMenu: ltMenu,
        timezone: ltTimezones,
        customers: ltCustomers,
        groups: ltGroups,
        orders: ltOrders,
        faq: ltFaq,
      },
    },
    fallbackLng: "en", // Fallback language if the current language is not available
    interpolation: {
      escapeValue: false, // React already does escaping
    },
    detection: {
      order: ["querystring", "localStorage", "cookie", "navigator"],
      lookupQuerystring: "lang", // Explicitly define the query parameter
      caches: ["localStorage", "cookie"],
    },
  });

export default i18n;

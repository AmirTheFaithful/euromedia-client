import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import enCommon from "./locales/en/common.json";
import enHome from "./locales/en/home.json";
import enAuth from "./locales/en/auth.json";

import uaCommon from "./locales/ua/common.json";
import uaHome from "./locales/ua/home.json";
import uaAuth from "./locales/ua/auth.json";

import enColors from "./locales/en/colors.json";
import uaColors from "./locales/ua/colors.json";

void i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: { common: enCommon, home: enHome, auth: enAuth, colors: enColors },
      ua: { common: uaCommon, home: uaHome, auth: uaAuth, colors: uaColors },
    },
    fallbackLng: "ua",
    lng: "ua",
    ns: ["common", "auth", "colors"],
    defaultNS: "common",
    interpolation: { escapeValue: false },
    detection: {
      order: ["localStorage", "navigation"],
      caches: ["localStorage"],
    },
  });

export default i18n;

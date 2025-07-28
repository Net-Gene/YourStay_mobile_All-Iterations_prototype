import i18n from "i18next"
import { initReactI18next } from "react-i18next"
import LanguageDetector from "i18next-browser-languagedetector"

// Import all translation files
import enTranslation from "../locales/en/translation.json"
import fiTranslation from "../locales/fi/translation.json"
import svTranslation from "../locales/sv/translation.json"
/*
import deTranslation from "../locales/de/translation.json"
import frTranslation from "../public/locales/fr/translation.json"
import esTranslation from "../public/locales/es/translation.json"
import zhTranslation from "../public/locales/zh/translation.json"
import jaTranslation from "../public/locales/ja/translation.json"
import ruTranslation from "../public/locales/ru/translation.json"
import arTranslation from "../public/locales/ar/translation.json"
import etTranslation from "../public/locales/et/translation.json"
import noTranslation from "../public/locales/no/translation.json"
import plTranslation from "../public/locales/pl/translation.json"
import daTranslation from "../public/locales/da/translation.json"
import itTranslation from "../public/locales/it/translation.json"
import trTranslation from "../public/locales/tr/translation.json"
import ptTranslation from "../public/locales/pt/translation.json"
import nlTranslation from "../public/locales/nl/translation.json"
import csTranslation from "../public/locales/cs/translation.json"
import koTranslation from "../public/locales/ko/translation.json"
*/
// Define supported languages
export const supportedLanguages = [
  "en",
  "fi",
  "sv",
  /*
  "de",
  "fr",
  "es",
  "zh",
  "ja",
  "ru",
  "ar",
  "et",
  "no",
  "pl",
  "da",
  "it",
  "tr",
  "pt",
  "nl",
  "cs",
  "ko",
  */
] as const

export type SupportedLanguage = (typeof supportedLanguages)[number]

// Resources object with all translations
const resources = {
  en: { translation: enTranslation },
  fi: { translation: fiTranslation },
  sv: { translation: svTranslation },
 /*
  de: { translation: deTranslation },
  fr: { translation: frTranslation },
  es: { translation: esTranslation },
  zh: { translation: zhTranslation },
  ja: { translation: jaTranslation },
  ru: { translation: ruTranslation },
  ar: { translation: arTranslation },
  et: { translation: etTranslation },
  no: { translation: noTranslation },
  pl: { translation: plTranslation },
  da: { translation: daTranslation },
  it: { translation: itTranslation },
  tr: { translation: trTranslation },
  pt: { translation: ptTranslation },
  nl: { translation: nlTranslation },
  cs: { translation: csTranslation },
  ko: { translation: koTranslation },
  */
}

i18n
  // Detect user language
  .use(LanguageDetector)
  // Pass the i18n instance to react-i18next
  .use(initReactI18next)
  // Initialize i18next
  .init({
    resources,
    fallbackLng: "en",
    debug: process.env.NODE_ENV === "development",

    // Language detection options
    detection: {
      order: ["localStorage", "navigator", "htmlTag"],
      caches: ["localStorage"],
      lookupLocalStorage: "hostel-language",
    },

    interpolation: {
      escapeValue: false, // React already escapes values
    },

    // Namespace configuration
    defaultNS: "translation",
    ns: ["translation"],

    // React specific options
    react: {
      useSuspense: false, // We'll handle loading states manually
    },
  })

export default i18n

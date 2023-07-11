// i18n.js
import i18next from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";
import translationsUkr from "../translations/Ukr/translationUkr";
import translationsRU from "../translations/Ru/translationRu";
import translationsEng from "../translations/Eng/translationEn";

i18next
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: "uk",
    debug: false,
    interpolation: {
      escapeValue: false,
    },
    resources: {
      uk: {
        translation: translationsUkr,
      },
      en: {
        translation: translationsEng,
      },
      ru: {
        translation: translationsRU,
      },
    },
  });

export default i18next;

import i18next from "i18next";
import enTranslation from "./en/translation.json";
import ptTranslation from "./pt/translation.json";
import { initReactI18next } from "react-i18next";

const resources = {
  en: {
    translation: enTranslation,
  },
  pt: {
    translation: ptTranslation,
  },
};

i18next.use(initReactI18next).init({
  resources,
  lng: "en",
  interpolation: {
    escapeValue: false,
  },
});

export default i18next;

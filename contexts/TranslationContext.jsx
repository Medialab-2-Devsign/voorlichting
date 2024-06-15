import { createContext } from "react";
import { I18n } from "i18n-js";
import enUS from "../translations/en-US.json";
import nlNL from "../translations/nl-NL.json";

export const TranslationContext = createContext();
export const TranslationProvider = ({ children, defaultLocale }) => {
  const i18n = new I18n({
    "en-US": enUS,
    "nl-NL": nlNL,
  });

  i18n.enableFallback = true;
  i18n.defaultLocale = defaultLocale;
  i18n.availableLocales = [
    { code: "en-US", languageString: "English" },
    { code: "nl-NL", languageString: "Nederlands" },
  ];

  function changeLocale(locale) {
    i18n.locale = locale;
  }

  return (
    <TranslationContext.Provider value={{ i18n, changeLocale }}>
      {children}
    </TranslationContext.Provider>
  );
};

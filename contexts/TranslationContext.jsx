import { createContext } from "react";
import { I18n } from "i18n-js";
import enUS from "../translations/en-US.json";
import nl from "../translations/nl.json";
import tr from "../translations/tr.json";
import ja from "../translations/ja.json";
import es from "../translations/es.json";
import fr from "../translations/fr.json";
import de from "../translations/de.json";
import it from "../translations/it.json";
import pt from "../translations/pt.json";
import ru from "../translations/ru.json";
import zhCN from "../translations/zh-CN.json";

export const TranslationContext = createContext();
export const TranslationProvider = ({ children, defaultLocale }) => {
  const i18n = new I18n({
    "en-US": enUS,
    nl: nl,
    tr: tr,
    ja: ja,
    es: es,
    fr: fr,
    de: de,
    it: it,
    pt: pt,
    ru: ru,
    "zh-CN": zhCN,
  });

  i18n.enableFallback = true;
  i18n.defaultLocale = defaultLocale;
  changeLocale(defaultLocale);
  i18n.availableLocales = [
    { code: "en-US", languageString: "English" },
    { code: "nl", languageString: "Nederlands" },
    { code: "tr", languageString: "Türkçe" },
    { code: "ja", languageString: "日本語" },
    { code: "es", languageString: "Español" },
    { code: "fr", languageString: "Français" },
    { code: "de", languageString: "Deutsch" },
    { code: "it", languageString: "Italiano" },
    { code: "pt", languageString: "Português" },
    { code: "ru", languageString: "Русский" },
    { code: "zh-CN", languageString: "中文 (简体)" },
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

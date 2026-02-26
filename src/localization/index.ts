import { nextTick } from "vue";
import { createI18n, type I18n } from "vue-i18n";

let i18n = null as unknown as I18n;

const SUPPORT_LOCALES = ["en", "tr"];

// Dil dosyalarının cache'lenmiş halini tutmak için
const loadedLocales = new Set<string>();

const returnBrowserLanguage = () => {
  let lang = localStorage.getItem("app-locale");

  if (lang) {
    document.querySelector("html")!.lang = lang;
    return lang;
  }

  lang = document.querySelector("html")?.lang || "en";

  if (lang.indexOf("-") > -1) lang = lang.split("-")[0] as string;

  if (!SUPPORT_LOCALES.includes(lang)) lang = "en";

  document.querySelector("html")!.lang = lang;

  return lang;
};

async function loadLocaleMessages(locale: string) {
  // Eğer dil zaten yüklenmişse işlem yapma
  if (loadedLocales.has(locale)) {
    return nextTick();
  }

  // Lazy loading ile dil dosyasını yükle
  const messages = await import(
    /* webpackChunkName: "locale-[request]" */ `./locales/${locale}.json`
  );

  // Dil mesajlarını i18n'e ekle
  i18n.global.setLocaleMessage(locale, messages.default);

  // Yüklenen dili cache'le
  loadedLocales.add(locale);

  return nextTick();

  // // Lazy loading ile dil dosyasını yükle
  // import(/* webpackChunkName: "locale-[request]" */ `./locales/${locale}.json`).then((module) => {
  //   const messages = module.default;

  //   // Dil mesajlarını i18n'e ekle
  //   i18n.global.setLocaleMessage(locale, messages);

  //   // Yüklenen dili cache'le
  //   loadedLocales.add(locale);

  //   return nextTick();
  // });
}

function setI18nLanguage(locale: string) {
  if (i18n.global.locale.value === locale) return;
  i18n.global.locale.value = locale;

  /**
   * NOTE:
   * If you need to specify the language setting for headers, such as the `fetch` API, set it here.
   * The following is an example for axios.
   *
   * axios.defaults.headers.common['Accept-Language'] = locale
   */

  document.querySelector("html")?.setAttribute("lang", locale as string);
}

async function setupI18n(options = { locale: returnBrowserLanguage() }) {
  i18n = createI18n({
    legacy: false,
    fallbackLocale: "en",
    globalInjection: true,
    ...options,
  }) as I18n;

  if (!loadedLocales.has(options.locale)) {
    await loadLocaleMessages(options.locale);
    setI18nLanguage(options.locale);
  }
}

await setupI18n();

export { i18n, loadLocaleMessages, setI18nLanguage, SUPPORT_LOCALES };

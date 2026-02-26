import { createRouter, createWebHistory } from "vue-router";
import { routes } from "./routes";
import { SUPPORT_LOCALES, i18n, loadLocaleMessages, setI18nLanguage } from "@/localization";
import { type I18n } from "vue-i18n";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

// Router'ı i18n ile yapılandır
export function setupRouter(i18n: I18n) {
  router.beforeEach(async (to, _) => {
    const paramsLocale = to.params.locale as string;

    // Locale parametresi gereklidir
    if (!paramsLocale) {
      return "/";
    }

    // Desteklenmeyen dil ise aynı sayfanın İngilizce versiyonuna yönlendir
    if (!SUPPORT_LOCALES.includes(paramsLocale)) {
      // to.path ör: /xx/dashboard. İlk segmenti 'en' ile değiştir.
      const newPath = to.path.replace(`/${paramsLocale}`, "/en");

      return {
        path: newPath,
        query: to.query,
        hash: to.hash,
      };
    }

    // Dil dosyasını lazy loading ile yükle
    if (!i18n.global.availableLocales.includes(paramsLocale)) {
      await loadLocaleMessages(paramsLocale);
      // I18n Dilini Güncelle
    }
    setI18nLanguage(paramsLocale);

    // @ts-ignore
    document.title = i18n.global.t(`page.title.${to.meta.title as string}`);
  });

  return router;
}

export default router;

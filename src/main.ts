import { createApp } from "vue";
import { createPinia } from "pinia";
import { i18n } from "./localization";
import { setupRouter } from "./router";
import App from "./App.vue";
import router from "./router";

import "@/assets/index.css";

async function bootstrap() {
  // // Öncelikli locale: localStorage -> URL path segment -> 'en'
  // const saved = localStorage.getItem("app-locale");
  // const pathLocale = window.location.pathname.split("/")[1];
  // const initialLocale = (saved || pathLocale || "en").toLowerCase();

  // const i18n = setupI18n({ locale: initialLocale });

  // // Eğer başlangıç locale'u yüklü değilse lazy load et (loadLocaleMessages içinde cache kontrolü var)
  // await loadLocaleMessages(i18n, initialLocale);
  // setI18nLanguage(i18n, initialLocale);

  // router guard'ı i18n ile bağla

  const app = createApp(App);

  app.use(createPinia());
  app.use(i18n);
  app.use(router);
  setupRouter(i18n);

  app.mount("#app");
}

bootstrap();

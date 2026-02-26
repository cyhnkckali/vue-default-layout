import type { RouteRecordRaw } from "vue-router";
import DefaultView from "@/layout/DefaultView.vue";

export const routes: RouteRecordRaw[] = [
  {
    path: "/:locale",
    component: DefaultView,
    redirect: (to) => {
      // Eğer sadece /en gibi bir path'e gelinirse dashboard'a yönlendir
      return `/${to.params.locale}/dashboard`;
    },
    children: [
      {
        path: "dashboard",
        component: () => import("@/views/DashboardView.vue"),
        meta: {
          title: "home",
          isAuthenticated: true,
        },
      },
    ],
  },
  {
    path: "/",
    redirect: () => {
      // localStorage'dan dili oku veya default 'en' kullan
      const locale = localStorage.getItem("app-locale") || "en";
      return `/${locale}/dashboard`;
    },
  },
];

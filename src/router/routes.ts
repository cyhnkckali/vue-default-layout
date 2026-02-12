import type { RouteRecordRaw } from "vue-router";
import DefaultView from "@/layout/DefaultView.vue";

export const routes: RouteRecordRaw[] = [
  {
    path: "/",
    component: DefaultView,
    redirect: "/dashboard",
    children: [
      {
        path: "/dashboard",
        component: () => import("@/views/DashboardView.vue"),
        meta: {
          title: "Dashboard",
          isAuthenticated: true,
        },
      },
    ],
  },
];

import { createWebHashHistory, createRouter, RouteRecordRaw } from "vue-router";

const routes = <Array<RouteRecordRaw>>[
  { path: "/", component: () => import("../components/wbs.vue") },
];
const router = createRouter({
  history: createWebHashHistory(),
  routes: routes,
});

export default router;

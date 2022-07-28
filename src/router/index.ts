import { createWebHashHistory, createRouter, RouteRecordRaw } from "vue-router";

const routes = <Array<RouteRecordRaw>>[
  { path: "/", component: () => import("../views/Home.vue") },
  { path: "/doc", component: () => import("../views/Doc.vue") },
];
const router = createRouter({
  history: createWebHashHistory(),
  routes: routes,
});

export default router;

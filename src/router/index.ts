import { createWebHashHistory, createRouter, RouteRecordRaw } from "vue-router";

const routes = <Array<RouteRecordRaw>>[
  { path: "/", component: () => import("../views/Home.vue") },
  {
    path: "/doc",
    component: () => import("../views/Doc.vue"),
    children: [
      {
        path: "switch",
        component: () => import("../components/SwitchDemo.vue"),
      },
      {
        path: "button",
        component: () => import("../components/ButtonDemo.vue"),
      },
      {
        path: "dialog",
        component: () => import("../components/DialogDemo.vue"),
      },
      {
        path: "tabs",
        component: () => import("../components/TabsDemo.vue"),
      },
    ],
  },
];
const router = createRouter({
  history: createWebHashHistory(),
  routes: routes,
});

export default router;

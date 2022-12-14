import { createWebHashHistory, createRouter, RouteRecordRaw } from "vue-router"

const routes = <Array<RouteRecordRaw>>[
  { path: "/", component: () => import("../views/Home.vue") },
  {
    path: "/doc",
    component: () => import("../views/Doc.vue"),
    children: [
      {
        path: "",
        component: () => import("../components/DocDemo.vue"),
      },
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
      {
        path: "calendar",
        component: () => import("../components/CalendarDemo.vue"),
      },
      {
        path: "carousel",
        component: () => import("../components/CarouselDemo.vue"),
      },
      {
        path: "pagination",
        component: () => import("../components/PaginationDemo.vue"),
      },
      {
        path: "upload",
        component: () => import("../components/upload/UploadDemo.vue"),
      },
    ],
  },
]
const router = createRouter({
  history: createWebHashHistory(),
  routes: routes,
})

export default router

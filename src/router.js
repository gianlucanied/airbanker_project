import { createRouter, createWebHistory } from "vue-router";

import AppHome from "./pages/AppHome.vue";
import AppAbout from "./pages/AppAbout.vue";
import NotFound from "./pages/NotFound.vue";
import AppOther from "./pages/AppOther.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      name: "home",
      component: AppHome,
    },
    {
      path: "/about",
      name: "about",
      component: AppAbout,
    },
    {
      path: "/other",
      name: "other",
      component: AppOther,
    },
    {
      path: "/:pathMatch(.*)*",
      name: "NotFound",
      component: NotFound,
    },
  ],
});

export { router };

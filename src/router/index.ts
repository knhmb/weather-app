import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    name: "home",
    component: () => import("../pages/HomePage.vue"),
  },
  {
    path: "/weather-detail/:state",
    name: "weather-detail",
    component: () => import("../pages/LocationDetails.vue"),
  },
  {
    path: "/edit-profile",
    name: "edit-profile",
    component: () => import("../pages/EditProfile.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;

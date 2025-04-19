import { createRouter, createWebHistory } from "vue-router";
import HomePage from "../pages/HomePage.vue";
import LocationDetails from "../pages/LocationDetails.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomePage,
  },
  {
    path: "/weather-detail/:state",
    name: "weather-detail",
    component: LocationDetails,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;

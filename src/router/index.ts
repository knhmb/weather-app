import { createRouter, createWebHistory } from "vue-router";
import HomePage from "../pages/HomePage.vue";
import LocationDetails from "../pages/LocationDetails.vue";
import EditProfile from "../pages/EditProfile.vue";

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
  {
    path: "/edit-profile",
    name: "edit-profile",
    component: EditProfile,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;

import { createWebHistory, createRouter } from "vue-router";
import Dashboard from "../views/Dashboard.vue";
import Example from "../views/Example.vue";
import DeviceListView from "../views/DeviceListView.vue";

const routes = [
  {
    path: "/",
    name: "Dashboard",
    component: Dashboard,
  },
  {
    path: "/example",
    name: "Example",
    component: Example,
  },
  {
    path: "/devicelistview",
    name: "DeviceListView",
    component: DeviceListView,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
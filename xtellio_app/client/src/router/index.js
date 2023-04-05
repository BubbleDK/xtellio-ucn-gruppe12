import { createWebHistory, createRouter } from "vue-router";
import Dashboard from "../views/Dashboard.vue";
import Example from "../views/Example.vue";
import DeviceListView from "../views/DeviceListView.vue";
import OrgView from "../views/OrgView.vue";
import DeviceView from "../components/DeviceView.vue";

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
  {
    path: "/deviceview/:Mac",
    name: "DeviceView",
    component: DeviceView,
  },
  {
    path: "/orgview",
    name: "OrgView",
    component: OrgView,
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
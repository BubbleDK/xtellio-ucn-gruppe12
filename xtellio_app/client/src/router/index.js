import { createWebHistory, createRouter } from "vue-router";
import Dashboard from "../views/Dashboard.vue";
import DeviceListView from "../views/DeviceListView.vue";
import OrgView from "../views/OrgView.vue";
import DeviceView from "../components/DeviceView.vue";
import CustomerView from '../components/CustomerView.vue';

const routes = [
  {
    path: "/",
    name: "Dashboard",
    component: Dashboard,
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
  },
  {
    path: "/orgview/:customerName",
    name: "CustomerView",
    component: CustomerView,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
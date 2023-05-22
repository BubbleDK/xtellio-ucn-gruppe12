import { createWebHistory, createRouter } from "vue-router";
import Dashboard from "../views/Dashboard.vue";
import DeviceListView from "../views/DeviceListView.vue";
import OrgView from "../views/OrgView.vue";
import DeviceView from "../components/DeviceView.vue";
import CustomerView from '../components/CustomerView.vue';

/**
 * The configuration of the router paths for the application.
 * Each path has a 'path', 'name', and 'component' property. 
 * The 'path' is the URL endpoint, the 'name' is the identifier for the route, 
 * and the 'component' is the Vue component that will be rendered when the route is matched.
 * Some paths also have a parameter (e.g. ':Mac', ':customerName') which can be used to pass data to the component.
 */
const routes = [
  // Configuration for the Dashboard route.
  {
    path: "/",
    name: "Dashboard",
    component: Dashboard,
  },
  // Configuration for the DeviceListView route.
  {
    path: "/devicelistview",
    name: "DeviceListView",
    component: DeviceListView,
  },
  // Configuration for the DeviceView route. The ':Mac' in the path is a parameter.
  {
    path: "/deviceview/:Mac",
    name: "DeviceView",
    component: DeviceView,
  },
  // Configuration for the OrgView route.
  {
    path: "/orgview",
    name: "OrgView",
    component: OrgView,
  },
  // Configuration for the CustomerView route. The ':customerName' in the path is a parameter.
  {
    path: "/orgview/:customerName",
    name: "CustomerView",
    component: CustomerView,
  },
];

/**
 * The Vue router instance. It uses 'createWebHistory' for HTML5 history mode.
 * The 'routes' array is passed to the 'createRouter' function to define the routing for the application.
 */
const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
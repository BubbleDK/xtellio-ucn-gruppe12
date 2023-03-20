import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import VueApexCharts from "vue3-apexcharts";
import Router from './router'
import Moment from 'moment'

const app = createApp(App);
app.use(Router);
app.use(VueApexCharts);
app.use(Moment);



//mount bør ligge til sidst
app.mount('#app');


import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import VueApexCharts from "vue3-apexcharts";
import router from './router'

const app = createApp(App);
app.use(router);
app.use(VueApexCharts);



//mount bør ligge til sidst
app.mount('#app');


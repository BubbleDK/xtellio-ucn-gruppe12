<script>
import GetDataExample from './components/GetDataExample.vue';
import NavBar from './components/NavBar.vue';
import Chart from './components/Chart.vue';
import DonutChart from './components/DonutChart.vue';
import SparkBox from './components/SparkBox.vue';

export default {
  name: 'App',
  components: {
    GetDataExample,
    NavBar,
    Chart,
    DonutChart,
    SparkBox
  },
  data() {
    return {

    }
  },
  computed: {
  },
  methods: {
    
  },
}

</script>

<template>
  <!-- <div id="nav">
    <router-link to="/">Dashboard</router-link>
    <router-link to="/example">Example</router-link>
  </div> -->
  <NavBar />
  <router-view />
</template>

<style scoped>
</style>

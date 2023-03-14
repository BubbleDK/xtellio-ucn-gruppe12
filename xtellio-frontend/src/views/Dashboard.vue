<script>
    import SparkBox from '../components/SparkBox.vue';
    import DonutChart from '../components/DonutChart.vue';

    export default {
  name: 'App',
  components: {
    SparkBox,
    DonutChart
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
    <h1>Dashboard</h1>
    <SparkBox />
    <DonutChart />
</template>
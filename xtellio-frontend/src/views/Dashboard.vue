<script>
    import SparkBox from '../components/SparkBox.vue';
    import DonutChart from '../components/DonutChart.vue';
    import ColumnChart from '../components/ColumnChart.vue';

    export default {
  name: 'App',
  components: {
    SparkBox,
    DonutChart,
    ColumnChart
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
    <DonutChart />
    <ColumnChart />
</template>
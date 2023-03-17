<script>
    import SparkBox from '../components/SparkBox.vue';
    import DonutChart from '../components/DonutChart.vue';
    import ColumnChart from '../components/ColumnChart.vue';
    import GetDataExample from '../components/GetDataExample.vue';
    // import ApiMethods from '../api/ApiMethods';

    export default {
  name: 'App',
  components: {
    SparkBox,
    DonutChart,
    ColumnChart,
    GetDataExample
  },
  data() {
    return {

    }
  },
  computed: {
  },
  methods: {
    // async getApidata() {
    //   var res = ApiMethods.index();
    //   console.log(res);
    // }
  },
  // mounted() {
  //   this.getApidata()
  // },
}

</script>

<template>
    <h1>Dashboard</h1>
    <!-- <GetDataExample/> -->
    <DonutChart />
    <ColumnChart />
    <SparkBox />
</template>
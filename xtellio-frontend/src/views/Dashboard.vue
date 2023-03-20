<script>
    import SparkBoxBattery from '../components/SparkBoxBattery.vue';
    import DonutChartFirmware from '../components/DonutChartFirmware.vue';
    import ColumnChartBattery from '../components/ColumnChartBattery.vue';
    import GetDataExample from '../components/GetDataExample.vue';
    import SparkBoxFirmWare from '../components/SparkBoxFirmWare.vue';
    import SparkBoxSignal from '../components/SparkBoxSignal.vue';
    // import ApiMethods from '../api/ApiMethods';

    export default {
  name: 'App',
  components: {
    SparkBox,
    DonutChart,
    ColumnChart,
    GetDataExample,
    SparkBoxFirmWare,
    SparkBoxSignal,
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
  <div class="container mx-auto px-4 mt-4">
    <div class="grid grid-cols-3">
    <!-- <GetDataExample/> -->
    <SparkBox />
    <SparkBoxFirmWare/>
    <SparkBoxSignal/>
  </div>
  <DonutChart />
  <ColumnChart />
  </div>
</template>
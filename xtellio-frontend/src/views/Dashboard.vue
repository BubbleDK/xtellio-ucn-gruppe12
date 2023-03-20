<script>
    import SparkBoxBattery from '../components/SparkBoxBattery.vue';
    import DonutChartFirmware from '../components/DonutChartFirmware.vue';
    import ColumnChartBattery from '../components/ColumnChartBattery.vue';
    import GetDataExample from '../components/GetDataExample.vue';
    import SparkBoxFirmWare from '../components/SparkBoxFirmWare.vue';
    import SparkBoxSignal from '../components/SparkBoxSignal.vue';
    import DonutChartOldFirmware from '../components/DonutChartOldFirmware.vue';
    // import ApiMethods from '../api/ApiMethods';

    export default {
  name: 'App',
  components: {
    SparkBoxBattery,
    DonutChartFirmware,
    ColumnChartBattery,
    GetDataExample,
    SparkBoxFirmWare,
    SparkBoxSignal,
    DonutChartOldFirmware,
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
    <div class="grid grid-flow-col gap-2 pb-4">
    <!-- <GetDataExample/> -->
    <SparkBoxBattery />
    <SparkBoxFirmWare/>
    <SparkBoxSignal/>
  </div>
  <div class="flex mt-5">
    <div class="mr-5">
      <DonutChartFirmware />
      <DonutChartOldFirmware/>
</div>
<div class="ml-5">
  <ColumnChartBattery />
</div>
</div>
  </div>
</template>
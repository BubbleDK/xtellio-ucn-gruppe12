<script>
    import SparkBox from '../components/SparkBox.vue';
    import DonutChart from '../components/DonutChart.vue';
    import ColumnChart from '../components/ColumnChart.vue';
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
    <div class="grid grid-flow-col gap-2 pb-4">
    <!-- <GetDataExample/> -->
    <SparkBox />
    <SparkBoxFirmWare/>
    <SparkBoxSignal/>
  </div>
  <div class="flex mt-5">
    <div class="mr-5">
  <DonutChart />
</div>
<div class="ml-5">
  <ColumnChart />
</div>
</div>
  </div>
</template>
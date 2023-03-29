<script>
import TestColumnChart from '../components/TestColumnChart.vue';
import DeviceList from '../components/DeviceList.vue';

export default {
  name: 'App',
  components: {
    TestColumnChart,
    DeviceList
  },
  data() {
    return {
      devices: [],
    }
  },
}
</script>

<template>
    <h1>Example</h1>
    <div>
    <TestColumnChart/>
    <DeviceList/>
  </div>
</template>
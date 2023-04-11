<script>
import BatteryColumnChart from '../components/BatteryColumnChart.vue';
import DeviceList from '../components/DeviceList.vue';

export default {
  name: 'App',
  components: {
    BatteryColumnChart,
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
    <BatteryColumnChart/>
    <DeviceList/>
  </div>
</template>
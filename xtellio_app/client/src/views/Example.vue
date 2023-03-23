<script>
import TestColumnChart from '../components/TestColumnChart.vue';

export default {
  name: 'App',
  components: {
    TestColumnChart,
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
    <div><TestColumnChart/></div>
    
</template>
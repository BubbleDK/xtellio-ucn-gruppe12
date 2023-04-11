<!-- <script>
import DeviceService from '../DeviceService';

export default {
  name: 'GpsColumn',
  data() {
          return{
          series: [{
            name: "sales",
            data: [{
              x: '0-25',
              y: 0
            }, {
              x: '26-50',
              y: 0
            }, {
              x: '51-75',
              y: 0
            }, {
              x: '76-100',
              y: 0
            }, {
              x: '101-150',
              y: 0
            }]
          }],
          chartOptions: {
            chart: {
              type: 'bar',
              height: 380
            },
            xaxis: {
              type: 'category',
            },
            title: {
                text: 'Gps Track',
            },
            tooltip: {
              x: {
              }
            },
          },
          
        } 
        },
    async created() {
    try {
      this.temp = await DeviceService.getAllDevices();
      this.temp.forEach(x => {

      })
    } catch (err) {
      this.error = err.message
    }
  }
}

</script>

<template>
  <div id="chart">
    <apexchart height="350" type="bar" :options="chartOptions" :series="series"></apexchart>
  </div>
</template>

<style></style> -->
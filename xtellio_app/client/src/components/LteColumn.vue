<script>
import DeviceService from '../DeviceService';

export default {
  name: 'LteColumn',
  data() {
          return{
          lteGps: [],
          series: [{
            name: "sales",
            data: [{
              x: '>-65',
              y: 0
            }, {
              x: '-66 til -75',
              y: 0
            }, {
              x: '-76 til -85',
              y: 0
            }, {
              x: '-86 til -95',
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
                text: 'Lte Qual',
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
        const lo = x?.last_log?.data?.nbm_status;
        if(lo !== undefined){
        this.lteGps.push(lo);
        }
      })
      this.lteGps.forEach(element => {
        if(element.lte_qual.rssi >= -65) {
          this.series[0].data[0].y++
        }
        else if(element.lte_qual.rssi >= -75){
          this.series[0].data[1].y++
          console.log(element.lte_qual.rssi)
        }
        else if(element.lte_qual.rssi >= -85){
          this.series[0].data[2].y++
        }
        else if(element.lte_qual.rssi >= -95){
          this.series[0].data[3].y++
        }
      });
      console.log(lteGps)
    } catch (err) {
      this.error = err.message
    }
  }
}

</script>

<template>
  <div id="chart" class="block max-w-xl p-6 border border-gray-200 rounded-lg shadow dark:border-gray-800">
    <apexchart height="350" type="bar" :options="chartOptions" :series="series"></apexchart>
  </div>
</template>

<style></style>
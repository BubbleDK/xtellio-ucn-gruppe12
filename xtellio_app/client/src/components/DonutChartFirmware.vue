<script>
import DeviceService from '../DeviceService';
export default {
  name: 'DonutChartFirmware',
  data() {
    return {
      temp: [],
      devices: [],
      // series: [44, 55, 13, 33],
      chartOptions: {
        chart: {
          foreColor: '#FFFFFF',
          width: 380,
          type: 'donut',
        },
        dataLabels: {
          enabled: false
        },
        labels: [],
        responsive: [{
          breakpoint: 480,
          options: {
            chart: {
              width: 200
            },
            legend: {
              show: false
            }
          }
        }],
        legend: {
          position: 'right',
          offsetY: 0,
          height: 230,
        },
        title: {
          text: 'Firmware version:',
          style: {
            color: '#FFFFFF'
          }
        }
      },
    }
  },
  async created() {
        try {
            this.temp = await DeviceService.getAllDevices();
            var mapName = new Map();
            this.temp.forEach(element => {
                var tempValue = element.status.sw;
                // console.log(tempValue);
                if(mapName.has(tempValue)){
                    mapName.set(tempValue, mapName.get(tempValue) + 1)
                    tempValue
                }
                else{
                    mapName.set(tempValue, 1)
                }
            });
            
            mapName.forEach((key, value) => {
             this.chartOptions.labels.push(value);
              this.devices.push(key);
              console.log(this.labels);
            });
            console.log(this.labels);
        } catch (err) {
            this.error = err.message
        }
  },
}

</script>

<template>
  <div>
    <div class="chart-wrap">
      <div id="chart">
        <apexchart class="donut" type="donut" width="380" :options="chartOptions" :series="devices"></apexchart>
      </div>
    </div>
  </div>
</template>

<style>
  .donut .apexcharts-tooltip span {
    color: white;
}
</style>
<script>
import DeviceService from '../DeviceService';

export default {
  name: "SparkBoxFirmWare",
  data() {
    return {
      temp: [],
      devices: [{
        name: 'Units on firmware',
        data: [{
          x: "X.0.0",
          y: 0,
        },
        {
          x: "0.X.0",
          y: 0,
        },
        {
          x: "0.0.X",
          y: 0,
        },
        {
          x: "dirty firmware",
          y: 0,
        }]
      }],
      error: '',
      chartOptions: {
        chart: {
          type: 'bar',
          height: 160,
          sparkline: {
            enabled: true
          },
        },
        plotOptions: {
          bar: {
              distributed: true,
          }
        },
        dataLabels: {
          enabled: true,
        },
        stroke: {
          curve: 'straight',
        },
        fill: {
          opacity: 0.6,
        },
        yaxis: {
          min: 0
        },
        title: {
          text: 'Firmware',
          offsetX: 0,
          style: {
            fontSize: '24px',
            color: '#FFFFFF'
          }
        },
        tooltip: {
          enabled: true,
        },
      },
    }
  },
  async created() {
    try {
      this.temp = await DeviceService.getAllDevices();
      this.temp.forEach(element => {
        const tempValue = element?.status?.sw;
        let reg = new RegExp(/^[-+]?[1-9]+\.[0-9]+\.[0-9]+$/);
        let regMid = new RegExp(/^[-+]?[0]+\.[1-9]+\.[0-9]+$/);
        let regLow = new RegExp(/^[-+]?[0]+\.[0]+\.[1-9]+$/); 
        if(reg.test(tempValue)){
          this.devices[0].data[0].y++;
        }
        else if(regMid.test(tempValue)){
          this.devices[0].data[1].y++;
        }
        else if(regLow.test(tempValue)){
          this.devices[0].data[2].y++;
        }
        else{
          this.devices[0].data[3].y++;
        }
      });
    } catch (err) {
      this.error = err.message
    }
  }
}
</script>

<template>
  <div>
    <div
      class="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      <div id="chart-spark2">
        <apexchart type="bar" height="160" :options="chartOptions" :series="devices"></apexchart>
      </div>
    </div>
  </div>
</template>

<style>
#chart-spark2 .apexcharts-tooltip {
  color: black !important;
}

.apexcharts-tooltip-marker {
  background-color: black !important;
}
</style>
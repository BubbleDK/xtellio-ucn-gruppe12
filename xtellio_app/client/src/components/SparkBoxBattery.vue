<script>
import moment from 'moment'
import DeviceService from '../DeviceService'


export default {
  name: "SparkBoxBattery",
  data() {
    return {
      temp: [],
      devices: [{
        name: 'mv',
        data: []
      }],
      error: '',
      chartOptions: {
        chart: {
          type: 'area',
          height: 160,
          sparkline: {
            enabled: true
          },
        },
        stroke: {
          curve: 'straight'
        },
        fill: {
          opacity: 0.3,
        },
        yaxis: {
          min: -1
        },
        colors: ['#DCE6EC'],
        title: {
          text: 'Battery',
          offsetX: 0,
          style: {
            fontSize: '24px',
            color: '#FFFFFF'
          }
        },
        subtitle: {
          //TODO: Indsæt den reélle mængde af enheder
          text: "Battery per unit",
          style: {
            fontSize: '18px',
            color: '#FFFFFF'
          },
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
      this.temp.forEach(device => {
        const battery = Number(device.status.batt);
        const name = String(device.name);
        if (name !== 'null') {
          const newDevice = {
            x: name,
            y: battery
          }
          this.devices[0].data.push(newDevice);
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
    <!-- TODO: Lav if,else logik til styring af baggrundsfarve afhængigt af mængden af enheder med lav batteri -->
    <div
      class="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-green-800 dark:border-gray-700">
      <div id="chart-spark1">
        <apexchart type="area" height="160" :options="chartOptions" :series="devices"></apexchart>
      </div>
    </div>
  </div>
</template>

<style>
#chart-spark1 .apexcharts-tooltip {
  color: black !important;
}

.apexcharts-tooltip-marker {
  background-color: black !important;
}
</style>
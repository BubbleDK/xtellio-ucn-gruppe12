<script>
import DeviceService from '../DeviceService';

export default {
  name: "SparkBoxFirmWare",
  data() {
    return {
      temp: [],
      devices: [{
        name: 'Units on firmware',
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
          min: 0
        },
        colors: ['red'],
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
      var mapName = new Map();
      this.temp.forEach(element => {
        var tempValue = element.status.sw;

        if (mapName.has(tempValue)) {
          mapName.set(tempValue, mapName.get(tempValue) + 1)
          tempValue
        }
        else {
          mapName.set(tempValue, 1)
        }
      });

      mapName.forEach((value, key) => {
        // firmware = String(device.status.sw);
        var newDevice = {
          x: key,
          y: value
        }
        this.devices[0].data.push(newDevice);
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
        <apexchart type="area" height="160" :options="chartOptions" :series="devices"></apexchart>
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
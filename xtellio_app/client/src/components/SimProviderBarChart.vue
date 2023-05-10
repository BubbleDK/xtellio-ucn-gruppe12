<script>
import moment from 'moment'
import DeviceService from '../DeviceService';

moment().format("MMM Do YY");

export default {
  name: "SimProviderBarChart",
  data() {
    return {
      series: [{
        name: 'Units',
        data: [0, 0, 0]
      }],
      chartOptions: {
        chart: {
          foreColor: "#FFFFFF",
          type: 'bar',
        },
        plotOptions: {
          bar: {
            horizontal: false,
            columnWidth: '55%',
            endingShape: 'rounded'
          },
        },
        dataLabels: {
          enabled: true,
          style: {
            fontSize: '12px',
            colors: ["#FFFFFF"]
          }
        },
        stroke: {
          show: true,
          width: 2,
          colors: ['transparent']
        },
        xaxis: {
          title: {
            text: 'Vendor'
          },
          categories: ['Telia', 'Vodafone', 'Unknown'],
        },
        title: {
          text: 'SIM Provider',
          offsetX: 0,
          style: {
            fontSize: '24px',
            color: '#FFFFFF'
          }
        },
        yaxis: {
          title: {
            text: 'Units'
          },
          forceNiceScale: true,
          tickAmount: 3,
        },
        fill: {
          opacity: 1
        },
        tooltip: {
        }
      },
    }

  },
  async created() {
    try {
      const devices = await DeviceService.getAllDevices();
      devices.forEach(device => {
        const simProvider = device.sim.provider;
        if (simProvider === "Telia") {
          this.series[0].data[0]++;
        }
        else if (simProvider === "Vodafone") {
          this.series[0].data[1]++;
        }
        else if (simProvider === "Unknown") {
          this.series[0].data[2]++;
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
      class="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-blue-800 dark:border-gray-700">
      <div id="chart-spark1">
        <apexchart type="bar" height="160" :options="chartOptions" :series="series"></apexchart>
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
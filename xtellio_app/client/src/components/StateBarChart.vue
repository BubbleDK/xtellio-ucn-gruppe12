<script>
import moment from 'moment'
import DeviceService from '../DeviceService';

moment().format("MMM Do YY");

export default {
  name: "StateBarChart",
  data() {
    return {
      series: [{
        name: 'Units',
        data: [{
          x: "Active",
          y: 0,
        },
        {
          x: "Inactive",
          y: 0,
        },
        {
          x: "Factory",
          y: 0,
        },
        {
          x: "Unknown",
          y: 0,
        }]
      }],
      chartOptions: {
        chart: {
          foreColor: "#FFFFFF",
          type: 'bar',
          toolbar: {
            show: false,
          }
        },
        plotOptions: {
          bar: {
            horizontal: false,
            columnWidth: '55%',
            endingShape: 'rounded',
            distributed: true,
          },
        },
        colors: ['#3e65cf', '#595555', '#fab711', '#ff0000'],
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
          labels:{
            show: false,
          }
        },
        title: {
          text: 'State Distribution',
          offsetX: 0,
          style: {
            fontSize: '18px',
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
          opacity: 0.8,
        },
        tooltip: {
        }
      },
    }

  },
  async created() {
    try {
      this.temp = await DeviceService.getAllDevices();
      this.temp.forEach(device => {
        const state = device.state;
        if (state === "Active") {
          this.series[0].data[0].y++;
        }
        else if (state === "Inactive") {
          this.series[0].data[1].y++;
        }
        else if (state === "Factory") {
          this.series[0].data[2].y++;
        }
        else if (state === "Unknown") {
          this.series[0].data[3].y++;
        }
      });
    } catch (err) {
      this.error = err.message
    }
  },
  methods: {
    goToStateList(chartContext, seriesIndex, config){
      switch (seriesIndex) {
          case 0:
            this.$router.push({ name: 'DeviceListView', state: {state: "Active"} })
            break;
          case 1:
            this.$router.push({ name: 'DeviceListView', state: {state: "Inactive"} })
            break;
          case 2:
            this.$router.push({ name: 'DeviceListView', state: {state: "Factory"} })
            break;
          case 3:
            this.$router.push({ name: 'DeviceListView', state: {state: "Unknown"} })
            break;
          default:
            break;
        }
    }
  }
}
</script>

<template>
  <div>
    <div
      class="block max-w-sm p-6 border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      <div id="chart-spark1">
        <apexchart type="bar" height="200" :options="chartOptions" :series="series" @legendClick="goToStateList"></apexchart>
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
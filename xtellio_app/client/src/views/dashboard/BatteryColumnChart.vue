<script>
import DeviceService from '../../DeviceService';

export default {
  name: 'BatteryColumnChart',
  data() {
    return {
      series: [{
        name: 'Units battery',
        data: [{
          x: "0 mv",
          y: 0,
        },
        {
          x: "2000-2500 mv",
          y: 0,
        },
        {
          x: "2500-3000 mv",
          y: 0,
        },
        {
          x: "3000-3500 mv",
          y: 0,
        },
        {
          x: "3500-4000 mv",
          y: 0,
        },
        {
          x: ">4000 mv",
          y: 0,
        }]
      }],
      textVal: '',
      battTotal: 0,
      battAverage: 0,
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
            distributed: true,
            horizontal: false,
            columnWidth: '55%',
            endingShape: 'rounded',
          },
        },
        colors: ['#595555', '#ff0000', '#fab711', '#08c73c', '#1cc74a', '#32a852'],
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
          labels: {
            show: false,
          }
        },
        yaxis: {
          title: {
            text: 'Units'
          },
          forceNiceScale: true,
          tickAmount: 3,
        },
        title: {
          text: 'Battery Distribution',
          offsetX: 0,
          style: {
            fontSize: '18px',
            color: '#FFFFFF'
          }
        },
        fill: {
          opacity: 0.9,
        },
        tooltip: {
        },
      },
    }
  },
  /**
   * Asynchronously called when the Vue instance is created.
   * It fetches all devices and increments the appropriate count in the 'series' array
   * based on the battery level and the state of each device.
   * @async
   */
  async created() {
    try {
      const devices = await DeviceService.getAllDevices();
      devices.forEach(device => {
        const battery = Number(device.status.batt);
        if (battery === 0 && device.state === 'Active') {
          this.series[0].data[0].y++;
        }
        else if (battery <= 2500 && battery >= 2000) {
          this.series[0].data[1].y++;
        }
        else if (battery > 2500 && battery <= 3000) {
          this.series[0].data[2].y++;
        }
        else if (battery > 3000 && battery <= 3500) {
          this.series[0].data[3].y++;
        }
        else if (battery > 3500 && battery <= 4000) {
          this.series[0].data[4].y++;
        }
        else if (battery > 4000) {
          this.series[0].data[5].y++;
        }
      });
    } catch (err) {
      this.error = err.message
    }
  },
  methods: {
    /**
     * Navigates to the 'DeviceListView' with the 'battery' state query parameter set
     * to represent the range of battery levels that corresponds to the given data index.
     * @param {number} data - The index of the clicked data point or legend in the chart.
     */
    goToBattList(data) {
      switch (data) {
        case 0:
          this.$router.push({ name: 'DeviceListView', state: { battery: "0" } })
          break;
        case 1:
          this.$router.push({ name: 'DeviceListView', state: { battery: "2000-2500" } })
          break;
        case 2:
          this.$router.push({ name: 'DeviceListView', state: { battery: "2501-3000" } })
          break;
        case 3:
          this.$router.push({ name: 'DeviceListView', state: { battery: "3001-3500" } })
          break;
        case 4:
          this.$router.push({ name: 'DeviceListView', state: { battery: "3501-4000" } })
          break;
        case 5:
          this.$router.push({ name: 'DeviceListView', state: { battery: ">4000" } })
          break;
        default:
          break;
      }
    },
    /**
     * Triggered when a data point in the chart is clicked.
     * Calls the 'goToBattList' method with the index of the clicked data point.
     * @param {Event} event - The click event.
     * @param {Object} chartContext - The chart context.
     * @param {Object} config - The configuration object.
     */
    goToBattListDataPoint(event, chartContext, config) {
      this.goToBattList(config.dataPointIndex)
    },
    /**
     * Triggered when a legend in the chart is clicked.
     * Calls the 'goToBattList' method with the index of the clicked legend.
     * @param {Object} chartContext - The chart context.
     * @param {number} seriesIndex - The index of the clicked legend.
     * @param {Object} config - The configuration object.
     */
    goToBattListLegend(chartContext, seriesIndex, config) {
      this.goToBattList(seriesIndex)
    },
  }
}

</script>

<template>
  <div id="chart"
    class="block max-w-sm p-6 border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
    <apexchart type="bar" height="200" :options="chartOptions" :series="series"
      @dataPointSelection="goToBattListDataPoint" @legendClick="goToBattListLegend"></apexchart>
  </div>
</template>

<style>
.apexcharts-tooltip {
  color: black !important;
}

/* #column {
  width: 31em;
} */

#column .apexcharts-menu {
  color: black;
}
</style>
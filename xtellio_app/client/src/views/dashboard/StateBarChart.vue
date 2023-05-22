<script>
import moment from 'moment'
import DeviceService from '../../DeviceService';

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
          labels: {
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
  /**
   * Asynchronously called when the Vue instance is created.
   * It fetches all devices and counts the number of devices per state.
   * Each count is then assigned to the corresponding data in the series array.
   * @async
   */
  async created() {
    try {
      const devices = await DeviceService.getAllDevices();
      devices.forEach(device => {
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
    /**
     * Redirects to the 'DeviceListView' page based on the provided data.
     * The state corresponding to the data index is passed in the router state.
     * @param {number} data - The index of the state.
     */
    goToStateList(data) {
      switch (data) {
        case 0:
          this.$router.push({ name: 'DeviceListView', state: { state: "Active" } })
          break;
        case 1:
          this.$router.push({ name: 'DeviceListView', state: { state: "Inactive" } })
          break;
        case 2:
          this.$router.push({ name: 'DeviceListView', state: { state: "Factory" } })
          break;
        case 3:
          this.$router.push({ name: 'DeviceListView', state: { state: "Unknown" } })
          break;
        default:
          break;
      }
    },
    /**
     * Calls the `goToStateList` method when a data point is clicked in the chart.
     * @param {Event} event - The click event.
     * @param {Object} chartContext - The context of the chart.
     * @param {Object} config - The configuration of the chart, including the clicked data point index.
     */
    goToStateListDataPoint(event, chartContext, config) {
      this.goToStateList(config.dataPointIndex)
    },
    /**
     * Calls the `goToStateList` method when a legend is clicked in the chart.
     * @param {Object} chartContext - The context of the chart.
     * @param {number} seriesIndex - The index of the clicked legend.
     * @param {Object} config - The configuration of the chart.
     */
    goToStateListLegend(chartContext, seriesIndex, config) {
      this.goToStateList(seriesIndex)
    }
  }
}
</script>

<template>
  <div>
    <div class="block max-w-sm p-6 border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      <div id="chart-spark1">
        <apexchart type="bar" height="200" :options="chartOptions" :series="series"
          @dataPointSelection="goToStateListDataPoint" @legendClick="goToStateListLegend"></apexchart>
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
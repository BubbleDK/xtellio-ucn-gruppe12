<script>
import DeviceService from '../DeviceService';

export default {
  name: 'BatteryColumnChart',
  data() {
    return {
      series: [{
        name: 'Units',
        data: [0, 0, 0, 0, 0, 0],
        battAverage: 0
      }],
      chartOptions: {
        title: {
          text: 'Current average excluding 0 values: '
        },
        chart: {
          foreColor: "#FFFFFF",
          type: 'bar',
          height: 350
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
            colors: ["#304758"]
          }
        },
        stroke: {
          show: true,
          width: 2,
          colors: ['transparent']
        },
        xaxis: {
          title: {
            text: 'Battery distribution'
          },
          categories: ['0 mV', '2000-2500 mV', '2501-3000 mV', '3001-3500 mV', '3501-4000 mV', '>4000 mV'],
        },
        yaxis: {
          title: {
            text: 'Units'
          },
          forceNiceScale: true,
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
      this.temp = await DeviceService.getAllDevices();
      this.temp.forEach(device => {
        const battery = Number(device.status.batt);
        if(battery === 0 && device.state === 'Active'){
          this.series[0].data[0]++;
        }
        else if (battery <= 2500 && battery >= 2000) {
          this.series[0].data[1]++;
        }
        else if (battery > 2500 && battery <= 3000) {
          this.series[0].data[2]++;
        }
        else if (battery > 3000 && battery <= 3500) {
          this.series[0].data[3]++;
        }
        else if (battery > 3500 && battery <= 4000) {
          this.series[0].data[4]++;
        }
        else if (battery > 4000) {
          this.series[0].data[5]++;
        }

      });
    } catch (err) {
      this.error = err.message
    }
  }
}

</script>

<template>
  <div id="chart"
    class="block max-w-xl p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
    <apexchart id="column" type="bar" height="350" :options="chartOptions" :series="series"></apexchart>
  </div>
</template>

<style>
.apexcharts-tooltip {
  color: black !important;
}

#column {
  width: 31em;
}

#column .apexcharts-menu {
  color: black;
}</style>
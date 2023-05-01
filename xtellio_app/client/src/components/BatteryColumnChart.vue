<script>
import DeviceService from '../DeviceService';

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
        title: {
          text: this.textVal
        },
        chart: {
          foreColor: "#FFFFFF",
          type: 'bar',
        },
        plotOptions: {
          bar: {
            distributed: true,
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
          text: 'Battery',
          offsetX: 0,
          style: {
            fontSize: '24px',
            color: '#FFFFFF'
          }
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
      let unitsWithBatteryOverZero = 0;
      this.temp = await DeviceService.getAllDevices();
      this.temp.forEach(device => {
        const battery = Number(device.status.batt);
        if(battery === 0 && device.state === 'Active'){
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
        if(battery !== 0){
          this.battTotal += battery;
          unitsWithBatteryOverZero++;
        }
      },
      );
        this.battAverage = this.battTotal/unitsWithBatteryOverZero,
        this.textVal = 'Current average excluding 0 values: ' + Math.floor(this.battAverage) + 'mV',
        this.chartOptions.title.text = this.textVal
    } catch (err) {
      this.error = err.message
    }
  },  
  methods: {
    showBat(chartContext, seriesIndex, config){
        console.log("click");
        console.log('seriesIndex:'+seriesIndex)
        switch (seriesIndex) {
          case 0:
            this.$router.push({ name: 'DeviceListView', state: {battery: "0"} })
            break;
          case 1:
            this.$router.push({ name: 'DeviceListView', state: {battery: "2000-2500"} })
            break;
          case 2:
            this.$router.push({ name: 'DeviceListView', state: {battery: "2501-3000"} })
            break;
          case 3:
            this.$router.push({ name: 'DeviceListView', state: {battery: "3000-3500"} })
            break;
          case 4:
            this.$router.push({ name: 'DeviceListView', state: {battery: "3501-4000"} })
            break;
          case 5:
            this.$router.push({ name: 'DeviceListView', state: {battery: ">4000"} })
            break;
          default:
            break;
        }
    },
  }
}

</script>

<template>
  <div id="chart"
    class="block max-w-sm p-6 border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
    <apexchart type="bar" height="200" :options="chartOptions" :series="series" @legendClick="showBat"></apexchart>
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
}</style>
<script>
import DeviceService from '../DeviceService';

export default {
  name: "SparkBoxFirmWare",
  data() {
    return {
      temp: [],
      listDirty: [],
      listLow: [],
      listMed: [],
      listHigh: [],
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
          height: 200,
          foreColor: "#FFFFFF",
        },
        plotOptions: {
          bar: {
              distributed: true,
          }
        },
        dataLabels: {
          enabled: true,
          style: {
            fontSize: '12px',
            colors: ["#FFFFFF"]
          }
        },
        stroke: {
          curve: 'straight',
        },
        fill: {
          opacity: 0.8,
        },
        xaxis:{
          labels:{
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
          this.listHigh.push(element);
        }
        else if(regMid.test(tempValue)){
          this.devices[0].data[1].y++;
          this.listMed.push(element);
        }
        else if(regLow.test(tempValue)){
          this.devices[0].data[2].y++;
          this.listLow.push(element);
        }
        else{
          this.devices[0].data[3].y++;
          this.listDirty.push(element);
        }
      });
    } catch (err) {
      this.error = err.message
    }
  },
  methods: {
    goToFirmwareList(chartContext, seriesIndex, config){
      switch (seriesIndex) {
          case 0:
            this.$router.push({ name: 'DeviceListView', query: {firmware: JSON.stringify(this.listLow)} })
            break;
          case 1:
            this.$router.push({ name: 'DeviceListView', query: {firmware: JSON.stringify(this.listMed)} })
            break;
          case 2:
            this.$router.push({ name: 'DeviceListView', query: {firmware: JSON.stringify(this.listHigh)} })
            break;
          case 3:
            this.$router.push({ name: 'DeviceListView', query: {firmware: JSON.stringify(this.listDirty)} })
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
      <div id="chart-spark2">
        <apexchart type="bar" height="200" :options="chartOptions" :series="devices" @legendClick="goToFirmwareList"></apexchart>
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
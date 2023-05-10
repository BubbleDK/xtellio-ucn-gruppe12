<script>
import DeviceService from '../../DeviceService';
export default {
  name: 'DonutChartProvider',
  data() {
    return {
      temp: [],
      devices: [],
      chartOptions: {
        chart: {
          foreColor: '#FFFFFF',
          width: 380,
          type: 'donut',
        },
        dataLabels: {
          enabled: true,
        },
        labels: [],
        responsive: [{
          breakpoint: 480,
          options: {
            chart: {
              width: 200
            },
            legend: {
              show: false
            }
          }
        }],
        legend: {
          position: 'right',
          offsetY: 0,
          height: 230,
        },
        title: {
          text: 'Providers:',
          style: {
            color: '#FFFFFF'
          }
        }
      },
    }
  },
  async created() {
    try {
      this.temp = await DeviceService.getAllDevices();
      const mapName = new Map();
      this.temp.forEach(element => {
        const tempValue = element.sim.provider;
        mapName.set(tempValue, (mapName.get(tempValue) || 0) + 1);
      });
      mapName.forEach((key, value) => {
        this.chartOptions.labels.push(value || "None");
        this.devices.push(key);
      });
    } catch (err) {
      console.error(err.message);
    }
  },
}

</script>

<template>
  <div>
    <div class="chart-wrap">
      <div id="chart">
        <apexchart class="donut" type="donut" width="380" :options="chartOptions" :series="devices"></apexchart>
      </div>
    </div>
  </div>
</template>

<style>
.donut .apexcharts-tooltip span {
  color: white;
}
</style>
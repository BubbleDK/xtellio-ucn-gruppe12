<script>
import DeviceService from '../../DeviceService';
export default {
  name: 'LteQualDonutChart',
  data() {
    return {
      lteGps: [],
      series: [0, 0, 0, 0],
      chartOptions: {
        chart: {
          foreColor: '#FFFFFF',
          width: 380,
          type: 'donut',
        },
        dataLabels: {
          enabled: true,
        },
        labels: ['> -65', '-66 til -75', '-76 til -85', '-86 til -95'],
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
          text: 'Lte Qual:',
          style: {
            color: '#FFFFFF'
          }
        }
      },
    }
  },
  async created() {
    try {
      const devices = await DeviceService.getAllDevices();
      devices.forEach(x => {
        const lo = x?.last_log?.data?.nbm_status;
        if (lo !== undefined) {
          this.lteGps.push(lo);
        }
      })
      this.lteGps.forEach(element => {
        if (element.lte_qual.rssi >= -65) {
          this.series[0]++
        }
        else if (element.lte_qual.rssi >= -75) {
          this.series[1]++
        }
        else if (element.lte_qual.rssi >= -85) {
          this.series[2]++
        }
        else if (element.lte_qual.rssi >= -95) {
          this.series[3]++
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
    <div class="chart-wrap">
      <div id="chart">
        <apexchart class="donut" type="donut" width="380" :options="chartOptions" :series="series"></apexchart>
      </div>
    </div>
  </div>
</template>

<style>
.donut .apexcharts-tooltip span {
  color: white;
}
</style>
<script>

export default {
  name: 'DonutChartOldFirmware',
  data() {
    return {
      series: [44, 55, 13, 33],
      chartOptions: {
        chart: {
          foreColor: '#FFFFFF',
          width: 380,
          type: 'donut',
        },
        dataLabels: {
          enabled: false
        },
        labels: ['v. 1.01', 'v. 1.12', 'v. 1.14', 'v. 1.17'],
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
          text: 'Firmware version:',
          style: {
            color: '#FFFFFF'
          }
        }
      },
    }
  },
  methods: {
    appendData() {
      console.log("Pressed")
      var arr = this.series.slice()
      arr.push(Math.floor(Math.random() * (100 - 1 + 1)) + 1)
      this.series = arr
    },

    removeData() {
      if (this.series.length === 1) return
      var arr = this.series.slice()
      arr.pop()
      this.series = arr
    },

    randomize() {
      this.series = this.series.map(function () {
        return Math.floor(Math.random() * (100 - 1 + 1)) + 1
      })
    },

    reset() {
      this.series = [44, 55, 13, 33]
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
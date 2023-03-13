<script>

export default {
  name: 'DonutChart',
  data() {
    return {
      series: [44, 55, 13, 33],
      chartOptions: {
        chart: {
          width: 380,
          type: 'donut',
        },
        dataLabels: {
          enabled: false
        },
        labels: ['Team A', 'Team B', 'Team C', 'Team D'],
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
        }
      },
    }
  },
  methods: {
    whatever() {
      console.log("Hello")
    },
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
        <apexchart type="donut" width="380" :options="chartOptions" :series="series"></apexchart>
      </div>
    </div>

    <div class="actions" style="display: flex; gap: 25px;">
      <button @click="appendData">
        + ADD
      </button>

      <button @click="removeData">
        - REMOVE
      </button>

      <button @click="randomize">
        RANDOMIZE
      </button>

      <button @click="reset">
        RESET
      </button>
    </div>
  </div>
</template>

<style></style>
<script>
import DeviceService from '../DeviceService';

export default {
  name: 'LteColumn',
  data() {
    return {
      lteGps: [],
      series: [{
        name: "sales",
        data: [{
          x: '>-65',
          y: 0
        }, {
          x: '-66 til -75',
          y: 0
        }, {
          x: '-76 til -85',
          y: 0
        }, {
          x: '-86 til -95',
          y: 0
        }]
      }],
      chartOptions: {
        chart: {
          type: 'bar',
          height: 380
        },
        xaxis: {
          type: 'category',
        },
        title: {
          text: 'Lte Qual',
        },
        tooltip: {
          x: {
          }
        },
      },

    }
  },
  /**
   * `created` lifecycle method in Vue component
   *
   * This is an asynchronous method that is triggered once the Vue component has been created.
   * It fetches all device information from the server.
   * Then it loops through all the devices, specifically looking at the 'nbm_status' property of 'last_log' in each device.
   * If 'nbm_status' is not undefined, it pushes it to the `lteGps` array.
   * 
   * After processing all devices, it loops through all elements in the `lteGps` array.
   * Depending on the 'rssi' value of 'lte_qual' in each element, it increments a corresponding value in the 'series' array. 
   * 
   * If an error occurs during this process, it catches the error and stores the error message in the `error` data property.
   *
   * @async
   * @function created
   * @throws Will throw an error if the promise from `DeviceService.getAllDevices` is rejected.
   */
  async created() {
    try {
      const devices = await DeviceService.getAllDevices();
      devices.forEach(x => {
        const lo = x?.last_log?.data?.nbm_status;
        if (lo !== undefined) {
          this.lteGps.push(lo);
        }
      });

      this.lteGps.forEach(element => {
        if (element.lte_qual.rssi >= -65) {
          this.series[0].data[0].y++
        }
        else if (element.lte_qual.rssi >= -75) {
          this.series[0].data[1].y++
        }
        else if (element.lte_qual.rssi >= -85) {
          this.series[0].data[2].y++
        }
        else if (element.lte_qual.rssi >= -95) {
          this.series[0].data[3].y++
        }
      });
    } catch (err) {
      this.error = err.message
    }
  }
}

</script>

<template>
  <div id="chart" class="block max-w-xl p-6 border border-gray-200 rounded-lg shadow dark:border-gray-800">
    <apexchart height="350" type="bar" :options="chartOptions" :series="series"></apexchart>
  </div>
</template>

<style></style>
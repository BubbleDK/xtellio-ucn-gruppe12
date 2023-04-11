<script>
import DeviceService from '../DeviceService';
import moment from 'moment';

export default {
  name: "LastStatusOld",
  data() {
    return {
      devices: [{
        data: [0]
      }],
    }
  },
  async created() {
    try {
      this.temp = await DeviceService.getAllDevices();
      this.temp.forEach(device => {
        const lastStatus = device.status.ts;
        const lastStatusToMoment = moment.utc(lastStatus).format("DD/MM/YYYY HH:mm:SS")
        const hoursAgo24 = moment().subtract(24, 'hours').format("DD/MM/YYYY HH:mm:SS");
        if (lastStatusToMoment < hoursAgo24) {
          this.devices[0].data[0]++;
        }
      });
    } catch (err) {
      this.error = err.message
    }
  }
}
</script>

<template>
  <div class="block max-w-sm flex flex-col rounded-lg border border-gray-100 px-4 py-8 text-center dark:border-gray-800">
    <dt class="order-last text-lg font-medium text-gray-500 dark:text-gray-400">
      Devices haven't sent status in the last 24 hours
    </dt>
    <dd class="text-4xl font-extrabold text-blue-600 md:text-5xl">
      {{ this.devices[0].data[0] }}
    </dd>
  </div>
</template>
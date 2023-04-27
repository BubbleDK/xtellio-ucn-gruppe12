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
    <dt class="order-last text-lg font-medium text-white dark:text-white">
      Devices haven't sent status in the last 24 hours
    </dt>
    <dd class="text-4xl font-extrabold text-blue-600 md:text-5xl">
      {{ this.devices[0].data[0] }}
    </dd>
</template>
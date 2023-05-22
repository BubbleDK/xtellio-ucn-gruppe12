<script>
import DeviceService from '../../DeviceService';
import moment from 'moment';

export default {
  name: "LastStatusOld",
  data() {
    return {
      oldStatuses: 0,
    }
  },
  /**
   * Asynchronously called when the Vue instance is created.
   * Fetches all devices and iterates over each one to check the timestamp of the last status update.
   * The timestamp is formatted and compared with the timestamp 24 hours ago.
   * If the last status update of a device is older than 24 hours, the 'oldStatuses' counter is incremented.
   * @async
   */
  async created() {
    try {
      const devices = await DeviceService.getAllDevices();
      devices.forEach(device => {
        const lastStatus = device.status.ts;
        const lastStatusToMoment = moment.utc(lastStatus).format("DD/MM/YYYY HH:mm:SS")
        const hoursAgo24 = moment().subtract(24, 'hours').format("DD/MM/YYYY HH:mm:SS");
        if (lastStatusToMoment < hoursAgo24) {
          this.oldStatuses++;
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
    Last status older than 24 hours
  </dt>
  <dd class="text-4xl font-extrabold text-blue-600 md:text-5xl">
    {{ oldStatuses }}
  </dd>
</template>
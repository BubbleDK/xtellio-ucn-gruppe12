<script>
import DeviceService from '../../DeviceService';
import moment from 'moment';

export default {
  name: "LastLogOld",
  data() {
    return {
      oldLogs: 0,
    }
  },
  /**
   * Asynchronously called when the Vue instance is created.
   * Fetches all devices and iterates over each one to check the timestamp of the last log entry.
   * The timestamp is formatted and compared with the timestamp 24 hours ago.
   * If the last log entry of a device is older than 24 hours, the 'oldLogs' counter is incremented.
   * @async
   */
  async created() {
    try {
      const allDevices = await DeviceService.getAllDevices();
      allDevices.forEach(device => {
        const lastLog = device?.last_log?.ts;
        const lastLogToMoment = moment.utc(lastLog).format("DD/MM/YYYY HH:mm:SS")
        const hoursAgo24 = moment().subtract(24, 'hours').format("DD/MM/YYYY HH:mm:SS");
        if (lastLogToMoment < hoursAgo24) {
          this.oldLogs++;
        }
      });
    } catch (err) {
      console.error(err.message);
    }
  },
  methods: {
    /**
     * Method used for routing to the 'DeviceListView' with a query parameter 'lg'.
     * This query parameter can be used in the 'DeviceListView' to filter or display certain data.
     */
    goToList() {
      this.$router.push({ name: 'DeviceListView', query: { lg: true } })
    }
  }
}
</script>

<template>
  <router-link to="/devicelistview?lg=true">
    <dd class="text-4xl font-extrabold text-blue-600 md:text-5xl" @click="goToList()">
      {{ oldLogs }}
    </dd>
    <dt class="order-last text-lg font-medium text-white dark:text-white">
      Transmission older than 24 hours
    </dt>
  </router-link>
</template>
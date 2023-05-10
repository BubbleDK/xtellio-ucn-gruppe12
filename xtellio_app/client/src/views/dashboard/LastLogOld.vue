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
      Devices where last transmission older than 24 hours
    </dt>
  </router-link>
</template>
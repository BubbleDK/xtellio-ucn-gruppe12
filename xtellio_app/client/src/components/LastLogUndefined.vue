<script>
import DeviceService from '../DeviceService';

export default {
  name: "LastLogUndefined",
  data() {
    return {
      undefinedLog: 0,
    }
  },
  async created() {
    try {
      const devices = await DeviceService.getAllDevices();
      devices.forEach(device => {
        const lastLog = device?.last_log?.ts;
        if (lastLog === undefined) {
          this.undefinedLog++;
        }
      });
    } catch (err) {
      this.error = err.message
    }
  },
  methods: {
    goToList() {
      const status = "inactive";
      this.$router.push({ name: 'DeviceListView', state: { st: status } })
    }
  }
}
</script>

<template>
  <router-link to="/devicelistview" @click="goToList()">
    <dd class="text-4xl font-extrabold text-blue-600 md:text-5xl">
      {{ this.undefinedLog }}
    </dd>
    <dt class="order-last text-lg font-medium text-white dark:text-white">
      Inactive Devices
    </dt>
  </router-link>
</template>
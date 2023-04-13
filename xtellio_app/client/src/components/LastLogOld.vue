<script>
import DeviceService from '../DeviceService';
import moment from 'moment';

export default {
  name: "LastLogOld",
  data() {
    return {
      devices: [{
        data: [0]
      }],
      undefinedLog:[],
    }
  },
  async created() {
    try {
      this.temp = await DeviceService.getAllDevices();
      this.temp.forEach(device => {
        const lastLog = device?.last_log?.ts;
        const lastLogToMoment = moment.utc(lastLog).format("DD/MM/YYYY HH:mm:SS")
        const hoursAgo24 = moment().subtract(24, 'hours').format("DD/MM/YYYY HH:mm:SS");
        if (lastLogToMoment < hoursAgo24) {
          this.devices[0].data[0]++;
        }
        if(lastLog === undefined) {
            this.undefinedLog++;
        }
      });
    } catch (err) {
      this.error = err.message
    }
  },
  methods: {
    goToList() {
      this.$router.push({ name: 'DeviceListView', query: {lg: true} })
    }
  }
}
</script>

<template>
  <a href="">
    <dd class="text-4xl font-extrabold text-blue-600 md:text-5xl" @click="goToList()">
      {{ this.devices[0].data[0] }}
    </dd>
    <dt class="order-last text-lg font-medium text-gray-500 dark:text-gray-400">
      Devices that haven't logged in the last 24 hours
    </dt>
  </a>
</template>
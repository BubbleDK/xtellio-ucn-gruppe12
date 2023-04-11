<script>
import DeviceService from '../DeviceService';

export default {
  name: "LastLogUndefined",
  data() {
    return {
      undefinedLog:[],
    }
  },
  async created() {
    try {
      this.temp = await DeviceService.getAllDevices();
      this.temp.forEach(device => {
        const lastLog = device?.last_log?.ts;
        if(lastLog === undefined) {
            this.undefinedLog++;
        }
      });
    } catch (err) {
      this.error = err.message
    }
  }
}
</script>

<template>
    <dt class="order-last text-lg font-medium text-gray-500 dark:text-gray-400">
      Inactive Devices
    </dt>
    <dd class="text-4xl font-extrabold text-blue-600 md:text-5xl">
      {{ this.undefinedLog }}
    </dd>
  
</template>
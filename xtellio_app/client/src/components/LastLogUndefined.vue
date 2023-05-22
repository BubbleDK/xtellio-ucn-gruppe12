<script>
import DeviceService from '../DeviceService';

export default {
  name: "LastLogUndefined",
  data() {
    return {
      undefinedLog: 0,
    }
  },
  /**
   * `created` lifecycle method in Vue component
   *
   * This is an asynchronous method that is triggered once the Vue component has been created. 
   * It fetches all device information from the server. 
   * Then it loops through all the devices and checks if the 'last_log' property of each device is undefined.
   * If 'last_log' is undefined, the `undefinedLog` counter is incremented.
   * If an error occurs during this process, it catches the error and stores the error message in the `error` data property.
   *
   * @async
   * @function created
   * @throws Will throw an error if the promise from `DeviceService.getAllDevices` is rejected.
   */
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
    /**
     * `goToList` method in Vue component
     *
     * This is a method that pushes a new route to the router. 
     * The route name is 'DeviceListView' and it carries a state object where the property 'st' is set to 'inactive'.
     * This method can be used to navigate to a list of inactive devices.
     *
     * @function goToList
     */
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
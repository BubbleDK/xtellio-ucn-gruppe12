<template>
  <div>
    <h1>All devices</h1>
  </div>
  <hr>
  <p v-if="error">{{ error }}</p>

  <div>
    <div v-for="(device, index) in devices" v-bind:item="device" v-bind:index="index" v-bind:key="device._id">
      <p>{{ JSON.stringify(device.status) }}</p>
    </div>
  </div>
</template>

<script>
import DeviceService from '../DeviceService'

export default {
  name: 'HelloWorld',
  data() {
    return {
      devices: [],
      error: '',
    }
  },
  async created() {
    try {
      this.devices = await DeviceService.getAllDevices();
    } catch (err) {
      this.error = err.message
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>

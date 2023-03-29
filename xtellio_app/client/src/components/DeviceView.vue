<script>
import DeviceService from '../DeviceService';
export default {
  name: 'DeviceView',
  data() {
    return {
      device: [],
      macVal: this.$route.params.Mac,
    }
  },
  async created() {
        try {
            this.device = await DeviceService.getDevice(this.macVal);
            console.log(this.device.status.batt);
        } catch (err) {
            this.error = err.message
        }
    },
    methods: {
    currentDate(temp) {
     const current = new Date(temp);
    const date = current.toLocaleString();
      return date;
    }
    }
}
</script>

<template>
    <div class="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
        <div class="border-t border-white-200">
    <dl>
      <div class="px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
        <dt class="text-sm font-medium text-white-500">MAC</dt>
        <dd class="mt-1 text-sm text-white-500 sm:col-span-2 sm:mt-0">{{device.mac}}</dd>
      </div>
      <div class="px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
        <dt class="text-sm font-medium text-white-500">Customer</dt>
        <dd class="mt-1 text-sm text-white-900 sm:col-span-2 sm:mt-0">{{ device.customer }}</dd>
      </div>
      <div class="px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
        <dt class="text-sm font-medium text-white-500">State</dt>
        <dd class="mt-1 text-sm text-white-900 sm:col-span-2 sm:mt-0">{{ device.state }}</dd>
      </div>
      <div class="px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
        <dt class="text-sm font-medium text-white-500">Type</dt>
        <dd class="mt-1 text-sm text-white-900 sm:col-span-2 sm:mt-0">{{ device.type }}</dd>
      </div>
      <div class="px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
        <dt class="text-sm font-medium text-white-500">Battery</dt>
        <dd class="mt-1 text-sm text-white-900 sm:col-span-2 sm:mt-0">{{ this.device?.status?.batt }}</dd>
      </div>
      <div class="px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
        <dt class="text-sm font-medium text-white-500">Firmware</dt>
        <dd class="mt-1 text-sm text-white-900 sm:col-span-2 sm:mt-0">{{ this.device?.status?.sw }}</dd>
      </div>
      <div class="px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
        <dt class="text-sm font-medium text-white-500">Last Timestamp</dt>
        <dd class="mt-1 text-sm text-white-900 sm:col-span-2 sm:mt-0">{{ currentDate(this.device?.status?.ts) }}</dd>
      </div>
    </dl>
        </div>
    </div>
</template>
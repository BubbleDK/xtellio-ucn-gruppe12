<script>
import DeviceService from '../DeviceService';
export default {
  name: 'DeviceView',
  data() {
    return {
      device: []
    }
  },
  async created() {
        try {
            this.device = await DeviceService.getDevice(this.$route.params.Mac);
            console.log(this.device);
        } catch (err) {
            this.error = err.message
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
        <dd class="mt-1 text-sm text-white-900 sm:col-span-2 sm:mt-0">{{ device.status.batt }}</dd>
      </div>
      <div class="px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
        <dt class="text-sm font-medium text-white-500">Firmware</dt>
        <dd class="mt-1 text-sm text-white-900 sm:col-span-2 sm:mt-0">{{ device.status.sw }}</dd>
      </div>
      <div class="px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
        <dt class="text-sm font-medium text-white-500">About</dt>
        <dd class="mt-1 text-sm text-white-900 sm:col-span-2 sm:mt-0">Fugiat ipsum ipsum deserunt culpa aute sint do nostrud anim incididunt cillum culpa consequat. Excepteur qui ipsum aliquip consequat sint. Sit id mollit nulla mollit nostrud in ea officia proident. Irure nostrud pariatur mollit ad adipisicing reprehenderit deserunt qui eu.</dd>
      </div>
    </dl>
        </div>
    </div>
</template>
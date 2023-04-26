<script>
import DeviceService from '../DeviceService';
export default {
  name: 'CustomerView',
  data() {
    return {
      customerDevices: [],
      customerName: this.$route.params.customerName,
    }
  },
  async created() {
    try {
      this.customerDevices = await DeviceService.getAllCustomerDevices(this.customerName);
      console.log(this.customerDevices)
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
  <section class="bg-gray-200 dark:bg-gray-900 overflow-y-auto transition duration-500 ease-in-out h-full">
  <div class="mx-auto max-w-7xl py-6">
    <div class="relative max-w-xs mb-6">
      <label for="search" class="sr-only"> Search </label>
      <input type="text" v-model="input" name="search"
        class="block w-full p-3 pl-10 text-sm border-gray-200 rounded-md focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400"
        placeholder="Search..." />
      <div class="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
        <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24"
          stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
      </div>
      <span class="text-sm">
        {{ customerName }} has <strong>{{ customerDevices.length }}</strong> devices
      </span>
    </div>

    <div class="grid grid-cols-4 gap-4 mx-auto max-w-7xl py-6">
      <div class="bg-gray-800 p-6 rounded-lg shadow-lg" v-for="device in customerDevices">
        <div class="flex justify-between items-baseline pb-2 ">
        <div class="flex ">
          <span v-if="device.state == 'Active'" class="bg-teal-200 text-black text-xs px-2 inline-block rounded-full  uppercase font-semibold tracking-wide">
            {{ device.state }}
          </span>
          <span v-else-if="device.state == 'Inactive'" class="bg-red-200 text-black text-xs px-2 inline-block rounded-full  uppercase font-semibold tracking-wide">
            {{ device.state }}
          </span>
          <span v-else-if="device.state == 'Factory'" class="bg-yellow-200 text-black text-xs px-2 inline-block rounded-full  uppercase font-semibold tracking-wide">
            {{ device.state }}
          </span>
          <span v-else class="bg-gray-400 text-black text-xs px-2 inline-block rounded-full  uppercase font-semibold tracking-wide">
            {{ device.state }}
          </span>
        </div>
        <div>
          <span class="text-sm font-medium text-gray-500 dark:text-gray-400">QR: </span>
          <span class="text-sm font-medium text-gray-500 dark:text-gray-400">{{ device?.ids?.qr }}</span>
        </div>
      </div>
        <h4 class="mt-1 text-xl font-semibold uppercase leading-tight truncate text-white-900">{{ device.mac }}</h4>

        <div class="mt-1 text-white-900">
          Battery:
          <span class="text-white-600 text-sm"> {{ device.status?.batt }}</span>
          <div>
            <label class="text-sm text-white-900">Firmware: </label>
          <span class="text-sm text-white-900"> {{ device.status?.sw }}</span>
        </div>
        </div>
        <div class="mt-4">
          <span class="text-teal-600 text-md font-semibold">Last timestamp: </span>
          <span class="text-sm text-white-600">{{ currentDate(device.status?.ts) }}</span>
        </div>
      </div>
    </div>
  </section>
</template>
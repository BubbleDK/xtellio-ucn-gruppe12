<script>
import DeviceService from '../DeviceService';

export default {
  name: 'DeviceList',
  data() {
    return {
      devices: [],
      input: ""
    }
  },
  async created() {
    try {
      this.devices = await DeviceService.getAllDevices();
      const status_order = {
        Active: 1,
        Factory: 2,
        Inactive: 3
      };
      //console.log(this.devices)
      const sorted_list = this.devices.sort((a, b) => {
        return status_order[a.state] - status_order[b.state];
      });
      console.log(sorted_list)

      this.devices = sorted_list
    } catch (err) {
      this.error = err.message
    }
  },
  computed: {
    filteredList: function () {
      if (this.input === "") {
        return this.devices;
      } else {
        let index = this.input.indexOf(":");
        let field = this.input.substring(0, index);
        let query = this.input.substring(index + 1);
        if (field.toLocaleLowerCase() === "battery") {
          return this.devices.filter((device) => device.status.batt.toString() === query);
        }
        else if (field.toLocaleLowerCase() === "firmware") {
          return this.devices.filter((device) => device.status.sw === query);
        }
        return this.devices.filter((device) => device[field.toLowerCase()]?.toLowerCase().match(query));
      }
    },
  },
  methods: {
    goTodetail(mac) {
      this.$router.push({ name: 'DeviceView', params: { Mac: mac } })
    }
  }
}

</script>

<template>
  <section class="container mx-auto">
    <div class="flex flex-col">
      <div class="-mx-4 -my-2 overflow-x-auto">
        <div class="inline-block min-w-full py-2 align-middle">
          <div class="flex justify-between py-3 pl-2">
            <div class="relative max-w-xs">
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
            <button
              class="relative z-0 inline-flex text-sm rounded-md shadow-sm hover:bg-gray-30 focus:z-10">
              <span
                class="relative inline-flex items-center px-3 py-3 space-x-2 text-sm font-medium text-gray-600 bg-white border border-gray-300 rounded-md">
                <div>
                  <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24"
                    stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round"
                      d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                  </svg>
                </div>
                <div class="hidden sm:block">Filters</div>
              </span>
            </button>
          </div>
          <div class="overflow-hidden border border-gray-200 dark:border-gray-700">
            <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead class="dark:bg-gray-800">
                <tr>
                  <th scope="col"
                    class="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <div class="flex items-center gap-x-3">
                      <button class="flex items-center gap-x-2">
                        <span>Type</span>
                        <svg class="h-3" viewBox="0 0 10 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path
                            d="M2.13347 0.0999756H2.98516L5.01902 4.79058H3.86226L3.45549 3.79907H1.63772L1.24366 4.79058H0.0996094L2.13347 0.0999756ZM2.54025 1.46012L1.96822 2.92196H3.11227L2.54025 1.46012Z"
                            fill="currentColor" stroke="currentColor" stroke-width="0.1" />
                          <path
                            d="M0.722656 9.60832L3.09974 6.78633H0.811638V5.87109H4.35819V6.78633L2.01925 9.60832H4.43446V10.5617H0.722656V9.60832Z"
                            fill="currentColor" stroke="currentColor" stroke-width="0.1" />
                          <path
                            d="M8.45558 7.25664V7.40664H8.60558H9.66065C9.72481 7.40664 9.74667 7.42274 9.75141 7.42691C9.75148 7.42808 9.75146 7.42993 9.75116 7.43262C9.75001 7.44265 9.74458 7.46304 9.72525 7.49314C9.72522 7.4932 9.72518 7.49326 9.72514 7.49332L7.86959 10.3529L7.86924 10.3534C7.83227 10.4109 7.79863 10.418 7.78568 10.418C7.77272 10.418 7.73908 10.4109 7.70211 10.3534L7.70177 10.3529L5.84621 7.49332C5.84617 7.49325 5.84612 7.49318 5.84608 7.49311C5.82677 7.46302 5.82135 7.44264 5.8202 7.43262C5.81989 7.42993 5.81987 7.42808 5.81994 7.42691C5.82469 7.42274 5.84655 7.40664 5.91071 7.40664H6.96578H7.11578V7.25664V0.633865C7.11578 0.42434 7.29014 0.249976 7.49967 0.249976H8.07169C8.28121 0.249976 8.45558 0.42434 8.45558 0.633865V7.25664Z"
                            fill="currentColor" stroke="currentColor" stroke-width="0.3" />
                        </svg>
                      </button>
                    </div>
                  </th>
                  <th scope="col"
                    class="px-6 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    Org
                  </th>
                  <th scope="col"
                    class="px-6 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    Customer
                  </th>
                  <th scope="col"
                    class="px-6 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    State
                  </th>
                  <th scope="col"
                    class="px-6 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    Mac
                  </th>
                  <th scope="col"
                    class="px-6 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    Battery
                  </th>
                  <th scope="col"
                    class="px-6 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    Firmware
                  </th>
                  <th scope="col" class="relative py-3.5 px-4">
                    <span class="sr-only">Actions</span>
                  </th>
                </tr>
              </thead>
              <tbody class="bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-900">
                <tr v-for="device in filteredList">
                  <td class="px-6 py-4 text-sm font-medium text-white-800 whitespace-nowrap">
                    {{ device.type }}
                  </td>
                  <td class="px-6 py-4 text-sm text-white-800 whitespace-nowrap">
                    {{ device.org }}
                  </td>
                  <td class="px-6 py-4 text-sm text-white-800 whitespace-nowrap">
                    {{ device.customer }}
                  </td>
                  <td class="text-sm text-white-800 whitespace-nowrap">
                    <div v-if="device.state == 'Active'"
                      class="inline-flex items-center px-3 py-1 rounded-full gap-x-2 text-emerald-500 dark:bg-gray-800">
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M10 3L4.5 8.5L2 6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"
                          stroke-linejoin="round" />
                      </svg>
                      <h2 class="text-sm font-normal">{{ device.state }}</h2>
                    </div>
                    <div v-else-if="device.state == 'Factory'" class="inline-flex items-center px-3 py-1 rounded-full gap-x-2 text-yellow-500 dark:bg-gray-800">
                      <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24">
                        <path stroke-linejoin="round" stroke-width="1.5" stroke-linecap="round" fill="currentColor" stroke="currentColor" d="M0 10h24v4h-24z"/>
                      </svg>
                      <h2 class="text-sm font-normal">{{ device.state }}</h2>
                    </div>
                    <div v-else class="inline-flex items-center px-3 py-1 text-red-500 rounded-full gap-x-2 bg-red-100/60 dark:bg-gray-800">
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M9 3L3 9M3 3L9 9" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"
                          stroke-linejoin="round" />
                      </svg>
                      <h2 class="text-sm font-normal">{{ device.state }}</h2>
                    </div>
                  </td>
                  <td class="px-6 py-4 text-sm text-white-800 whitespace-nowrap">
                    {{ device.mac }}
                  </td>
                  <td class="px-6 py-4 text-sm text-white-800 whitespace-nowrap">
                    {{ device.status.batt }}
                  </td>
                  <td class="px-6 py-4 text-sm text-white-800 whitespace-nowrap">
                    {{ device.status.sw }}
                  </td>
                  <td class="px-6 py-4 text-sm font-medium text-right whitespace-nowrap">
                    <a class="text-green-500 hover:text-green-700" href="#" @click="goTodetail(device.mac)">
                      View
                    </a>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
    <div class="flex items-center justify-between mt-6">
      <a href="#"
        class="flex items-center px-5 py-2 text-sm text-gray-700 capitalize transition-colors duration-200 bg-white border rounded-md gap-x-2 hover:bg-gray-100 dark:bg-gray-900 dark:text-gray-200 dark:border-gray-700 dark:hover:bg-gray-800">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
          class="w-5 h-5 rtl:-scale-x-100">
          <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18" />
        </svg>
        <span>
          previous
        </span>
      </a>
      <div class="items-center hidden md:flex gap-x-3">
        <a href="#" class="px-2 py-1 text-sm text-blue-500 rounded-md dark:bg-gray-800 bg-blue-100/60">1</a>
        <a href="#"
          class="px-2 py-1 text-sm text-gray-500 rounded-md dark:hover:bg-gray-800 dark:text-gray-300 hover:bg-gray-100">2</a>
        <a href="#"
          class="px-2 py-1 text-sm text-gray-500 rounded-md dark:hover:bg-gray-800 dark:text-gray-300 hover:bg-gray-100">3</a>
        <a href="#"
          class="px-2 py-1 text-sm text-gray-500 rounded-md dark:hover:bg-gray-800 dark:text-gray-300 hover:bg-gray-100">...</a>
        <a href="#"
          class="px-2 py-1 text-sm text-gray-500 rounded-md dark:hover:bg-gray-800 dark:text-gray-300 hover:bg-gray-100">12</a>
        <a href="#"
          class="px-2 py-1 text-sm text-gray-500 rounded-md dark:hover:bg-gray-800 dark:text-gray-300 hover:bg-gray-100">13</a>
        <a href="#"
          class="px-2 py-1 text-sm text-gray-500 rounded-md dark:hover:bg-gray-800 dark:text-gray-300 hover:bg-gray-100">14</a>
      </div>
      <a href="#"
        class="flex items-center px-5 py-2 text-sm text-gray-700 capitalize transition-colors duration-200 bg-white border rounded-md gap-x-2 hover:bg-gray-100 dark:bg-gray-900 dark:text-gray-200 dark:border-gray-700 dark:hover:bg-gray-800">
        <span>
          Next
        </span>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
          class="w-5 h-5 rtl:-scale-x-100">
          <path stroke-linecap="round" stroke-linejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
        </svg>
      </a>
    </div>
  </section>
</template>

<style></style>
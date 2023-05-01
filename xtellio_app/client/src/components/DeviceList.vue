<script>
import DeviceService from '../DeviceService';
import moment from 'moment';
import { ref } from 'vue'
import {
  Dialog,
  DialogPanel,
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  TransitionChild,
  TransitionRoot,
} from '@headlessui/vue'
import { XMarkIcon } from '@heroicons/vue/24/outline'
import { ChevronDownIcon, FunnelIcon, MinusIcon, PlusIcon, Squares2X2Icon } from '@heroicons/vue/20/solid'


export default {
  name: 'DeviceList',
  data() {
    return {
      filterTriggered: false,
      deviceLengthOverZero: false,
      devices: [],
      filteredDevices: [],
      inactiveInput: window.history.state.st,
      lastLogOld: this.$route.query.lg,
      lastLogOldList: [],
      macAddressInput: '',
      firmwareInput: '',
      selected: 'Sort',
      currentPage: 1,
      pageSize: 10,
      filters: [
        {
          id: 'org',
          name: 'Org',
          options: [],
        },
        {
          id: 'customer',
          name: 'Customer',
          options: [],
        },
        {
          id: 'state',
          name: 'State',
          options: [
            { value: 'Active', label: 'Active', checked: false },
            { value: 'Inactive', label: 'Inactive', checked: false },
            { value: 'Factory', label: 'Factory', checked: false },
            { value: 'Unknown', label: 'Unknown', checked: false },
          ],
        },
        {
          id: 'mac',
          name: 'MAC',
          options: [
            { value: '' },
          ],
        },
        {
          id: 'battery',
          name: 'Battery',
          options: [
            { value: '0', label: '0', checked: false },
            { value: '2000-2500', label: '2000-2500', checked: false },
            { value: '2501-3000', label: '2501-3000', checked: false },
            { value: '3001-3500', label: '3001-3500', checked: false },
            { value: '3501-4000', label: '3501-4000', checked: false },
            { value: '>4000', label: '>4000', checked: false },
          ],
        },
        {
          id: 'firmware',
          name: 'Firmware',
          options: [
            { value: '' },
          ],
        },
      ],
      sortOptions: [
        { name: 'Type A-Z', current: false },
        { name: 'Type Z-A', current: false },
        { name: 'Customer A-Z', current: false },
        { name: 'Customer Z-A', current: false },
        { name: 'State A-Z', current: false },
        { name: 'State Z-A', current: false },
        { name: 'Battery: High to Low', current: false },
        { name: 'Battery: Low to High', current: false },
      ]
    }
  },
  async created() {
    try {
      this.devices = await DeviceService.getAllDevices();
      const stateOrder = { Active: 1, Inactive: 2, Factory: 3, Unknown: 4 };
      this.showInactive();
      this.showLastLogOld();
      this.showBattery();
      this.showState();
      this.showFirmware()
      this.devices.sort((a, b) => {
        return stateOrder[a.state] - stateOrder[b.state];
      });

      for (let i = 0; i < this.devices.length; i++) {
        const element = this.devices[i]
        if (!this.filters[0].options.some(option => option.value === element.org)) {
          this.filters[0].options.push({ value: element.org, label: element.org, checked: false })
        }

        if (!this.filters[1].options.some(option => option.value === element.customer)) {
          this.filters[1].options.push({ value: element.customer, label: element.customer, checked: false })
        }
      }
    } catch (err) {
      this.error = err.message
    }
  },
  computed: {
    filteredList() {
      const checkedFilters = this.filters.reduce((acc, filter) => {
        const checkedOptions = filter.options.filter(option => option.checked);
        if (checkedOptions.length > 0) {
          acc[filter.id] = checkedOptions.map(option => option.value);
        }
        return acc;
      }, {});

      if (Object.keys(checkedFilters).length === 0 && !this.macAddressInput && !this.firmwareInput) {
        return this.devices;
      }

      let filteredDevices = this.devices.filter(device => {
        for (const [filterId, filterValues] of Object.entries(checkedFilters)) {
          if (filterId === 'battery') {
            let batteryMatch = false;
            for (const option of filterValues) {
              const [min, max] = option.split('-');
              if (min === '0' && device.status.batt === 0) {
                batteryMatch = true;
                break;
              }
              if (min === '0' && device.status.batt <= max) {
                batteryMatch = true;
                break;
              }
              if (max === '>4000' && device.status.batt >= min) {
                batteryMatch = true;
                break;
              }
              if (device.status.batt >= min && device.status.batt <= max) {
                batteryMatch = true;
                break;
              }
            }
            if (!batteryMatch) {
              return false;
            }
          } else {
            if (!filterValues.includes(device[filterId])) {
              return false;
            }
          }
        }
        return true;
      });

      // Filter the devices by the selected MAC address value
      if (this.macAddressInput) {
        filteredDevices = filteredDevices.filter(device => device.mac.toLowerCase().includes(this.macAddressInput.toLowerCase()));
      }
      // Filter the devices by the selected firmware value
      if (this.firmwareInput) {
        filteredDevices = filteredDevices.filter(device => device.status.sw.toLowerCase().includes(this.firmwareInput.toLowerCase()));
      }

      return filteredDevices
    },
    paginatedFilteredList() {
      const start = (this.currentPage - 1) * this.pageSize;
      const end = start + this.pageSize;
      return this.filteredList.slice(start, end);
    },
    pageCount() {
      return Math.ceil(this.filteredList.length / this.pageSize);
    },
  },
  watch: {
    filters: {
      handler() {
        // This will trigger the computed property filteredList to be updated
        this.filteredList;
      },
      deep: true,
    },
    filteredList() {
      this.adjustCurrentPage();
    },
  },
  methods: {
    adjustCurrentPage() {
      if (this.currentPage > this.pageCount) {
        this.currentPage = this.pageCount;
      } else if (this.currentPage < 1 && this.pageCount > 0) {
        this.currentPage = 1;
      }
    },
    goTodetail(mac) {
      this.$router.push({ name: 'DeviceView', params: { Mac: mac } })
    },
    showInactive() {
      if (this.inactiveInput) {
        const inactiveVal = this.filters[2].options.find(x => x.value.toLowerCase() === "inactive");
        inactiveVal.checked = true;
      }
    },
    showLastLogOld() {
      if (this.lastLogOld === "true") {
        this.devices.forEach(device => {
          const lastLog = device?.last_log?.ts;
          const lastLogToMoment = moment.utc(lastLog).format("DD/MM/YYYY HH:mm:SS")
          const hoursAgo24 = moment().subtract(24, 'hours').format("DD/MM/YYYY HH:mm:SS");
          if (lastLogToMoment < hoursAgo24) {
            this.lastLogOldList.push(device);
            this.devices = this.lastLogOldList;
          }
        });
      }
    },
    showBattery() {
      if(this.$route.query.battery){
        const battVal = this.filters[4].options.find(x => x.value.toLowerCase() === this.$route.query.battery.toLowerCase())
        battVal.checked = true;
      }
    },
    showFirmware(){
      if(this.$route.query.firmware){
        this.devices = JSON.parse(this.$route.query.firmware);
      }
    },
    showState(){
      if(this.$route.query.state){
        const stateVal = this.filters[2].options.find(x => x.value.toLowerCase() === this.$route.query.state.toLowerCase())
        stateVal.checked = true;
      }
    },
    getActiveFilters() {
      return this.filters.filter((filter) => {
        // For all other filters, check if an option is selected
        return filter.options.some((option) => option.checked);
      });
    },
    currentSortOption(name) {
      for (let index = 0; index < this.sortOptions.length; index++) {
        const element = this.sortOptions[index];
        if(element.name !== name){
          element.current = false;
        }
        else{
          element.current = true;
          this.sortedList(element)
          this.selected = element.name
        }
      }
    },
    sortedList(sortOption) {
      console.log(sortOption.name)
      switch(sortOption.name) {
      case 'Type A-Z':
          this.devices.sort((a, b) => a.type.localeCompare(b.type));
          break;
        case 'Type Z-A':
          this.devices.sort((a, b) => b.type.localeCompare(a.type));
          break;
        case 'Customer A-Z':
          this.devices.sort((a, b) => a.customer.localeCompare(b.customer));
          break;
        case 'Customer Z-A':
          this.devices.sort((a, b) => b.customer.localeCompare(a.customer));
          break;
        case 'State A-Z':
          this.devices.sort((a, b) => a.state.localeCompare(b.state));
          break;
        case 'State Z-A':
          this.devices.sort((a, b) => b.state.localeCompare(a.state));
          break;
        case 'Battery: High to Low':
          this.devices.sort((a, b) => b.status.batt - a.status.batt);
          break;
        case 'Battery: Low to High':
          this.devices.sort((a, b) => a.status.batt - b.status.batt);
          break;
        default:
          break;
      }
      return this.devices;
    },
  }
}
</script>

<script setup>

const mobileFiltersOpen = ref(false)
</script>

<template>
  <div>
    <div>
      <main class="mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-baseline justify-between border-b border-gray-200 pb-6 pt-24">
          <h1 class="text-4xl font-bold tracking-tight text-white">Devices</h1>

          <div class="flex items-center">
            <Menu as="div" class="relative inline-block text-left">
              <div>
                <MenuButton
                  class="group inline-flex justify-center text-sm font-medium text-gray-300 hover:text-white"
                  >
                  <p>{{ selected }}</p>
                  <ChevronDownIcon class="-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-white"
                    aria-hidden="true" />
                </MenuButton>
              </div>

              <transition enter-active-class="transition ease-out duration-100"
                enter-from-class="transform opacity-0 scale-95" enter-to-class="transform opacity-100 scale-100"
                leave-active-class="transition ease-in duration-75" leave-from-class="transform opacity-100 scale-100"
                leave-to-class="transform opacity-0 scale-95">
                <MenuItems
                  class="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none">
                  <div class="py-1">
                    <MenuItem v-for="option in sortOptions" :key="option.name" v-slot="{ active }">
                    <a href="#"
                      :class="[option.current ? 'font-medium text-black' : 'text-black', active ? 'bg-gray-200' : '', 'block px-4 py-2 text-sm']" @click="currentSortOption(option.name)">{{
                        option.name }} </a>
                    </MenuItem>
                  </div>
                </MenuItems>
              </transition>
            </Menu>
          </div>
        </div>

        <section aria-labelledby="products-heading" class="pb-24 pt-6">
          <h2 id="products-heading" class="sr-only">Products</h2>

          <div class="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
            <!-- Filters -->
            <form class="hidden lg:block">
              <h3 class="sr-only">Categories</h3>

              <Disclosure as="div" v-for="section in filters" :key="section.id" class="border-b border-gray-200 py-6"
                v-slot="{ open }">
                <h3 class="-my-3 flow-root">
                  <DisclosureButton
                    class="flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-white">
                    <span class="font-medium text-white">{{ section.name }}</span>
                    <span class="ml-6 flex items-center">
                      <PlusIcon v-if="!open" class="h-5 w-5" aria-hidden="true" />
                      <MinusIcon v-else class="h-5 w-5" aria-hidden="true" />
                    </span>
                  </DisclosureButton>
                </h3>
                <DisclosurePanel class="pt-6">
                  <div class="space-y-4">
                    <div v-for="(option, optionIdx) in section.options" :key="option.value" class="flex items-center">
                      <input v-if="'mac' === `${section.id}`" :id="`filter-${section.id}-${optionIdx}`" :name="`${section.id}[]`" :value="macAddressInput"
                      type="text" @input="macAddressInput = $event.target.value"
                      class="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" />
                      <input v-else-if="'firmware' === `${section.id}`" :id="`filter-${section.id}-${optionIdx}`" :name="`${section.id}[]`" :value="firmwareInput"
                      type="text" @input="firmwareInput = $event.target.value"
                      class="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" />
                      <input v-else :id="`filter-${section.id}-${optionIdx}`" :name="`${section.id}[]`" :value="option.value"
                      type="checkbox" :checked="option.checked" @change="option.checked = !option.checked"
                      class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" />
                      <label :for="`filter-${section.id}-${optionIdx}`" class="ml-3 text-sm text-white">{{ option.label
                      }}</label>
                    </div>
                  </div>
                </DisclosurePanel>
              </Disclosure>
            </form>

            <!-- Product grid -->
            <div class="lg:col-span-3">
              <!-- Your content -->
              <div class="overflow-hidden border border-gray-200 dark:border-gray-700">
                <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                  <thead class="dark:bg-gray-800">
                    <tr>
                      <th scope="col"
                        class="px-6 py-3.5 text-sm font-normal text-left rtl:text-right text-white dark:text-gray-400">
                        Type
                      </th>
                      <th scope="col"
                        class="px-6 py-3.5 text-sm font-normal text-left rtl:text-right text-white dark:text-gray-400">
                        Org
                      </th>
                      <th scope="col"
                        class="px-6 py-3.5 text-sm font-normal text-left rtl:text-right text-white dark:text-gray-400">
                        Customer
                      </th>
                      <th scope="col"
                        class="px-6 py-3.5 text-sm font-normal text-left rtl:text-right text-white dark:text-gray-400">
                        State
                      </th>
                      <th scope="col"
                        class="px-6 py-3.5 text-sm font-normal text-left rtl:text-right text-white dark:text-gray-400">
                        Mac
                      </th>
                      <th scope="col"
                        class="px-6 py-3.5 text-sm font-normal text-left rtl:text-right text-white dark:text-gray-400">
                        QR
                      </th>
                      <th scope="col"
                        class="px-6 py-3.5 text-sm font-normal text-left rtl:text-right text-white dark:text-gray-400">
                        Battery
                      </th>
                      <th scope="col"
                        class="px-6 py-3.5 text-sm font-normal text-left rtl:text-right text-white dark:text-gray-400">
                        Firmware
                      </th>
                      <th scope="col" 
                        class="px-6 py-3.5 text-sm font-normal text-left rtl:text-right text-white dark:text-gray-400">
                        Details
                        <span class="sr-only">Actions</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody class="bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-900">
                    <tr v-for="device in paginatedFilteredList">
                      <td class="px-6 py-4 text-sm font-medium text-white-800 whitespace-nowrap">
                        {{ device?.type }}
                      </td>
                      <td class="px-6 py-4 text-sm text-white-800 whitespace-nowrap">
                        {{ device?.org }}
                      </td>
                      <td v-if="device?.customer === ''" class="px-6 py-4 text-sm text-white-800 whitespace-nowrap">
                        Unknown
                      </td>
                      <td v-else class="px-6 py-4 text-sm text-white-800 whitespace-nowrap">
                        {{ device?.customer }}
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
                        <div v-else-if="device.state == 'Factory'"
                          class="inline-flex items-center px-3 py-1 rounded-full gap-x-2 text-yellow-500 dark:bg-gray-800">
                          <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24">
                            <path stroke-linejoin="round" stroke-width="1.5" stroke-linecap="round" fill="currentColor"
                              stroke="currentColor" d="M0 10h24v4h-24z" />
                          </svg>
                          <h2 class="text-sm font-normal">{{ device.state }}</h2>
                        </div>
                        <div v-else
                          class="inline-flex items-center px-3 py-1 text-red-500 rounded-full gap-x-2 bg-red-100/60 dark:bg-gray-800">
                          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M9 3L3 9M3 3L9 9" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"
                              stroke-linejoin="round" />
                          </svg>
                          <h2 class="text-sm font-normal">{{ device.state }}</h2>
                        </div>
                      </td>
                      <td class="px-6 py-4 text-sm text-white-800 whitespace-nowrap">
                        {{ device?.mac }}
                      </td>
                      <td class="px-6 py-4 text-sm text-white-800 whitespace-nowrap">
                        {{ device?.ids?.qr }}
                      </td>
                      <td class="px-6 py-4 text-sm text-white-800 whitespace-nowrap">
                        {{ device?.status?.batt }}
                      </td>
                      <td class="px-6 py-4 text-sm text-white-800 whitespace-nowrap">
                        {{ device?.status?.sw }}
                      </td>
                      <td class="px-6 py-4 text-sm font-medium text-right whitespace-nowrap">
                        <button class="text-green-500 hover:text-green-700" @click="goTodetail(device.mac)">
                          View
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <section class="container mx-auto">
                <div class="flex items-center justify-between mt-6">
                  <button @click="currentPage--" :disabled="currentPage <= 1"
                    class="flex items-center px-5 py-2 text-sm text-gray-700 capitalize transition-colors duration-200 bg-white border rounded-md gap-x-2 hover:bg-gray-100 dark:bg-gray-900 dark:text-gray-200 dark:border-gray-700 dark:hover:bg-gray-800">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
                      class="w-5 h-5 rtl:-scale-x-100">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18" />
                    </svg>
                    <span>
                      previous
                    </span>
                  </button>
                  <div class="items-center hidden md:flex gap-x-3">
                    <template v-for="(page, index) in pageCount" :key="index">
                      <button v-if="Math.abs(currentPage - (index + 1)) <= 2 || index === 0 || index === pageCount - 1" @click="currentPage = index + 1" :class="[currentPage === index + 1 ? 'text-blue-500 bg-blue-100/60 dark:bg-gray-800' : 'text-white dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800', 'px-2 py-1 text-sm rounded-md']">
                        {{ index + 1 }}
                      </button>
                      <span v-else-if="Math.abs(currentPage - (index + 1)) === 3" class="px-2 py-1 text-sm">...</span>
                    </template>
                  </div>
                  <button @click="currentPage++" :disabled="currentPage >= pageCount"
                    class="flex items-center px-5 py-2 text-sm text-gray-700 capitalize transition-colors duration-200 bg-white border rounded-md gap-x-2 hover:bg-gray-100 dark:bg-gray-900 dark:text-gray-200 dark:border-gray-700 dark:hover:bg-gray-800">
                    <span>
                      Next
                    </span>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
                      class="w-5 h-5 rtl:-scale-x-100">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
                    </svg>
                  </button>
                </div>
              </section>
            </div>
          </div>
        </section>
      </main>
    </div>
  </div>
</template>

<style>

</style>
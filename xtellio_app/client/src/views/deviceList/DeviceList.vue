<script>
import DeviceService from '../../DeviceService';
import moment from 'moment';
import { ref } from 'vue'
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from '@headlessui/vue'
import { ChevronDownIcon, MinusIcon, PlusIcon, ArrowPathIcon } from '@heroicons/vue/20/solid'


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
        {
          id: 'provider',
          name: 'Provider',
          options: [],
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
  /**
   * Called when the Vue instance is created. This triggers all the methods that load and filter the device data.
   */
  created() {
    this.reloadFilter();
    this.showBattery();
    this.showFirmware();
    this.showState();
    this.showInactive();
    this.showLastLogOld();
  },
  computed: {
    /**
     * Computes a list of devices filtered based on the checked options in filters, macAddressInput, and firmwareInput.
     * @returns {Array} A list of filtered devices.
     */
    filteredList() {
      const checkedFilters = this.filters.reduce((acc, filter) => {
        const checkedOptions = filter.options.filter(option => option.checked);
        if (checkedOptions.length > 0) {
          acc[filter.id] = checkedOptions.map(option => option.value);
        }
        return acc;
      }, {});

      if (!Object.keys(checkedFilters).length && !this.macAddressInput && !this.firmwareInput) {
        return this.devices;
      }

      return this.devices.filter(device => {
        if (this.macAddressInput && !device.mac.toLowerCase().includes(this.macAddressInput.toLowerCase())) {
          return false;
        }

        if (this.firmwareInput && !device.status.sw.toLowerCase().includes(this.firmwareInput.toLowerCase())) {
          return false;
        }

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
              if (min === '>4000' && device.status.batt >= min.substring(1)) {
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
          } else if (filterId === 'provider') {
            let providerMatch = false;
            for (const option of filterValues) {
              if (device.sim.provider === option) {
                providerMatch = true;
                break;
              }
            }
            if (!providerMatch) {
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
    },

    /**
     * Divides the filtered device list into pages based on currentPage and pageSize.
     * @returns {Array} The devices for the current page.
     */
    paginatedFilteredList() {
      const start = (this.currentPage - 1) * this.pageSize;
      const end = start + this.pageSize;
      return this.filteredList.slice(start, end);
    },

    /**
     * Calculates the total number of pages based on the number of filtered devices and the page size.
     * @returns {number} The total number of pages.
     */
    pageCount() {
      return Math.ceil(this.filteredList.length / this.pageSize);
    },
  },
  watch: {
    /**
     * A watcher for the filters property. When any filter option changes, it triggers an update of the filteredList computed property.
     */
    filters: {
      handler() {
        // This will trigger the computed property filteredList to be updated
        this.filteredList;
      },
      deep: true,
    },
    /**
     * A watcher for the filteredList computed property. When the filtered list changes, it ensures the currentPage value is within the valid range.
     */
    filteredList() {
      this.adjustCurrentPage();
    },
  },
  methods: {
    /**
     * Ensures that the value of currentPage stays within the valid range.
     * If currentPage exceeds the pageCount, it resets to pageCount.
     * If currentPage is less than 1 and pageCount is greater than 0, it resets to 1.
     */
    adjustCurrentPage() {
      if (this.currentPage > this.pageCount) {
        this.currentPage = this.pageCount;
      } else if (this.currentPage < 1 && this.pageCount > 0) {
        this.currentPage = 1;
      }
    },
    /**
     * Converts a date into a locale string.
     * @param {string} temp - A string representing a date.
     * @returns {string} A localized string representation of the date.
     */
    currentDate(temp) {
      const current = new Date(temp);
      const date = current.toLocaleString();
      return date;
    },
    /**
     * Redirects to the 'DeviceView' page with the specified MAC address.
     * @param {string} mac - The MAC address of the device.
     */
    goTodetail(mac) {
      this.$router.push({ name: 'DeviceView', params: { Mac: mac } })
    },
    /**
     * If the inactiveInput is true, sets the checked value of the filter option with the "inactive" value to true.
     */
    showInactive() {
      if (this.inactiveInput) {
        const inactiveVal = this.filters[2].options.find(x => x.value.toLowerCase() === "inactive");
        inactiveVal.checked = true;
      }
    },
    /**
     * If lastLogOld is true, pushes all devices with logs older than 24 hours to the lastLogOldList.
     */
    showLastLogOld() {
      if (this.lastLogOld) {
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
    /**
     * If the history state has a battery property, checks the filter option with the same battery value.
     */
    showBattery() {
      if (window.history.state.battery) {
        const battVal = this.filters[4].options.find(x => x.value.toLowerCase() === window.history.state.battery.toLowerCase())
        battVal.checked = true;
      }
    },
    /**
     * If the history state has a firmware property, updates the devices with the JSON parsed value of the firmware.
     */
    showFirmware() {
      if (window.history.state.firmware) {
        this.devices = JSON.parse(window.history.state.firmware);
      }
    },
    /**
     * If the history state has a state property, checks the filter option with the same state value.
     */
    showState() {
      if (window.history.state.state) {
        const stateVal = this.filters[2].options.find(x => x.value.toLowerCase() === window.history.state.state.toLowerCase())
        stateVal.checked = true;
      }
    },
    /**
     * Updates the selected sort option and deselects all other options.
     * @param {string} name - The name of the selected sort option.
     */
    currentSortOption(name) {
      for (let index = 0; index < this.sortOptions.length; index++) {
        const element = this.sortOptions[index];
        if (element.name !== name) {
          element.current = false;
        } else {
          element.current = true;
          this.sortedList(element)
          this.selected = element.name
        }
      }
    },
    /**
     * Asynchronously reloads the devices and their filter options, and sorts the devices by state order.
     * @async
     */
    async reloadFilter() {
      try {
        // Load devices and sort them by state order
        this.devices = await DeviceService.getAllDevices();
        const stateOrder = { Active: 1, Inactive: 2, Factory: 3, Unknown: 4 };
        this.devices.sort((a, b) => stateOrder[a.state] - stateOrder[b.state]);
      
        // Update filter options
        this.updateFilterOption(this.filters[0], 'org', 'Unknown');
        this.updateFilterOption(this.filters[1], 'customer', 'Unknown');
        this.updateFilterOption(this.filters[6], 'sim.provider', 'None');

        for (const element of this.devices) {
          this.addFilterOptionIfNotExists(this.filters[0], 'org', element.org);
          this.addFilterOptionIfNotExists(this.filters[1], 'customer', element.customer);
          this.addFilterOptionIfNotExists(this.filters[6], 'sim.provider', element.sim.provider);
        }


      } catch (err) {
        this.error = err.message;
      }
    },
    /**
     * Updates a filter option to include an "unknown" option if it does not already exist.
     * @param {object} filter - The filter to be updated.
     * @param {string} key - The key of the filter.
     * @param {string} unknownLabel - The label to be used for the "unknown" option.
     */
    updateFilterOption(filter, key, unknownLabel) {
      if (!filter.options.some(option => option.value === '')) {
        filter.options.push({ value: '', label: unknownLabel, checked: false });
      }
    },
    /**
     * Adds a new filter option if it does not already exist.
     * @param {object} filter - The filter to be updated.
     * @param {string} key - The key of the filter.
     * @param {string} value - The value of the new filter option.
     */
    addFilterOptionIfNotExists(filter, key, value) {
      if (!filter.options.some(option => option.value === value)) {
        filter.options.push({ value: value, label: value || 'Unknown', checked: false });
      }
    },
    /**
     * Sorts the devices list based on the selected sort option.
     * @param {object} sortOption - The selected sort option.
     * @returns {Array} The sorted list of devices.
     */
    sortedList(sortOption) {
      switch (sortOption.name) {
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
    /**
     * Asynchronously resets all filter options, clears the input fields, resets the currentPage to 1, and reloads the filter.
     * @async
     */
    async resetOptions() {
      this.filters.forEach((filter) => {
        filter.options.forEach((option) => {
          option.checked = false;
        });
      });

      this.macAddressInput = "";
      this.firmwareInput = "";
      this.inactiveInput = false;
      this.lastLogOld = false;
      this.currentPage = 1;
      this.reloadFilter();
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
                <div
                  class="group inline-flex justify-center text-sm font-medium text-gray-300 hover:text-white mr-4 cursor-pointer"
                  @click="resetOptions()">
                  <p>Reset</p>
                  <ArrowPathIcon class="-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-white"
                    aria-hidden="true" />
                </div>

                <MenuButton class="group inline-flex justify-center text-sm font-medium text-gray-300 hover:text-white">
                  <p>Sort</p>
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
                      :class="[option.current ? 'font-medium text-black' : 'text-black', active ? 'bg-gray-200' : '', 'block px-4 py-2 text-sm']"
                      @click="currentSortOption(option.name)">{{
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
                v-slot="{ open }" :data-testid="`${section.id}`">
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
                      <input v-if="'mac' === `${section.id}`" :id="`filter-${section.id}-${optionIdx}`" :data-testid="`input-${section.id}`"
                        :name="`${section.id}[]`" :value="macAddressInput" type="text" :placeholder="section.id"
                        @input="macAddressInput = $event.target.value"
                        class="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" />
                      <input v-else-if="'firmware' === `${section.id}`" :id="`filter-${section.id}-${optionIdx}`" :data-testid="`input-${section.id}`"
                        :name="`${section.id}[]`" :value="firmwareInput" type="text" :placeholder="section.id"
                        @input="firmwareInput = $event.target.value"
                        class="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" />
                      <input v-else :id="`filter-${section.id}-${optionIdx}`" :name="`${section.id}[]`"
                        :value="option.value" type="checkbox" :checked="option.checked"
                        @change="option.checked = !option.checked"
                        class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" />
                      <label :for="`filter-${section.id}-${optionIdx}`" class="ml-3 text-sm text-white" :data-testid="`input-${option.label}`">{{ option.label}}</label>
                    </div>
                  </div>
                </DisclosurePanel>
              </Disclosure>
            </form>

            <!-- Product grid -->
            <div class="lg:col-span-3">
              <!-- Your content -->
              <div class="overflow-hidden border border-gray-200 dark:border-gray-700">
                <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700 table-fixed">
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
                        Last Log
                      </th>
                      <th scope="col"
                        class="px-6 py-3.5 text-sm font-normal text-left rtl:text-right text-white dark:text-gray-400">
                        Last status
                      </th>
                      <th scope="col"
                        class="px-6 py-3.5 text-sm font-normal text-left rtl:text-right text-white dark:text-gray-400">
                        Lte_qual
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
                      <td class="px-6 py-4 text-sm font-medium text-white-800 whitespace">
                        {{ device?.type }}
                      </td>
                      <td v-if="device?.customer === ''" class="px-6 py-4 text-sm text-white-800 whitespace">
                        Unknown
                      </td>
                      <td v-else class="px-6 py-4 text-sm text-white-800 whitespace">
                        {{ device?.org }}
                      </td>
                      <td v-if="device?.customer === ''" class="px-6 py-4 text-sm text-white-800 whitespace">
                        Unknown
                      </td>
                      <td v-else class="px-6 py-4 text-sm text-white-800 whitespace">
                        {{ device?.customer }}
                      </td>
                      <td class="text-sm text-white-800 whitespace">
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
                      <td class="px-6 py-4 text-sm text-white-800 whitespace">
                        {{ device?.mac }}
                      </td>
                      <td class="px-6 py-4 text-sm text-white-800 whitespace">
                        {{ device?.ids?.qr }}
                      </td>
                      <td class="px-6 py-4 text-sm text-white-800 whitespace">
                        {{ device?.status?.batt }}
                      </td>
                      <td class="px-6 py-4 text-sm text-white-800 whitespace">
                        {{ device?.status?.sw }}
                      </td>
                      <td class="px-6 py-4 text-sm text-white-800 whitespace">
                        {{ currentDate(device?.last_log?.ts) }}
                      </td>
                      <td class="px-6 py-4 text-sm text-white-800 whitespace">
                        {{ currentDate(device?.status?.ts) }}
                      </td>
                      <td class="px-6 py-4 text-sm text-white-800 whitespace">
                        {{ device?.last_log?.data?.nbm_status?.lte_qual.rssi }}
                      </td>
                      <td class="px-6 py-4 text-sm font-medium text-right whitespace">
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
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                      stroke="currentColor" class="w-5 h-5 rtl:-scale-x-100">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18" />
                    </svg>
                    <span>
                      previous
                    </span>
                  </button>
                  <div class="items-center hidden md:flex gap-x-3">
                    <template v-for="(page, index) in pageCount" :key="index">
                      <button v-if="Math.abs(currentPage - (index + 1)) <= 2 || index === 0 || index === pageCount - 1"
                        @click="currentPage = index + 1"
                        :class="[currentPage === index + 1 ? 'text-blue-500 bg-blue-100/60 dark:bg-gray-800' : 'text-white dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800', 'px-2 py-1 text-sm rounded-md']">
                        {{ index + 1 }}
                      </button>
                      <span v-else-if="Math.abs(currentPage - (index + 1)) === 3" class="px-2 py-1 text-sm">...</span>
                    </template>
                  </div>
                  <button @click="currentPage++" :disabled="currentPage >= pageCount"
                    data-testid="next-page"
                    class="flex items-center px-5 py-2 text-sm text-gray-700 capitalize transition-colors duration-200 bg-white border rounded-md gap-x-2 hover:bg-gray-100 dark:bg-gray-900 dark:text-gray-200 dark:border-gray-700 dark:hover:bg-gray-800">
                    <span>
                      Next
                    </span>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                      stroke="currentColor" class="w-5 h-5 rtl:-scale-x-100">
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

<style></style>
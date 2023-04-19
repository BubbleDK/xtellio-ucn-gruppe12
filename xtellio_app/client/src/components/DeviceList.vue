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
      devices: [],
      temp: [],
      filteredDevices: [],
      orgFilterInput: [],
      customerFilterInput: [],
      stateFilterInput: [],
      macFilterInput: [],
      batteryFilterInput: [],
      firmwareFilterInput: [],
      inactiveInput: window.history.state.st,
      lastLogOld: this.$route.query.lg,
      lastLogOldList: [],
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
            { value: 'Active', label: 'Active', checked: false },
            { value: 'Inactive', label: 'Inactive', checked: false },
            { value: 'Factory', label: 'Factory', checked: false },
            { value: 'Unknown', label: 'Unknown', checked: false },
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
            { value: '0', label: '0', checked: false },
            { value: '2000-2500', label: '2000-2500', checked: false },
            { value: '2501-3000', label: '2501-3000', checked: false },
            { value: '3001-3500', label: '3001-3500', checked: false },
            { value: '3501-4000', label: '3501-4000', checked: false },
            { value: '>4000', label: '>4000', checked: false },
          ],
        },
      ],
      sortOptions: [
        { name: 'Most Popular', href: '#', current: true },
        { name: 'Best Rating', href: '#', current: false },
        { name: 'Newest', href: '#', current: false },
        { name: 'Price: Low to High', href: '#', current: false },
        { name: 'Price: High to Low', href: '#', current: false },
      ]
    }
  },
  async created() {
    try {
      this.devices = await DeviceService.getAllDevices();
      const stateOrder = { Active: 1, Inactive: 2, Factory: 3, Unknown: 4 };
      this.showInactive();
      this.showLastLogOld();
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
      this.filteredDevices = [];

      if (this.lastLogOld === "true") {
        this.temp = this.lastLogOldList;
      }
      else {
        this.temp = this.devices;
      }

      // if (this.orgFilterInput.length > 0) {
      //   for (let i = 0; i < this.orgFilterInput.length; index++) {
      //     const element = this.orgFilterInput[index];
      //     this.filteredDevices.push(this.temp.filter((device) => device.org.toLowerCase() === element.toLowerCase()));
      //   }
      // }
      
      this.filters[0].options.forEach(element => {
        if(element.checked === true){
          this.filteredDevices.push(this.temp.filter((device) => device.org.toLowerCase() === element.value.toLowerCase()));
          console.log(this.temp.filter((device) => device.org.toLowerCase() === element.value.toLowerCase()))
        }
      })

      if (this.customerFilterInput.length > 0) {
        this.temp = this.temp.filter((device) => device.customer.toLowerCase() === this.customerFilterInput.toLowerCase());
      }
      if (this.stateFilterInput.length > 0) {
        this.temp = this.temp.filter((device) => device.state.toLowerCase() === this.stateFilterInput.toLowerCase());
      }
      if (this.macFilterInput.length > 0) {
        this.temp = this.temp.filter((device) => device.mac.toLowerCase() === this.macFilterInput.toLowerCase());
      }
      // if (this.filters.batteryLevel.length > 0) {
      //   const batteryLevel = this.filters.batteryLevel[0];
      //   if (batteryLevel === '0') {
      //     this.temp = this.temp.filter(device => device.status.batt === 0);
      //   } else if (batteryLevel === '2000-2500') {
      //     this.temp = this.temp.filter(device => device.status.batt >= 2000 && device.status.batt <= 2500);
      //   } else if (batteryLevel === '2501-3000') {
      //     this.temp = this.temp.filter(device => device.status.batt >= 2501 && device.status.batt <= 3000);
      //   } else if (batteryLevel === '3001-3500') {
      //     this.temp = this.temp.filter(device => device.status.batt >= 3001 && device.status.batt <= 3500);
      //   } else if (batteryLevel === '3501-4000') {
      //     this.temp = this.temp.filter(device => device.status.batt >= 3501 && device.status.batt <= 4000);
      //   } else if (batteryLevel === '4000+') {
      //     this.temp = this.temp.filter(device => device.status.batt > 4000);
      //   }
      // }
      if (this.firmwareFilterInput.length > 0) {
        this.temp = this.temp.filter((device) => device.status.sw.toLowerCase() === this.firmwareFilterInput.toLowerCase());
      }
      if(this.filteredDevices.length === 0){
        this.filteredDevices = this.temp;
        return this.filteredDevices;
      }
      else{
        return this.filteredDevices;
      }
    }
  },
  watch : {
    filters: {
    handler() {
      console.log(this.filters[0].options)
    },
    deep: true,
  }
  },
  methods: {
    goTodetail(mac) {
      this.$router.push({ name: 'DeviceView', params: { Mac: mac } })
    },
    showInactive() {
      if (this.inactiveInput) {
        this.stateFilterInput = this.inactiveInput;
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
          }
        });
      }
    },
  }
}
</script>

<script setup>
// const subCategories = [
//   { name: 'Totes', href: '#' },
//   { name: 'Backpacks', href: '#' },
//   { name: 'Travel Bags', href: '#' },
//   { name: 'Hip Bags', href: '#' },
//   { name: 'Laptop Sleeves', href: '#' },
// ]

const mobileFiltersOpen = ref(false)
</script>

<template>
  <div>
    <div>
      <!-- Mobile filter dialog -->
      <TransitionRoot as="template" :show="mobileFiltersOpen">
        <Dialog as="div" class="relative z-40 lg:hidden" @close="mobileFiltersOpen = false">
          <TransitionChild as="template" enter="transition-opacity ease-linear duration-300" enter-from="opacity-0"
            enter-to="opacity-100" leave="transition-opacity ease-linear duration-300" leave-from="opacity-100"
            leave-to="opacity-0">
            <div class="fixed inset-0 bg-black bg-opacity-25" />
          </TransitionChild>

          <div class="fixed inset-0 z-40 flex">
            <TransitionChild as="template" enter="transition ease-in-out duration-300 transform"
              enter-from="translate-x-full" enter-to="translate-x-0" leave="transition ease-in-out duration-300 transform"
              leave-from="translate-x-0" leave-to="translate-x-full">
              <DialogPanel
                class="relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-white py-4 pb-12 shadow-xl">
                <div class="flex items-center justify-between px-4">
                  <h2 class="text-lg font-medium text-white">Filters</h2>
                  <button type="button"
                    class="-mr-2 flex h-10 w-10 items-center justify-center rounded-md bg-white p-2 text-white"
                    @click="mobileFiltersOpen = false">
                    <span class="sr-only">Close menu</span>
                    <XMarkIcon class="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>

                <!-- Filters -->
                <form class="mt-4 border-t border-gray-200">
                  <h3 class="sr-only">Categories</h3>
                  <ul role="list" class="px-2 py-3 font-medium text-white">
                    <li v-for="category in subCategories" :key="category.name">
                      <a :href="category.href" class="block px-2 py-3">{{ category.name }}</a>
                    </li>
                  </ul>

                  <Disclosure as="div" v-for="section in filters" :key="section.id"
                    class="border-t border-gray-200 px-4 py-6" v-slot="{ open }">
                    <h3 class="-mx-2 -my-3 flow-root">
                      <DisclosureButton
                        class="flex w-full items-center justify-between bg-white px-2 py-3 text-gray-400 hover:text-white">
                        <span class="font-medium text-white">{{ section.name }}</span>
                        <span class="ml-6 flex items-center">
                          <PlusIcon v-if="!open" class="h-5 w-5" aria-hidden="true" />
                          <MinusIcon v-else class="h-5 w-5" aria-hidden="true" />
                        </span>
                      </DisclosureButton>
                    </h3>
                    <DisclosurePanel class="pt-6">
                      <div class="space-y-6">
                        <div v-for="(option, optionIdx) in section.options" :key="option.value" class="flex items-center">
                          <input :id="`filter-mobile-${section.id}-${optionIdx}`" :name="`${section.id}[]`"
                            :value="option.value" type="checkbox" :checked="option.checked"
                            class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" />
                          <label :for="`filter-mobile-${section.id}-${optionIdx}`"
                            class="ml-3 min-w-0 flex-1 text-white">{{ option.label }}</label>
                        </div>
                      </div>
                    </DisclosurePanel>
                  </Disclosure>
                </form>
              </DialogPanel>
            </TransitionChild>
          </div>
        </Dialog>
      </TransitionRoot>

      <main class="mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-baseline justify-between border-b border-gray-200 pb-6 pt-24">
          <h1 class="text-4xl font-bold tracking-tight text-white">Devices</h1>

          <div class="flex items-center">
            <Menu as="div" class="relative inline-block text-left">
              <div>
                <MenuButton
                  class="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-white">
                  Sort
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
                    <a :href="option.href"
                      :class="[option.current ? 'font-medium text-white' : 'text-white', active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm']">{{
                        option.name }}</a>
                    </MenuItem>
                  </div>
                </MenuItems>
              </transition>
            </Menu>

            <button type="button" class="-m-2 ml-5 p-2 text-gray-400 hover:text-white sm:ml-7">
              <span class="sr-only">View grid</span>
              <Squares2X2Icon class="h-5 w-5" aria-hidden="true" />
            </button>
            <button type="button" class="-m-2 ml-4 p-2 text-gray-400 hover:text-white sm:ml-6 lg:hidden"
              @click="mobileFiltersOpen = true">
              <span class="sr-only">Filters</span>
              <FunnelIcon class="h-5 w-5" aria-hidden="true" />
            </button>
          </div>
        </div>

        <section aria-labelledby="products-heading" class="pb-24 pt-6">
          <h2 id="products-heading" class="sr-only">Products</h2>

          <div class="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
            <!-- Filters -->
            <form class="hidden lg:block">
              <h3 class="sr-only">Categories</h3>
              <ul role="list" class="space-y-4 border-b border-gray-200 pb-6 text-sm font-medium text-white">
                <li v-for="category in subCategories" :key="category.name">
                  <a :href="category.href">{{ category.name }}</a>
                </li>
              </ul>

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
                      <input :id="`filter-${section.id}-${optionIdx}`" :name="`${section.id}[]`" :value="option.value"
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
                        class="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-white dark:text-gray-400">
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
                        Battery
                      </th>
                      <th scope="col"
                        class="px-6 py-3.5 text-sm font-normal text-left rtl:text-right text-white dark:text-gray-400">
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
                        {{ device?.status?.batt }}
                      </td>
                      <td class="px-6 py-4 text-sm text-white-800 whitespace-nowrap">
                        {{ device?.status?.sw }}
                      </td>
                      <td class="px-6 py-4 text-sm font-medium text-right whitespace-nowrap">
                        <a class="text-green-500 hover:text-green-700" @click="goTodetail(device.mac)">
                          View
                        </a>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  </div>
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
          class="px-2 py-1 text-sm text-white rounded-md dark:hover:bg-gray-800 dark:text-gray-300 hover:bg-gray-100">2</a>
        <a href="#"
          class="px-2 py-1 text-sm text-white rounded-md dark:hover:bg-gray-800 dark:text-gray-300 hover:bg-gray-100">3</a>
        <a href="#"
          class="px-2 py-1 text-sm text-white rounded-md dark:hover:bg-gray-800 dark:text-gray-300 hover:bg-gray-100">...</a>
        <a href="#"
          class="px-2 py-1 text-sm text-white rounded-md dark:hover:bg-gray-800 dark:text-gray-300 hover:bg-gray-100">12</a>
        <a href="#"
          class="px-2 py-1 text-sm text-white rounded-md dark:hover:bg-gray-800 dark:text-gray-300 hover:bg-gray-100">13</a>
        <a href="#"
          class="px-2 py-1 text-sm text-white rounded-md dark:hover:bg-gray-800 dark:text-gray-300 hover:bg-gray-100">14</a>
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

<style>
/* Dropdown Button */
.dropbtn {
  background-color: #3498DB;
  color: white;
  padding: 16px;
  font-size: 16px;
  border: none;
  cursor: pointer;
}

/* Dropdown button on hover & focus */
.dropbtn:hover,
.dropbtn:focus {
  background-color: #2980B9;
}

/* The container <div> - needed to position the dropdown content */
.dropdown {
  position: relative;
  display: inline-block;
}

/* Dropdown Content (Hidden by Default) */
.dropdown-content {
  display: none;
  position: absolute;
  background-color: #f1f1f1;
  min-width: 160px;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  z-index: 1;
}

/* Links inside the dropdown */
.dropdown-content a {
  color: black;
  padding: 12px 16px;
  text-decoration: none;
  display: block;
}

/* Change color of dropdown links on hover */
.dropdown-content a:hover {
  background-color: #ddd;
}

/* Show the dropdown menu (use JS to add this class to the .dropdown-content container when the user clicks on the dropdown button) */
.show {
  display: block;
}
</style>
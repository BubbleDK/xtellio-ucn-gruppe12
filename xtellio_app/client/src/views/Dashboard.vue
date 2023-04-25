<script>
import SparkBoxBattery from '../components/SparkBoxBattery.vue';
import DonutChartFirmware from '../components/DonutChartFirmware.vue';
import GetDataExample from '../components/GetDataExample.vue';
import SparkBoxFirmWare from '../components/SparkBoxFirmWare.vue';
import StateBarChart from '../components/StateBarChart.vue';
import SimProviderBarChart from '../components/SimProviderBarChart.vue';
import LastStatusOld from '../components/LastStatusOld.vue';
import DonutChartProvider from '../components/DonutChartProvider.vue';
import DeviceService from '../DeviceService';
import BatteryColumnChart from '../components/BatteryColumnChart.vue';
import LastLogOld from '../components/LastLogOld.vue';
import LastLogUndefined from '../components/LastLogUndefined.vue';
import GpsColumn from '../components/GpsColumn.vue';

export default {
  name: 'App',
  components: {
    SparkBoxBattery,
    DonutChartFirmware,
    GetDataExample,
    SparkBoxFirmWare,
    StateBarChart,
    SimProviderBarChart,
    DonutChartProvider,
    BatteryColumnChart,
    LastStatusOld,
    LastLogOld,
    LastLogUndefined,
    GpsColumn
  },
  data() {
    return {
      devices: [],
      customers: [],
    }
  },
  async created() {
    try {
      this.devices = await DeviceService.getAllDevices();
      var mapName = new Map();
      this.devices.forEach(element => {
        var tempValue = element.customer;
        if (mapName.has(!tempValue)) {
          mapName.set(tempValue, mapName.get(tempValue) + 1)
        }
        else if (mapName.has(tempValue)) {
          mapName.set(tempValue, 1)
        }
        else {
          mapName.set(tempValue, + 1)
        }
      });
      mapName.forEach((key ,value) => {
        this.customers.push(value);
      })
    } catch (err) {
      this.error = err.message
    }
  },
  methods: {
    goToCustomerList(){
      this.$router.push({ name: 'OrgView'})
    }
  }
}

</script>

<template>
  <section class="bg-white dark:bg-gray-900">
    <div class="mx-auto max-w-screen-xl px-4 py-12 sm:px-6 md:py-16 lg:px-8">
      <div class="mx-auto max-w-3xl text-center">
        <h2 class="text-3xl font-bold text-gray-900 dark:text-white sm:text-4xl">
          Xtellio Statistics
        </h2>
        <p class="mt-4 text-gray-500 dark:text-gray-400 sm:text-xl">
          Verdens flotteste dashboard
        </p>
      </div>
      <div class="mt-8 sm:mt-12">
        <dl class="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div class="flex flex-col rounded-lg border border-gray-100 px-4 py-8 text-center dark:border-gray-800">
            <dt class="order-last text-lg font-medium text-gray-500 dark:text-gray-400">
              Total Devices
            </dt>
            <dd class="text-4xl font-extrabold text-blue-600 md:text-5xl">
              {{ devices.length }}
            </dd>
          </div>

          <div class="flex flex-col rounded-lg border border-gray-100 px-4 py-8 text-center dark:border-gray-800">
            <dd class="text-4xl font-extrabold text-blue-600 md:text-5xl"><LastLogUndefined/></dd>
          </div>

          <div class="flex flex-col rounded-lg border border-gray-100 px-4 py-8 text-center dark:border-gray-800">
            <router-link to="/orgview">
            <dt class="text-lg font-medium text-gray-500 dark:text-gray-400">
                <dd class="text-4xl font-extrabold text-blue-600 md:text-5xl" @click="goToCustomerList()">{{ customers.length }} </dd>
                Total Customers
              </dt>
            </router-link>
          </div>
        </dl>
      </div>
    </div>

    <div class="mx-auto max-w-screen-xl px-4 py-12 sm:px-6 md:py-16 lg:px-8">
      <div class="grid grid-flow-col gap-1 pb-4">
        <!-- <SparkBoxBattery /> -->
        <div>
          <SparkBoxFirmWare />
        <StateBarChart />
        </div>
        <BatteryColumnChart />
        
      </div>
    <div class="mt-8 sm:mt-4">
        <dl class="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div class="flex flex-col rounded-lg border border-gray-100 px-4 py-8 text-center dark:border-gray-800">
            <LastLogOld/>
          </div>

          <div class="flex flex-col rounded-lg border border-gray-100 px-4 py-8 text-center dark:border-gray-800">
            <LastStatusOld/>
          </div>
        </dl>
      </div>
      <div class="flex mt-5">
        <div class="mr-5">
          <!-- <DonutChartFirmware /> -->
          <DonutChartProvider />
        </div>
        <div class="ml-5">
          <GpsColumn/>
        </div>
      </div>
    </div>
  </section>
</template>
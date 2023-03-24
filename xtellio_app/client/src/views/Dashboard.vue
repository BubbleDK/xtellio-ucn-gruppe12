<script>
import SparkBoxBattery from '../components/SparkBoxBattery.vue';
import DonutChartFirmware from '../components/DonutChartFirmware.vue';
import ColumnChartBattery from '../components/ColumnChartBattery.vue';
import GetDataExample from '../components/GetDataExample.vue';
import SparkBoxFirmWare from '../components/SparkBoxFirmWare.vue';
import SparkBoxSignal from '../components/SparkBoxSignal.vue';
import DonutChartOldFirmware from '../components/DonutChartOldFirmware.vue';
import DeviceService from '../DeviceService';
import TestColumnChart from '../components/TestColumnChart.vue';

export default {
  name: 'App',
  components: {
    SparkBoxBattery,
    DonutChartFirmware,
    ColumnChartBattery,
    GetDataExample,
    SparkBoxFirmWare,
    SparkBoxSignal,
    DonutChartOldFirmware,
    TestColumnChart,
  },
  data() {
    return {
      devices: [],
    }
  },
  async created() {
    console.log("Created")
    try {
      this.devices = await DeviceService.getAllDevices();
    } catch (err) {
      this.error = err.message
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
            <dt class="order-last text-lg font-medium text-gray-500 dark:text-gray-400">
              Hvad skal der stå her? 
            </dt>
            <dd class="text-4xl font-extrabold text-blue-600 md:text-5xl">0</dd>
          </div>

          <div class="flex flex-col rounded-lg border border-gray-100 px-4 py-8 text-center dark:border-gray-800">
            <dt class="order-last text-lg font-medium text-gray-500 dark:text-gray-400">
              Total Customers
            </dt>

            <dd class="text-4xl font-extrabold text-blue-600 md:text-5xl">1</dd>
          </div>
        </dl>
      </div>
    </div>

    <div class="mx-auto max-w-screen-xl px-4 py-12 sm:px-6 md:py-16 lg:px-8">
      <div class="grid grid-flow-col gap-2 pb-4">
        <SparkBoxBattery />
        <SparkBoxFirmWare />
        <SparkBoxSignal />
      </div>
      <div class="flex mt-5">
        <div class="mr-5">
          <DonutChartFirmware />
          <DonutChartOldFirmware />
        </div>
        <div class="ml-5">
          <TestColumnChart />
        </div>
      </div>
    </div>
  </section>
</template>
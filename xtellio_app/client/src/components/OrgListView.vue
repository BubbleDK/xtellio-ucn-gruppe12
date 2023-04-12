<script>
import DeviceService from '../DeviceService';
export default {
  name: 'OrgListView',
  data() {
    return {
      devices: [],
      mapName: new Map(),
    }
  },
  async created() {
    try {
      this.devices = await DeviceService.getAllDevices();
      // mapName = new Map();
      this.devices.forEach(element => {
        const tempValue = element.customer;
        console.log(tempValue);
        if (this.mapName.has(tempValue)) {
          this.mapName.set(tempValue, this.mapName.get(tempValue) + 1)
          tempValue
        }
        else {
          this.mapName.set(tempValue, 1)
        }
      });
      console.log(this.mapName);
    } catch (err) {
      this.error = err.message
    }
  },
  methods: {

  }
}
</script>

<template>
  <section class="flex-1 bg-gray-200 dark:bg-gray-900 overflow-y-auto transition duration-500 ease-in-out h-auto">
    <div class="px-24 py-12 text-gray-700 dark:text-gray-500 transition
    			duration-500 ease-in-out">
      <h2 class="text-4xl font-medium capitalize">customers</h2>
      <div class="mt-1 mb-4 flex items-center justify-between">
        <span class="text-sm">
          Total devices:
          <strong>{{devices.length}}</strong>
        </span>

        <div class="flex items-center select-none">
          <span class="cursor-pointer mr-3">

            <svg viewBox="0 0 512 512" class="h-5 w-5 fill-current">
              <path d="M505 442.7L405.3
    								343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7
    								44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1
    								208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4
    								2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9
    								0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zM208 336c-70.7
    								0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0
    								128 57.2 128 128 0 70.7-57.2 128-128 128z"></path>
            </svg>
          </span>

          <input class="bg-transparent focus:outline-none" placeholder="Search in activity" />
        </div>

        <div class="flex items-center select-none">
          <span>Filter</span>
          <button class="ml-3 bg-gray-400 dark:bg-gray-600
    						dark:text-gray-400 rounded-full p-2 focus:outline-none hover:bg-gray-800 transition
    						duration-500 ease-in-out">
            <svg class="h-5 w-5 fill-current" viewBox="0 0 24 24">
              <path d="M14 12v7.88c.04.3-.06.62-.29.83a.996.996 0
    								01-1.41 0l-2.01-2.01a.989.989 0
    								01-.29-.83V12h-.03L4.21 4.62a1 1 0
    								01.17-1.4c.19-.14.4-.22.62-.22h14c.22 0
    								.43.08.62.22a1 1 0 01.17 1.4L14.03 12H14z"></path>
            </svg>
          </button>
          <button class="ml-2 bg-gray-400 dark:bg-gray-600
    						dark:text-gray-400 rounded-full p-2 focus:outline-none
    						hover:bg-gray-800 transition
    						duration-500 ease-in-out">
            <svg class="h-5 w-5 fill-current" viewBox="0 0 24 24">
              <path d="M18 21l-4-4h3V7h-3l4-4 4 4h-3v10h3M2
    								19v-2h10v2M2 13v-2h7v2M2 7V5h4v2H2z"></path>
            </svg>
          </button>
          <button class="ml-2 bg-gray-400 dark:bg-gray-600
    						dark:text-gray-400 rounded-full p-2 focus:outline-none
    					hover:bg-gray-800 transition
    						duration-500 ease-in-out">
            <svg class="h-5 w-5 fill-current" viewBox="0 0 24 24">
              <path d="M12 4a4 4 0 014 4 4 4 0 01-4 4 4 4 0 01-4-4 4
    								4 0 014-4m0 10c4.42 0 8 1.79 8 4v2H4v-2c0-2.21
    								3.58-4 8-4z"></path>
            </svg>
          </button>
        </div>
      </div>
      <div v-for="[key, value] in this.mapName">
      <div class="border dark:border-gray-700 transition duration-500
    				ease-in-out"></div>
      <div class="flex flex-col mt-2">
        <div class="flex flex-row mt-2">
          <div class="flex w-full items-center justify-between bg-white
    						dark:bg-gray-800 px-8 py-6 border-l-4 border-green-500
    						dark:border-green-300">
            <!-- card -->
            
            <div class="flex">
              <div class="flex flex-col ml-6">
                <span v-if="key === ''" class="text-lg font-bold">Unknown</span>
                <span v-else class="text-lg font-bold">{{ key }}</span>
                <div class="mt-4 flex">
                  <div class="flex">
                    <svg class="h-5 w-5 fill-current
    											dark:text-gray-300" viewBox="0 0 24 24">
                      <path d="M12 4a4 4 0 014 4 4 4 0 01-4 4
    												4 4 0 01-4-4 4 4 0 014-4m0
    												10c4.42 0 8 1.79 8
    												4v2H4v-2c0-2.21 3.58-4 8-4z"></path>
                    </svg>
                    <span class="ml-2 text-sm text-gray-600
    											dark:text-gray-300 capitalize">
                      
                    </span>
                  </div>

                  <div class="flex ml-6">
                    <svg class="h-5 w-5 fill-current
    											dark:text-gray-300" fill="#000000" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg"
                      xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 195.045 195.045" xml:space="preserve">
                      <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                      <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                      <g id="SVGRepo_iconCarrier">
                        <g>
                          <g id="_x31_28_29_">
                            <g>
                              <path
                                d="M92.288,0h-6.157H24.002h-7.3v12.969H5.201v6.487v129.725v6.353h13.223v33.936v5.576h5.578h5.527 c17.062,0,34.126,0,51.188,0h5.408h5.703v-39.517h13.104v-6.348V19.451v-6.482H92.288V0z M29.583,183.884 c0-9.445,0-18.9,0-28.355h50.978c0,9.455,0,18.91,0,28.355C63.569,183.884,46.571,183.884,29.583,183.884z">
                              </path>
                              <path
                                d="M39.586,164.963c0,2.255,0,4.515,0,6.774c0,7.195,11.159,7.195,11.159,0c0-2.26,0-4.52,0-6.774 C50.745,157.772,39.586,157.772,39.586,164.963z">
                              </path>
                              <path
                                d="M59.373,164.963c0,2.255,0,4.515,0,6.774c0,7.195,11.159,7.195,11.159,0c0-2.26,0-4.52,0-6.774 C70.537,157.772,59.373,157.772,59.373,164.963z">
                              </path>
                              <path
                                d="M148.999,16.971l-3.26,7.437c19.52,10.336,32.682,32.009,34.662,54.405c2.143,24.306-11.853,44.45-31.412,55.591 l4.412,8.435c22.069-12.689,35.866-35.865,36.43-64.348C190.385,50.267,172.515,28.178,148.999,16.971z">
                              </path>
                              <path
                                d="M170.921,77.571c0.391-20.312-12.152-36.3-28.869-44.765l-3.452,7.866c12.893,7.487,21.561,22.089,22.886,37.222 c1.488,16.933-8.2,30.952-21.779,38.768l4.393,8.379C160.349,115.666,170.504,98.568,170.921,77.571z">
                            </path>
                            <path
                              d="M152.066,78.221c0.238-12.646-7.308-22.693-17.52-28.292l-3.361,7.617c13.924,8.595,14.086,32.364-0.265,42.338 l4.438,8.465C145.439,102.199,151.802,91.454,152.066,78.221z">
                            </path>
                            <path
                              d="M126.442,68.357l-3.899,8.881c1.279,1.97,1.33,4.669,0.102,6.802l4.661,8.892c3.615-2.866,5.86-7.259,5.957-12.512 C133.369,75.205,130.484,70.972,126.442,68.357z">
                            </path>
                          </g>
                        </g>
                      </g>
                    </g>
                  </svg>
                  <span class="ml-2 text-sm text-gray-600
  											dark:text-gray-300 capitalize">
                    {{ value }}
                  </span>
                </div>
              </div>
            </div>
          </div>
        
          <div>
            <button
              class="float-right py-2 px-4 bg-transparent text-green-400 font-semibold border border-green-400 rounded hover:bg-green-400 hover:text-white hover:border-transparent transition ease-in duration-200 transform hover:-translate-y-1 active:translate-y-0">
              View
            </button>
          </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  </section>
</template>
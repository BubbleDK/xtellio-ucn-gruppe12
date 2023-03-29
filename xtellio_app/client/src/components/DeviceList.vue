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
        } catch (err) {
            this.error = err.message
        }
    },
    computed: {
        filteredList: function(){
            return this.devices.filter((device) => {return device.type.toLowerCase().match(this.input.toLowerCase()) || 
                device.org.toLowerCase().match(this.input.toLowerCase()) ||
                device.customer.toLowerCase().match(this.input.toLowerCase()) ||
                device.state.toLowerCase().match(this.input.toLowerCase()) ||
                device.mac.toLowerCase().match(this.input.toLowerCase()) ||
                device.status.batt.toString().toLowerCase().match(this.input.toLowerCase()) ||
                device.status.sw.toLowerCase().match(this.input.toLowerCase())
            });
        },
    }
}

</script>

    <template>
    <div class="flex flex-col">
        <div class="overflow-x-auto">
            <div class="flex justify-between py-3 pl-2">
                <div class="relative max-w-xs">
                    <label for="search" class="sr-only"> Search </label>
                    <input
                        type="text"
                        v-model="input"
                        name="search"
                        class="block w-full p-3 pl-10 text-sm border-gray-200 rounded-md focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400"
                        placeholder="Search..."
                    />
                    <div
                        class="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            class="w-5 h-5 text-gray-400"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            stroke-width="2"
                        >
                            <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                            />
                        </svg>
                    </div>
                </div>

                <div class="flex items-center space-x-2">
                    <div class="relative">
                        <button
                            class="relative z-0 inline-flex text-sm rounded-md shadow-sm focus:ring-accent-500 focus:border-accent-500 hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1"
                        >
                            <span
                                class="relative inline-flex items-center px-3 py-3 space-x-2 text-sm font-medium text-gray-600 bg-white border border-gray-300 rounded-md sm:py-2"
                            >
                                <div>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        class="w-4 h-4"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        stroke-width="2"
                                    >
                                        <path
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                            d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
                                        />
                                    </svg>
                                </div>
                                <div class="hidden sm:block">Filters</div>
                            </span>
                        </button>
                    </div>
                </div>
            </div>

            <div class="p-1.5 w-full inline-block align-middle">
                <div class="overflow-hidden border rounded-lg">
                    <table class="min-w-full divide-y divide-gray-200">
                        <thead class="bg-gray-50">
                            <tr>
                                <th
                                    scope="col"
                                    class="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase"
                                >
                                    Type
                                </th>
                                <th
                                    scope="col"
                                    class="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase"
                                >
                                    Org
                                </th>
                                <th
                                    scope="col"
                                    class="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase"
                                >
                                    Customer
                                </th>
                                <th
                                    scope="col"
                                    class="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase"
                                >
                                    State
                                </th>
                                <th
                                    scope="col"
                                    class="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase"
                                >
                                    Mac
                                </th>
                                <th
                                    scope="col"
                                    class="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase"
                                >
                                    Battery
                                </th>
                                <th
                                    scope="col"
                                    class="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase"
                                >
                                    Firmware
                                </th>
                                <th
                                    scope="col"
                                    class="px-6 py-3 text-xs font-bold text-right text-gray-500 uppercase"
                                > 
                                </th>
                            </tr>
                        </thead>
                        <tbody class="divide-y divide-gray-200">
                            <tr v-for="device in filteredList">
                                <td
                                    class="px-6 py-4 text-sm font-medium text-white-800 whitespace-nowrap"
                                >
                                    {{ device.type }}
                                </td>
                                <td
                                    class="px-6 py-4 text-sm text-white-800 whitespace-nowrap"
                                >
                                    {{ device.org }}
                                </td>
                                <td
                                    class="px-6 py-4 text-sm text-white-800 whitespace-nowrap"
                                >
                                    {{ device.customer }}
                                </td>
                                <td
                                    class="px-6 py-4 text-sm text-white-800 whitespace-nowrap"
                                >
                                    {{ device.state }}
                                </td>
                                <td
                                    class="px-6 py-4 text-sm text-white-800 whitespace-nowrap"
                                >
                                    {{ device.mac }}
                                </td>
                                <td
                                    class="px-6 py-4 text-sm text-white-800 whitespace-nowrap"
                                >
                                    {{ device.status.batt }}
                                </td>
                                <td
                                    class="px-6 py-4 text-sm text-white-800 whitespace-nowrap"
                                >
                                    {{ device.status.sw }}
                                </td>
                                <td
                                    class="px-6 py-4 text-sm font-medium text-right whitespace-nowrap"
                                >
                                    <a
                                        class="text-green-500 hover:text-green-700"
                                        href="#"
                                    >
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
</template>

<style></style>
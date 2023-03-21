<script>
import DeviceService from '../DeviceService';


export default {
    name: 'ColumnChartBattery',
    data() {
        return {
            temp:[],
            series: [{
                name: 'Units',
                data: [1, 2, 3, 4, 5]
            }],
            chartOptions: {
                chart: {
                    foreColor: "#FFFFFF",
                    type: 'bar',
                },
                plotOptions: {
                    bar: {
                        borderRadius: 10,
                        dataLabels: {
                            position: 'top', // top, center, bottom
                        },
                    }
                },
                dataLabels: {
                    enabled: true,
                    offsetY: -20,
                    style: {
                        fontSize: '12px',
                        colors: ["#304758"]
                    }
                },

                xaxis: {
                    title: {
                        text: 'Battery percentage'
                    },
                    categories: ["0-1000", "1001-2000", "2001-3000", "3001-4000", ">4000"],
                    position: 'top',
                    axisBorder: {
                        show: false
                    },
                    axisTicks: {
                        show: false
                    },
                    crosshairs: {
                        fill: {
                            type: 'gradient',
                            gradient: {
                                colorFrom: '#D8E3F0',
                                colorTo: '#BED1E6',
                                stops: [0, 100],
                                opacityFrom: 0.4,
                                opacityTo: 0.5,
                            }
                        }
                    },
                    tooltip: {
                        enabled: true,
                    }
                },
                yaxis: {
                    min: -1,
                    axisBorder: {
                        show: false
                    },
                    axisTicks: {
                        show: false,
                    },
                    labels: {
                        show: true
                    },
                    title: {
                        text: 'Amount of units'
                    },
                },
                title: {
                    text: 'Battery status of Device pool',
                    floating: true,
                    offsetY: 476,
                    align: 'center',
                    style: {
                        color: '#FFFFFF'
                    }
                }
            },
        }
    },
    async created() {
        try {
            this.temp = await DeviceService.getAllDevices();
            this.temp.forEach(device => {
                var battery = Number(device.status.batt);
                if(battery > 3000 && battery < 4000){
                    this.series.data[3] ++
                }
            });
        } catch (err) {
            this.error = err.message
        }
    }
}
</script>

<template>
    <div id="chart" class="block max-w-xl p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        <apexchart id="column" height='500' type="bar" :options="chartOptions" :series="series"></apexchart>
    </div>
</template>
<style>
.apexcharts-tooltip{
    color: black !important;
}
#column {
    width: 31em;
} 
#column .apexcharts-menu{
    color: black;
}
</style>
<script>

export default {
    name: 'ColumnChartBattery',
    data() {
        return {
            series: [{
                name: 'Units',
                data: [10, 5, 2, 1, 5]
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
                    categories: ["51-100%", "21-50%", "6-20%", "< 5%", "399%"],
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
<script>

export default {
    name: "SparkBox",
    data() {
        return {
            series: [{
                data: [44, 55, 13, 33]
            }],
            chartOptions: {
                chart: {
                    type: 'area',
                    height: 160,
                    sparkline: {
                        enabled: true
                    },
                },
                stroke: {
                    curve: 'straight'
                },
                fill: {
                    opacity: 0.3,
                },
                yaxis: {
                    min: 0
                },
                colors: ['#DCE6EC'],
                title: {
                    text: '$424,652',
                    offsetX: 0,
                    style: {
                        fontSize: '24px',
                    }
                },
                subtitle: {
                    text: 'Sales',
                    offsetX: 0,
                    style: {
                        fontSize: '14px',
                    }
                },
                tooltip: {
                    theme: false,
                }
            },
        }
    }
}
</script>

<template>
    <div>
        <div class="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <div id="chart-spark1">
                    <apexchart type="area" height="160" :options="chartOptions" :series="series"></apexchart>
                </div>
        </div>
    </div>
</template>
<style>
.apexcharts-tooltip{
    background-color: aqua !important;
    color: black !important;
}
.apexcharts-tooltip-marker{
    background-color: black !important;
}
</style>
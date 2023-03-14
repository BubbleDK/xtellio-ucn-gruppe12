<script>

export default {
    name: "SparkBox",
    data() {
        return {
            seriesUnits: [{
                name: 'Battery %',
                data: [{
                    x: "2018-09-10",
                    y: 50
                }, {
                    x: "2018-09-11",
                    y: 40
                }, {
                    x: "2018-09-12",
                    y: 33
                }]
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
                    text: 'Batterystatus',
                    offsetX: 0,
                    style: {
                        fontSize: '24px',
                        color: '#FFFFFF'
                    }
                },
                tooltip: {
                    theme: false,
                },
            },
        }
    }
}
</script>

<template>
    <div>
        <div class="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <div id="chart-spark1">
                    <apexchart type="area" height="160" :options="chartOptions" :series="seriesUnits"></apexchart>
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
<script>
import moment from 'moment'
moment().format("MMM Do YY");

export default {
    name: "SparkBoxSignal",
    data() {
        return {
            seriesUnits: [{
                name: '>Signal %',
                data: [{
                    x: moment().subtract(2, 'days').format("DD/MM/YYYY"),
                    y: 50
                }, {
                    x: moment().subtract(1, 'days').format("DD/MM/YYYY"),
                    y: 40
                }, {
                    x: moment().format("DD/MM/YYYY"),
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
                    text: 'Signal',
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
        <div class="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-blue-800 dark:border-gray-700">
            <div id="chart-spark1">
                    <apexchart type="area" height="160" :options="chartOptions" :series="seriesUnits"></apexchart>
                </div>
        </div>
    </div>
</template>

<style>
#chart-spark1 .apexcharts-tooltip{
    background-color: aqua !important;
    color: black !important;
}
.apexcharts-tooltip-marker{
    background-color: black !important;
}
</style>
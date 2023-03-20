<script>
import moment from 'moment'
moment().format("MMM Do YY");
var units2DaysAgo = 5;
var units1DayAgo = 3;
var unitsToday = 1;

export default {
    name: "SparkBoxBattery",
    data() {
        return {
            seriesUnits: [{
                name: 'Units low',
                data: [{
                    x: moment().subtract(2, 'days').format("DD/MM/YYYY"),
                    //TODO: Indsæt reél data fra DB
                    y: units2DaysAgo
                }, {
                    x: moment().subtract(1, 'days').format("DD/MM/YYYY"),
                    //TODO: Indsæt reél data fra DB
                    y: units1DayAgo
                }, {
                    x: moment().format("DD/MM/YYYY"),
                    //TODO: Indsæt reél data fra DB
                    y: unitsToday
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
                    text: '%Units on low battery:',
                    offsetX: 0,
                    style: {
                        fontSize: '24px',
                        color: '#FFFFFF'
                    }
                },
                subtitle:{
                    //TODO: Indsæt den reélle mængde af enheder
                    text: "%Units low battery now: " + unitsToday,
                    style: {
                        fontSize: '18px',
                        color: '#FFFFFF'
                    },
                },
                tooltip: {
                    enabled: true,
                },
            },
        }
    }
}
</script>

<template>
    <div>
        <!-- TODO: Lav if,else logik til styring af baggrundsfarve afhængigt af mængden af enheder med lav batteri -->
        <div class="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-green-800 dark:border-gray-700">
            <div id="chart-spark1">
                    <apexchart type="area" height="160" :options="chartOptions" :series="seriesUnits"></apexchart>
                </div>
        </div>
    </div>
</template>

<style>
#chart-spark1 .apexcharts-tooltip{
    color: black !important;
}
.apexcharts-tooltip-marker{
    background-color: black !important;
}
</style>
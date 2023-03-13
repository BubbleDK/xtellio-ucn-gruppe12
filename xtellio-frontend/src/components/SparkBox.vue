<script>

export default {
    name: "SparkBox",
    data() {
        return {
            series: [44, 55, 13, 33],
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
                colors: ['#FFFFFF'],
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
                }
            },
        }
    }
}
</script>

<template>
    <div>
        <div class="row">
            <div class="col-md-4">
                <div id="chart-spark1">
                    <apexchart type="area" height="160" :options="chartOptions" :series="series"></apexchart>
                </div>
            </div>
        </div>
    </div>
</template>
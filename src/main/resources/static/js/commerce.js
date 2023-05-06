var myChart = echarts.init(document.getElementById('commerce'));
// 绘制图表
myChart.setOption({
    title: {
        text: '历年中国卫星导航与位置服务产业总体产值',
        left: 'center',
    },
    tooltip: {
        trigger: 'axis',
        axisPointer: {
            type: 'cross',
            crossStyle: {
                color: '#999'
            }
        }
    },
    legend: {
        bottom: '0px',
        data: ['总产值（亿元）', '增速（%）']
    },
    xAxis: [
        {
            type: 'category',
            data: ['2015', '2016', '2017', '2018', '2019', '2020', '2021'],
            axisPointer: {
                type: 'shadow'
            }
        }
    ],
    yAxis: [
        {
            type: 'value',
            name: '总产值（亿元）',
            interval: 1000,
            axisLabel: {
                formatter: '{value} '
            }
        },
        {
            type: 'value',
            name: '增速（%）',
            interval: 5,
            axisLabel: {
                formatter: '{value} %'
            }
        }
    ],
    series: [
        {
            name: '总产值（亿元）',
            type: 'bar',
            color: '#edafda',
            tooltip: {
                valueFormatter: function (value) {
                    return value+' 亿元';
                }
            },
            data: [
                1735, 2118, 2550, 3016, 3450, 4033, 4690
            ]
        },
        {
            name: '增速（%）',
            type: 'line',
            color: '#4eb0ce',
            yAxisIndex: 1,
            tooltip: {
                valueFormatter: function (value) {
                    return value + ' %';
                }
            },
            data: ['', 22.07, 20.40, 18.27, 14.39, 16.90, 16.29]
        }
    ]
});

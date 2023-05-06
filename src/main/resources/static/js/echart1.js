var myChart = echarts.init(document.getElementById('echart1'));

option = {
    title:{
      text:"2016-2021年中国各类卫星发射数量",
      left:'center',
      textStyle:{
          fontSize:22,
          color:'#6c6c6c'
      }
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
    toolbox: {
      feature: {
        magicType: { show: true, type: ['line', 'bar'] },
        restore: { show: true }
      }
    },
    legend: {
      data: ['通信卫星', '导航卫星', '遥感卫星'],
      left: 'left'
    },
    xAxis: [
      {
        type: 'category',
        data: ['2016', '2017', '2018', '2019', '2020', '2021'],
        axisPointer: {
          type: 'shadow'
        }
      }
    ],
    yAxis: [
      {
        type: 'value',
        name: '颗数(颗)',
        min: 0,
        max: 45,
        interval: 9,
        axisLabel: {
          formatter: '{value} 颗'
        }
      }
    ],
    series: [
      {
        name: '通信卫星',
        type: 'bar',
        tooltip: {
          valueFormatter: function (value) {
            return value + ' 颗';
          }
        },
        data: [
          2.0, 2.0, 5.0, 8.0, 7.0, 7.0
        ]
      },
      {
        name: '导航卫星',
        type: 'bar',
        tooltip: {
          valueFormatter: function (value) {
            return value + ' 颗';
          }
        },
        data: [
          2.0, 2.0, 18.0, 10.0, 2.0, 0.0
        ]
      },
      {
        name: '遥感卫星',
        type: 'line',
        tooltip: {
          valueFormatter: function (value) {
            return value + ' 颗';
          }
        },
        data: [11.0, 20.0, 36.0, 37.0, 34.0, 42.0]
      }
    ]
  };

myChart.setOption(option);
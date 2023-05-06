var myChart = echarts.init(document.getElementById('lunchTimes'));
// 绘制图表
myChart.setOption({
    title: {
        text: '历年中国航天发射次数',
        left: 'center',
      },
    tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow' 
        }
      },
      legend: {
        top: '30px',
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      xAxis: {
        type: 'value'
      },
      yAxis: {
        type: 'category',
        data: ['2016', '2017', '2018', '2019', '2020', '2021', '2022']
      },
      series: [
        {
          name: '发射失败次数',
          type: 'bar',
          stack: 'total',
          color: '#3333CC',
          label: {
            show: true
          },
          emphasis: {
            focus: 'series'
          },
          data: [1, 1, 1, 2, 4, 3, 2]
        },
        {
          name: '发射成功次数',
          type: 'bar',
          stack: 'total',
          color: '#6699FF',
          label: {
            show: true
          },
          emphasis: {
            focus: 'series'
          },
          data: [21, 17, 38, 32, 35, 52,62]
        }
      ]
});

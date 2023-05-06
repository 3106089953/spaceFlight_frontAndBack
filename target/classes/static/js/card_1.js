var myChart = echarts.init(document.getElementById('card_1'));

option = {
    title: {
      text:"目前全球运行卫星数",
      left:'center',
      textStyle:{
          fontSize:22,
          color:'#6c6c6c'
      }
    },
    tooltip: {
      trigger: 'item'
    },
    legend: {
      orient: 'vertical',
      left: 'left'
    },
    series: [
      {
        name: '运行卫星数',
        type: 'pie',
        radius: '50%',
        data: [
          { value: 541, name: '中国' },
          { value: 3433, name: '美国' },
          { value: 172, name: '俄罗斯' },
          { value: 1319, name: '其他国家' }
        ],
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        }
      }
    ]
  };

myChart.setOption(option);
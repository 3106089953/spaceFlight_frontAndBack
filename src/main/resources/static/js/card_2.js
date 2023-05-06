var myChart = echarts.init(document.getElementById('card_2'));

option = {
  title: {
    text:"2011-2021年航天发射基地运送的航天器入轨数量",
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
      left: 'left',
      top: 40
    },
    series: [
      {
        name: '航天器入轨数量',
        type: 'pie',
        radius: ['40%', '70%'],
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 10,
          borderColor: '#fff',
          borderWidth: 2
        },
        label: {
          show: false,
          position: 'center'
        },
        emphasis: {
          label: {
            show: true,
            fontSize: 40,
            fontWeight: 'bold'
          }
        },
        labelLine: {
          show: false
        },
        data: [
          { value: 93, name: '西昌' },
          { value: 11, name: '文昌' },
          { value: 56, name: '太原' },
          { value: 91, name: '酒泉' },
          { value: 2, name: '黄海海域' }
        ]
      }
    ]
  };

myChart.setOption(option);
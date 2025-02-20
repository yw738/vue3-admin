<template>
  <!--单柱子 柱状图-->
  <div id="myChart" ref="myChart" class="chart"></div>
</template>

<script>
export default {
  name: 'chart',
  data() {
    return {
      defaultTooltip: {
        //提示框
        trigger: 'axis',
        backgroundColor: 'rgba(255,255,255,1)',
        textStyle: {
          color: '#131523',
        },
        extraCssText: 'box-shadow:0 0 8px rgba(0,0,0,0.3)',
        axisPointer: {
          // 坐标轴指示器，坐标轴触发有效
          type: 'shadow', // 默认为直线，可选为：'line' | 'shadow'
        },
      },
    }
  },
  props: {
    /*grid 参数*/
    grid: {
      type: Object,
      default: function () {
        return {
          left: '4%',
          right: '2%',
          top: '10%',
          bottom: '10%',
          borderWidth: 1,
        }
      },
    },
    /*X轴参数*/
    xAxis: {
      type: Array,
      default: function () {
        return []
      },
    },
    /*数据*/
    series: {
      type: Array,
      default: function () {
        return []
      },
    },
    /*图例*/
    legend: {
      type: Object,
      default: function () {
        return {
          show: false,
        }
      },
    },
    /*颜色*/
    color: {
      type: Array,
      default: function () {
        return []
      },
    },
    title: {
      type: Object,
      default: () => ({}),
    },
    /* 是否展示 缩放 */
    isDataZoom: {
      type: Boolean,
      default: true,
    },
    /* 是否自定义 tooltip */
    tooltip: {
      type: Object,
      default: null,
    },
  },
  watch: {
    series(newVal, oldVal) {
      if (newVal) {
        this.drawLine()
      }
    },
  },
  mounted() {
    this.drawLine()
  },
  methods: {
    drawLine() {
      /*初始化echart实例*/
      let that = this
      let myChart = this.$echarts.init(this.$refs.myChart)
      // let tooltip = this.tooltip==
      let option = {
        title: this.title || {},
        grid: that.grid,
        color: [...that.color],
        legend: {
          right: '2%',
          //图例文字的样式
          textStyle: {
            color: '#838A95',
            fontSize: 14,
          },
          ...that.legend,
        },
        tooltip: this.defaultTooltip,
        dataZoom: this.isDataZoom
          ? [
              {
                // id: 'dataZoomX',
                maxValueSpan: 8, //显示数据的条数(默认显示10个)
                show: true,
                type: 'inside', //slider
                xAxisIndex: [0],
                filterMode: 'empty',
                zoomLock: true,
              },
            ]
          : [
              {
                type: 'inside',
                start: 0,
                end: 100,
                height: 20,
                left: '10%',
                right: '10%',
                textStyle: {
                  color: '#d4ffff',
                  fontSize: 11,
                },
              },
              {
                start: 0,
                end: 100,
                height: 20,
              },
            ],
        /*x坐标轴*/
        xAxis: {
          type: 'category',
          data: that.xAxis,
          axisLine: {
            lineStyle: {
              color: '#E2E2E2', //横坐标轴颜色
            },
          },
          axisLabel: {
            show: true,
            // interval: 0,
            textStyle: {
              color: '#838A95', //更改坐标轴文字颜色
              fontSize: 14, //更改坐标轴文字大小
            },
          },
        },
        /*y坐标轴*/
        yAxis: {
          type: 'value',
          axisLine: {
            lineStyle: {
              color: '#E2E2E2',
            },
          },
          axisLabel: {
            textStyle: {
              color: '#838A95',
              fontSize: '14',
            },
          },
          /*背景虚线*/
          splitLine: {
            show: true,
            lineStyle: {
              color: ['#EFEFEF'],
              width: 1,
              type: 'dotted',
            },
          },
        },
        series: that.series,
      }
      myChart.setOption(option, true)
      myChart.resize()
      window.addEventListener('resize', () => {
        setTimeout(() => {
          myChart.resize()
        }, 200)
      })
    },
  },
}
</script>

<style scoped>
</style>

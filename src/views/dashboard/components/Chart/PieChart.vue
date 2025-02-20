<!-- 饼图 -->
<template>
  <div :id="id" :class="className" :style="{ height, width }" />
</template>

<script setup lang="ts">
import {
  nextTick,
  onActivated,
  onBeforeUnmount,
  onDeactivated,
  onMounted
} from 'vue';
import { init, EChartsOption } from 'echarts';
import resize from '@/utils/resize';

const props = defineProps({
  id: {
    type: String,
    default: 'pieChart'
  },
  className: {
    type: String,
    default: ''
  },
  width: {
    type: String,
    default: '200px',
    required: true
  },
  height: {
    type: String,
    default: '200px',
    required: true
  }
});

const { mounted, chart, beforeDestroy, activated, deactivated } = resize();

function initChart() {
  const pieChart = init(document.getElementById(props.id) as HTMLDivElement);

  pieChart.setOption({
    grid: {
      left: '0%',
      right: '2%',
      bottom: '10%',
      containLabel: true
    },
    legend: {
      orient: 'vertical',
      left: '60%',
      itemWidth: 14,
      itemHeight: 14,
      top: 'center',
      icon: 'circle',
      itemGap: 20,
      textStyle: {
        color: '#666',
        fontSize: '14'
        // lineHeight: '20px'
      },
      formatter: function (name: any) {
        return name + '         35%';
      }
    },
    series: [
      {
        name: 'Nightingale Chart',
        type: 'pie',
        radius: ['65%', '100%'],
        center: ['25%', '50%'],
        // roseType: 'area',
        avoidLabelOverlap: false,
        labelLine: {
          show: false
        },
        label: {
          show: true,
          fontSize: '16',
          position: 'center',
          formatter: '{c}\n 完成度'
        },
        itemStyle: {
          borderRadius: 1,
          color: function (params: any) {
            //自定义颜色
            const colorList = ['#FF7A8C', '#52C1F5', '#8167F5'];
            return colorList[params.dataIndex];
          }
        },
        data: [
          { value: 26, name: '电脑端' },
          { value: 27, name: '手机端' }
        ]
      }
    ]
  });

  chart.value = pieChart;
}

onBeforeUnmount(() => {
  beforeDestroy();
});

onActivated(() => {
  activated();
});

onDeactivated(() => {
  deactivated();
});

onMounted(() => {
  mounted();
  nextTick(() => {
    initChart();
  });
});
</script>

<style lang="scss" scoped></style>

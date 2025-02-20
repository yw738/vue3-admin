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
  onMounted,
  watch
} from 'vue';
import { init, EChartsOption } from 'echarts';
import resize from '@/utils/resize';
import * as echarts from 'echarts';
const props = defineProps({
  id: {
    type: String,
    default: 'pieChart2'
  },
  className: {
    type: String,
    default: ''
  },
  width: {
    type: String,
    default: '100%',
    required: true
  },
  height: {
    type: String,
    default: '100%',
    required: true
  },
  data: {
    type: Object,
    default: () => ({})
  }
});

const { mounted, chart, beforeDestroy, activated, deactivated } = resize();

function initChart() {
  const pieChart = init(document.getElementById(props.id) as HTMLDivElement);

  let { arr1 = [], arr2 = [], xAxis = [] } = props.data;
  let maxN = arr1?.sort((a, b) => b - a)[0] || 10000;
  let interval = Math.ceil(Number(maxN / 5));

  pieChart.setOption({
    grid: {
      left: '2%',
      top: '2%',
      right: '2%',
      bottom: '10%',
      containLabel: true
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
      x: 'center',
      y: 'bottom',
      data: ['目标金额', '成交金额']
    },
    xAxis: [
      {
        type: 'category',
        data: xAxis,
        axisPointer: {
          type: 'shadow'
        }
      }
    ],
    yAxis: [
      {
        type: 'value',
        min: 0,
        max: maxN,
        interval: interval,
        axisLabel: {
          formatter: '{value} '
        }
      },
      {
        type: 'value',
        min: 0,
        max: 100,
        interval: 20,
        axisLabel: {
          formatter: '{value}%'
        }
      }
    ],
    series: [
      {
        name: '目标金额',
        type: 'bar',
        data: arr1,
        barWidth: 20,
        itemStyle: {
          color: '#3aa1ff'
        }
      },
      {
        name: '成交金额',
        type: 'bar',
        data: arr2,
        barWidth: 20,
        itemStyle: {
          color: '#4ecb73'
        }
      }
    ]
  } as EChartsOption);
  chart.value = pieChart;
}

watch(
  () => props.data,
  () => {
    nextTick(() => {
      initChart();
    });
  }
);

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
  let timer = null;
  timer = setInterval(() => {
    if (props.data?.xAxis) {
      nextTick(() => {
        initChart();
        clearInterval(timer);
      });
    }
  }, 100);
});
</script>

<style lang="scss" scoped></style>

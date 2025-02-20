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
    default: 'pieChart6'
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
    tooltip: {
      trigger: 'item',
      formatter: function (param) {
        return `${param.marker} ${param.name}   ${param.value} , ${param.percent}%`;
      }
    },
    grid: {
      left: '2%',
      top: '2%',
      right: '2%',
      bottom: '0%'
      // containLabel: true
    },
    // legend: {
    //   data: ['Show', 'Click', 'Visit', 'Inquiry', 'Order']
    // },
    color: ['#3aa1ff', '#4ecb73', '#fbd437', '#435188', '#975fe5'],
    series: [
      {
        name: '',
        type: 'funnel',
        left: '10%',
        top: '0%',
        bottom: '0%',
        label: {
          show: true,
          color: '#545454'
        },
        labelLine: {
          length: 30,
          lineStyle: {
            width: 1,
            type: 'solid',
            color: '#545454'
          }
        },
        itemStyle: {
          borderColor: '#fff',
          borderWidth: 1
        },
        // emphasis: {
        //   label: {
        //     position: 'inside',
        //     // formatter: '{b}Expected: {c}%'
        //   }
        // },
        data: props.data
      },
      {
        name: '',
        type: 'funnel',
        left: '10%',
        top: '0%',
        bottom: '0%',
        label: {
          position: 'inside',
          color: '#fff',
          formatter: a => `${a.percent}%`
        },
        itemStyle: {
          borderColor: '#fff',
          borderWidth: 1
        },
        data: props.data
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

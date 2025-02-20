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
    default: '100%',
    required: true
  },
  height: {
    type: String,
    default: '100%',
    required: true
  },
  data: {
    type: Array,
    default: () => []
  }
});

const { mounted, chart, beforeDestroy, activated, deactivated } = resize();

function initChart() {
  const pieChart = init(document.getElementById(props.id) as HTMLDivElement);
  let arr: any = props.data || [];
  let tag = arr[0]?.tag || 0;
  pieChart.setOption({
    grid: {
      left: '0%',
      right: '2%',
      bottom: '10%',
      containLabel: true
    },
    series: [
      {
        name: 'Nightingale Chart',
        type: 'pie',
        radius: ['65%', '90%'],
        center: ['50%', '50%'],
        // roseType: 'area',
        avoidLabelOverlap: false,
        labelLine: {
          show: false
        },
        label: {
          show: true,
          fontSize: '16',
          position: 'center',
          formatter: () => `完成度 \n ${tag} %`
        },
        itemStyle: {
          borderRadius: 1,
          color: function (params: any) {
            //自定义颜色
            const colorList = ['#58a3f7', '#e9e9e9', '#8167F5'];
            return colorList[params.dataIndex];
          }
        },
        data: props.data || []
      }
    ]
  });

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
    if (props.data?.length) {
      nextTick(() => {
        initChart();
        clearInterval(timer);
      });
    }
  }, 100);
});
</script>

<style lang="scss" scoped></style>

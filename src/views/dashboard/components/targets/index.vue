<template>
  <el-card class="project-card">
    <template #header>
      <div class="card-header">
        <span class="fw-b">业绩目标 </span>
        <div class="flexStart">
          <div>
            <el-select
              v-model="formData.targetEnum"
              style="width: 180px"
              placeholder="请选择"
              @change="getList"
            >
              <el-option
                v-for="item in targetEnum"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </div>
          <div class="marginL20">
            <el-date-picker
              v-model="formData.yearMonth"
              style="width: 180px"
              format="YYYY-MM"
              value-format="YYYY-MM"
              type="month"
              @change="getList"
            />
          </div>

          <!-- <el-link type="primary" :underline="false">
            全部<el-icon style="vertical-align: middle">
              <ArrowRight />
            </el-icon>
          </el-link> -->
        </div>
      </div>
    </template>
    <!-- <div class="tit">成交金额</div> -->
    <div class="flexStart">
      <PieChart width="45%" height="240px" :data="chartData" />
      <div style="width: 50%" class="box">
        <div>
          <p>目标金额</p>
          <span>¥{{ rightData.amountCompleted || 0 }}</span>
        </div>
        <div>
          <p>完成金额</p>
          <span>¥{{ rightData.targetAmount || 0 }}</span>
        </div>
      </div>
    </div>
  </el-card>
</template>

<script setup lang="ts">
/**
 *
 */
import { reactive, toRefs, onBeforeMount } from 'vue';
import router from '@/router';
import { indexApi } from '@/api/call/index';
import PieChart from './PieChart.vue';

const state = reactive({
  formData: {
    yearMonth: '',
    targetEnum: ''
  } as any,
  targetEnum: [
    { value: 'COMPANY_GOALS', label: '公司目标' },
    { value: 'DEPARTMENT', label: '部门目标' },
    { value: 'PERSONAL', label: '我的目标' }
  ],
  yearMonth: [
    { value: 0, label: '今天' },
    { value: 1, label: '昨天' },
    { value: 2, label: '本周' },
    { value: 3, label: '上周' },
    { value: 4, label: '本月' },
    { value: 5, label: '上月' },
    { value: 6, label: '本季度' },
    { value: 7, label: '上季度' },
    { value: 8, label: '今年' },
    { value: 9, label: '去年' }
  ],
  rightData: {},
  chartData: [] as any
});

const { rightData, formData, targetEnum, yearMonth, chartData } = toRefs(state);

onBeforeMount(() => {
  state.formData.targetEnum = state.targetEnum[0].value;
  state.formData.yearMonth = getTime().split('-').slice(0, 2).join('-'); //2022-01
  getList();
});

let n = 1;

let getList = () => {
  let params = JSON.parse(JSON.stringify(state.formData));
  indexApi.targets(params).then(res => {
    n++;
    // { value: 26, name: '电脑端' }
    let { targetAmount = 80, amountCompleted = 100 } = {};
    let tag: number = parseInt((+targetAmount / +amountCompleted) * 100);
    // if (n % 2) {
    state.rightData = {
      amountCompleted,
      targetAmount
    };
    state.chartData = [
      { value: targetAmount, name: '目标金额', tag: tag },
      { value: amountCompleted, name: '完成金额', tag: tag }
    ];
    // } else {
    //   // debugger;
    //   state.chartData = [
    //     { value: 50, name: '目标金额', tag: 50 },
    //     { value: 30, name: '完成金额' }
    //   ];
    // }
  });
};
</script>
<style lang="scss" scoped>
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.project-card {
  font-size: 14px;
  height: 340px;
}
.tit {
  line-height: 48px;
  font-size: 14px;
  color: #666;
}
.box {
  div {
    line-height: 36px;
    height: 100px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
  }
  p {
    font-size: 14px;
    color: #999;
    margin: 0;
  }
  span {
    font-size: 20px;
    color: #666;
  }
}
</style>

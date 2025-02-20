<template>
  <el-card class="project-card">
    <template #header>
      <div class="card-header">
        <span class="fw-b">销售预测 </span>
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
        </div>
      </div>
    </template>
    <!-- <div class="tit">成交金额</div> -->
    <div class="flexStart">
      <PieChart width="100%" height="280px" :data="chartData" />
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
    // yearMonth: '',
    targetEnum: ''
  } as any,
  targetEnum: [
    { value: 'COMPANY_GOALS', label: '公司数据' },
    { value: 'DEPARTMENT', label: '部门数据' },
    { value: 'PERSONAL', label: '我的数据' }
  ],
  yearMonth: [],
  rightData: {},
  chartData: {} as any
});

const { formData, targetEnum, chartData } = toRefs(state);

onBeforeMount(() => {
  state.formData.targetEnum = state.targetEnum[0].value;
  // state.formData.yearMonth = getTime().split('-').slice(0, 2).join('-'); //2022-01
  getList();
});

let getList = () => {
  let params = JSON.parse(JSON.stringify(state.formData));
  indexApi.forecast(params).then(res => {
    let { data = [] } = res;
    // let arr1 = [];
    // let arr2 = [];
    // let xAxis = [];
    // data.forEach(v => {
    //   arr1.push(v.estimatedSalesAmount || 0);
    //   arr2.push(v.probabilityAmount || 0);
    //   xAxis.push(v.time || 0);
    // });
    let arr1 = [100,500,600,800];
    let arr2 = [100,500,600,800];
    let xAxis = ['张艾斯','张斯'];
    state.chartData = {
      arr1,
      arr2,
      xAxis
    };
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
  height: 380px;
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

<template>
  <el-card class="project-card">
    <template #header>
      <div class="card-header">
        <span class="fw-b">销售漏斗 </span>
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
        </div>
      </div>
    </template>
    <!-- <div class="tit">成交金额</div> -->
    <div class="flexStart">
      <PieChart width="100%" height="520px" :data="chartData" />
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
    { value: 'COMPANY_GOALS', label: '公司数据' },
    { value: 'DEPARTMENT', label: '部门数据' },
    { value: 'PERSONAL', label: '我的数据' }
  ],
  yearMonth: [],
  rightData: {},
  chartData: [] as any
});

const { formData, targetEnum, chartData } = toRefs(state);

onBeforeMount(() => {
  state.formData.targetEnum = state.targetEnum[0].value;
  state.formData.yearMonth = getTime().split('-').slice(0, 2).join('-'); //2022-01
  getList();
});

let getList = () => {
  let params = JSON.parse(JSON.stringify(state.formData));
  indexApi.funnel(params).then(res => {
    // let { data = {} } = res;
    // state.chartData = [
    //   { value: data.preliminaryNegotiation || 0, name: '初步洽淡' },
    //   { value: data.inDepthCommunication || 0, name: '深入沟通' },
    //   { value: data.lostBusinessOpportunities || 0, name: '流失商机' },
    //   { value: data.productQuotation || 0, name: '产品报价' },
    //   { value: data.dealOpportunity || 0, name: '成交商机' }
    // ];
    state.chartData = [
      { value: 60, name: '初步洽淡' },
      { value: 40, name: '深入沟通' },
      { value: 30, name: '流失商机' },
      { value: 30, name: '产品报价' },
      { value: 85, name: '成交商机' }
    ];
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
  height: 576px;
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

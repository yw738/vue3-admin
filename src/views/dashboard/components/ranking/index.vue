<template>
  <el-card class="project-card">
    <template #header>
      <div class="card-header">
        <span class="fw-b">业绩排行 </span>
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
    yearMonth: '',
    targetEnum: ''
  } as any,
  targetEnum: [
    { value: 'PERSONAL', label: '个人排行' },
    // { value: 'COMPANY_GOALS', label: '公司目标' },
    { value: 'DEPARTMENT', label: '部门排行' }
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
  chartData: {} as any
});

const { rightData, formData, targetEnum, yearMonth, chartData } = toRefs(state);

onBeforeMount(() => {
  state.formData.targetEnum = state.targetEnum[0].value;
  state.formData.yearMonth = getTime().split('-').slice(0, 2).join('-'); //2022-01
  getList();
});

let getList = () => {
  let params = JSON.parse(JSON.stringify(state.formData));
  indexApi.ranking(params).then(res => {
    state.rightData = res.data;
    // { value: 26, name: '电脑端' }
    let { data = [] } = res;
    let arr1 = [100,500,600,800];
    let arr2 = [100,500,600,800];
    let xAxis = ['张艾斯','张斯'];
    // data.forEach(v => {
    //   arr1.push(v.targetAmount || 0);
    //   arr2.push(v.turnover || 0);
    //   xAxis.push(v.userName || 0);
    // });

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

<template>
  <el-card class="project-card">
    <template #header>
      <div class="card-header">
        <span class="fw-b">数据简报 </span>
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
            <el-select
              v-model="formData.yearMonth"
              style="width: 180px"
              placeholder="请选择"
              @change="getList"
            >
              <el-option
                v-for="item in yearMonth"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </div>

          <!-- <el-link type="primary" :underline="false">
            全部<el-icon style="vertical-align: middle">
              <ArrowRight />
            </el-icon>
          </el-link> -->
        </div>
      </div>
    </template>
    <div class="flexBetween box">
      <template v-for="(item, index) in list" :key="index">
        <div class="item flexCenter">
          <div class="txt">
            {{ item.label }}
          </div>
          <div class="btn">
            {{ listData[item.value] || 0 }}
          </div>
        </div>
      </template>
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

const state = reactive({
  formData: {
    yearMonth: '',
    targetEnum: ''
  } as any,
  targetEnum: [
    { value: 'COMPANY_GOALS', label: '公司' },
    { value: 'DEPARTMENT', label: '部门' },
    { value: 'PERSONAL', label: '个人' }
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
  list: [
    { label: '新增客户', value: 'newCustomer' }, //"newCustomer": 0,
    { label: '新增线索', value: 'addLeads' }, //"newCustomer": 0,
    { label: '新增商机', value: 'newBusiness' }, //"newCustomer": 0,
    { label: '新增订单', value: 'newOrder' }, //"newCustomer": 0,
    { label: '新增联系人', value: 'addNewContact' }, //"newCustomer": 0,
    { label: '跟进次数', value: 'followUpTimes' }, //"newCustomer": 0,
    { label: '处理任务', value: 'processingTasks' }, //"newCustomer": 0,
    { label: '处理工单', value: 'processWorkOrder' } //"newCustomer": 0,
    // "addLeads": 0, //新增线索
    // "newBusiness": 0, //新增商机
    // "newOrder": 0, //新增订单
    // "addNewContact": 0, //新增联系人
    // "followUpTimes": 0, //跟进次数
    // "processingTasks": 0, //处理任务
    // "processWorkOrder": 0 //处理工单
  ],
  listData: {} as any
});

const { list, formData, targetEnum, yearMonth, listData } = toRefs(state);

onBeforeMount(() => {
  state.formData.targetEnum = state.targetEnum[0].value;
  state.formData.yearMonth = state.yearMonth[0].value;
  getList();
});

let getList = () => {
  let params = JSON.parse(JSON.stringify(state.formData));
  indexApi.briefing(params).then(res => {
    state.listData = {
       "addLeads": 2, //新增线索
    "newBusiness": 3, //新增商机
    "newOrder": 0, //新增订单
    "addNewContact": 1, //新增联系人
    "followUpTimes": 5, //跟进次数
    "processingTasks": 16, //处理任务
    "processWorkOrder": 17 //处理工单
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
  height: 340px;
}

.box {
  flex-wrap: wrap;
}
.item {
  width: 25%;
  height: 120px;
  // border: 1px solid red;
  flex-direction: column;
}
.title {
  font-weight: 500;
  font-style: normal;
  font-size: 18px;
  color: #169bd5;
}

.txt {
  font-style: normal;
  font-size: 14px;
  color: #999;
  line-height: 48px;
}
.btn {
  font-size: 28px;
  color: #666666;
  line-height: 48px;
}
</style>

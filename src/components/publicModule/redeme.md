# PageLayout的模板数据
## 2022-06-16 杨伟
<!-- ----------------------------------------------------------------------------->
<!-------------------------------------------------------------------------------->
<!-- setup 无法设置组件名称，组件名称keepAlive必须 -->
<script lang="ts">
export default {
  name: 'businessUser'
};
</script>

<script setup lang="ts">
/**
 * 企业用户管理
 */
import PageLayout from '@/components/publicModule/PageLayout.vue';
import { onMounted, reactive, getCurrentInstance, ref, toRefs } from 'vue';
const state = reactive({
  searchData: {
    description: null,
    aa: null,
    bb: null,
    cc: null
  },
  searchForm: [
    {
      type: 'input',
      prop: 'description',
      width: '180px',
      placeholder: '公司名称',
      change: () => {}
    },
    {
      type: 'daterange',
      label: '',
      prop: 'aa',
      prop2: 'bb',
      placeholder: '服务时间',
      change: () => {}
    },
    {
      type: 'dictSelect',
      prop: 'cc',
      placeholder: '服务时间',
      change: () => {}
    }
  ],
  searchHandle: [],
  tableHandles: [
    {
      label: '新建企业',
      type: 'primary',
      icon: 'Plus',
      handle: () => add()
    },
    { label: '导出数据', handle: () => add() }
  ],
  tableCols: [
    { label: '键值', prop: 'value' },
    { label: '标签', prop: 'label' },
    { label: '类型', prop: 'type' },
    { label: '描述', prop: 'description' },
    { label: '排序', prop: 'sort' },
    {
      label: '操作',
      type: 'Button',
      width: '180px',
      btnList: [
        {
          label: '修改',
          handle: (row: object, i: number) => update(row, i),
          isShow: () => false
        },
        {
          type: 'danger',
          label: '删除',
          handle: (row: object, i: number) => del(row, i)
        }
      ]
    }
  ],
  pagination: { pageSize: 10, pageIndex: 1, total: 0 }
});

const {
  searchData,
  searchForm,
  searchHandle,
  tableHandles,
  tableCols,
  pagination
} = toRefs(state);
let add = () => {
  console.log('add');
};
let update = (row: object, i: number) => {
  console.log(row, i);
};
let del = (row: object, i: number) => {
  console.log(row, i);
};
</script>

<template>
  <PageLayout
    :searchData="searchData"
    :searchForm="searchForm"
    :searchHandle="searchHandle"
    :tableHandles="tableHandles"
    :tableCols="tableCols"
    :pagination="pagination"
    :api="() => {}"
  >
    <template #formCom>
      <el-form-item class="from_item">
        <el-button>高级筛选</el-button>
      </el-form-item>
    </template>
    <template #tableCom>
      <el-table-column>
        <template #default="scope">
          <el-button
            link
            type="primary"
            size="small"
            @click="del(scope.row, scope.$index)"
            >Detail</el-button
          >
        </template>
      </el-table-column>
    </template>
  </PageLayout>
</template>

<template>
  <div class="content_box">
    <PageLayout
      ref="pageLayout"
      :isSelection="true"
      :isIndex="false"
      :isShowPageBtn="false"
      :tableBtnIsTopRight="false"
      :searchForm="searchForm"
      :searchData="searchData"
      :tableHandles="tableHandles"
      :tableCols="tableCols"
      :pagination="pagination"
      :api="getApi"
      :requestFormmter="requestFormmter"
      @selectChage="selectChage"
    >
    </PageLayout>
  </div>
</template>

<script setup lang="ts">
/**
 * 公海线索
 */
import {
  onMounted,
  onBeforeMount,
  computed,
  reactive,
  getCurrentInstance,
  ref,
  toRefs,
  provide
} from 'vue';
import { ElMessageBox, ElMessage } from 'element-plus';
import PageLayout from '@/components/publicModule/PageLayout.vue';
import {
  clueApi as requstApi,
  clientApi,
  clueSource,
  clientHighType
} from '@/api/client/index';
import useStore from '@/store';
import { getCalList } from '@/api/customTable/mixins';
const { user } = useStore();

const uploadFileRef: any = ref(null);
let uploadFn = (file?: any) => {
  uploadFileRef?.value?.init();
};
provide('calsType', 'crm:clue:query:highSeas');
const state = reactive({
  searchData: {
    keyWords: null,
    clientSource: null,
    clientHighType: null,
    oldBelongUserId: null,
    intoThePoolStartDate: null,
    intoThePoolEndDate: null,
    isTopSort: true
  },
  selectList: [],
  requestData: { companyId: user.userInfo.companyId },
  searchForm: [
    {
      type: 'input',
      prop: 'keyWords',
      width: '180px',
      placeholder: '搜索关键字',
      change: () => {}
    },
    {
      type: 'select',
      prop: 'clientSource',
      placeholder: '线索来源',
      width: '180px',
      options: clueSource,
      change: () => {}
    },
    {
      type: 'select',
      prop: 'clientHighType',
      placeholder: '线索类型',
      width: '180px',
      options: clientHighType,
      change: () => {}
    },
    {
      type: 'select',
      prop: 'oldBelongUserId',
      placeholder: '前归属人',
      width: '180px',
      options: [],
      change: () => {}
    },
    {
      type: 'daterange',
      prop: 'intoThePoolStartDate',
      prop2: 'intoThePoolEndDate',
      placeholder: '入池时间',
      change: () => {}
    }
  ],
  searchHandle: [
    {
      label: '查询',
      type: 'primary',
      icon: 'Search',
      handle: () => check()
    },
    {
      label: '重置',
      // type: 'primary',
      // icon: 'Search',
      handle: () => reSetFn()
    }
  ],
  tableHandles: [
    {
      label: '添加',
      type: 'primary',
      icon: 'Plus',
      // //roleId: 'crm:clue:add',
      // isShow: () => user.userLevel == 2,
      handle: () => add()
    },
    {
      label: '导入',
      icon: 'Upload',
      // //roleId: 'crm:clue:import',
      // isShow: () => user.userLevel == 2,
      handle: (row: any) => uploadFn(row)
    },
    {
      label: '导出',
      icon: 'Download',
      // //roleId: 'crm:clue:export',
      // isShow: () => user.userLevel == 2,
      handle: () => exportFn()
    },
    {
      label: '领取线索',
      // //roleId: 'crm:clue:receive',
      // isShow: () => user.userLevel == 2,
      handle: () => collectCustomer()
    },
    {
      label: '分配线索',
      // //roleId: 'crm:clue:transfer:client',
      // isShow: () => user.userLevel == 2,
      handle: () => openDiversionClue()
    }
  ],
  tableCols: [
    {
      label: '操作',
      type: 'Button',
      width: '340px',
      btnList: [
        {
          type: 'primary',
          label: '编辑',
          icon: 'Edit',
          size: 'small',
          //roleId: 'crm:clue:update',
          isShow: () => user.userLevel == 2,
          handle: (row: object, i: number) => update(row, i)
        },
        {
          type: 'primary',
          label: '置顶',
          size: 'small',
          icon: 'SortUp',
          handle: (row: object, i: number) => openTop(row, i)
        },
        {
          type: 'danger',
          label: '删除',
          icon: 'Delete',
          size: 'small',
          //roleId: 'crm:clue:delete',
          isShow: () => user.userLevel == 2,
          handle: (row: object, i: number) => del(row, i)
        }
      ]
    }
  ],
  tableData: [{}],
  appTableData: [],
  pagination: { pageSize: 10, pageIndex: 1, total: 0 },
  treeData: [],
  allList: [],
  getApi: requstApi.getList2 as any
  // requstApi.getList2
});

const {
  searchData,
  searchForm,
  searchHandle,
  tableHandles,
  tableCols,
  pagination,
  getApi
} = toRefs(state);

const pageLayout: any = ref<HTMLElement>();
const addRef: any = ref(null);
const transferUserRef: any = ref(null);
// const move2SeaRef: any = ref(null);
const addTaskRef: any = ref(null);
const followTaskRef: any = ref(null);
const convert2CustomerRef: any = ref(null);
const diversionClueRef: any = ref(null);

const emit = defineEmits(['openApp']);

const requestFormmter = (data: any) => {
  return {
    ...data,
    intoThePoolStartDate: data.intoThePoolStartDate.split(' ')[0],
    intoThePoolEndDate: data.intoThePoolEndDate.split(' ')[0]
  };
};

onBeforeMount(() => {
  clientApi.queryEmployee().then(res => {
    state.searchForm[3].options = res.data?.map((v: any) => ({
      label: v.name,
      value: v.id,
      departmentId: v.departmentId
    }));
    // .filter(v => v.value != user.userInfo.id);
  });

  getCalList('crm:clue:query:highSeas').then((res: any) => {
    state.tableCols = [...res, ...state.tableCols];
  });
});
let selectChage = (row: any) => {
  state.selectList = row.selection;
};
let exportFn = () => {
  (window as any).fileDown('commonClue', {
    ...state.searchData
  });
};

let openTop = (row: any, i: any) => {
  ElMessageBox.confirm('该操作将置顶。', '确定置顶吗？')
    .then(() => {
      requstApi?.top(row.clientId).then((res: any) => {
        ElMessage.success('置顶成功');
        onSubmit();
      });
    })
    .catch(() => {});
};

// 领取线索
let collectCustomer = () => {
  let ids = state.selectList.map((v: any) => v.clientId).join(',');
  if (!ids) {
    ElMessage.error('领取线索至少需选择1条数据；');
    return;
  }
  ElMessageBox.confirm(
    '是否确认领取所选择的线索？领取后N天后未跟进，线索将自动转为公共线索',
    '确认提示'
  )
    .then(() => {
      requstApi?.receiveClue(ids).then((res: any) => {
        ElMessage.success('操作成功');
        onSubmit();
      });
    })
    .catch(() => {});
};

const check = () => {
  state.pagination.pageIndex = 1;
  onSubmit();
};
const reSetFn = () => {
  // state.pagination.pageIndex = 1;
  Object.assign(state.searchData, {
    keyWords: null,
    clientSource: null,
    clientHighType: null,
    oldBelongUserId: null,
    intoThePoolStartDate: null,
    intoThePoolEndDate: null,
    isTopSort: true
  });
  // getList();
};

// 分配线索
let openDiversionClue = () => {
  let ids = state.selectList.map((v: any) => v.clientId);
  diversionClueRef?.value?.init(ids);
};

let add = () => {
  addRef?.value?.init('add', {
    clueType: '1',
    customerType: '4'
  });
};

let update = (row: object, i: number) => {
  addRef?.value?.init('edit', {
    clueType: '1',
    customerType: '4',
    ...row
  });
};

let del = (row: any, i: number) => {
  ElMessageBox.confirm('该数据将永久被删除，并且无法恢复。确定删除吗？', '提示')
    .then(() => {
      requstApi?.del(row.clientId).then((res: any) => {
        ElMessage.success('删除成功');
        onSubmit();
      });
    })
    .catch(() => {});
};

const onSubmit = () => {
  state.selectList = [];
  pageLayout?.value?.getList();
};
</script>

<style lang="scss" scoped>
.demo_form_inline {
  v-deep .el-form-item {
    margin-right: 0 !important;
  }
}

.marginR0 {
  margin-right: 0 !important;
}

.paddingL120 {
  padding-left: 120px;
}

#elDrawer {
  width: 700px;
}
</style>

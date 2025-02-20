<template>
  <div class="main">
    <el-card
      id="content_box"
      :class="tableBtnIsTopRight ? 'tableBtnIsTopRight' : ''"
      shadow="never"
    >
      <slot name="default" />
      <SearchForm
        id="searchForm"
        v-if="searchForm.length"
        :searchData="searchData"
        :searchForm="searchForm"
        :searchHandle="pageSearchHandle"
      >
        <!-- 自定义特殊按钮 -->
        <slot name="formCom" />
      </SearchForm>
      <TableTemp
        v-if="tableCols.length"
        :comheight="tableHeight"
        :isSelection="isSelection"
        :isIndex="isIndex"
        :isPagination="true"
        :loading="false"
        :isHandle="true"
        :isShowCustomBtn="isShowCustomBtn"
        :isShowPageBtn="isShowPageBtn"
        :tableData="tableData"
        :tableCols="tableCols"
        :tableHandles="tableHandles"
        :pagination="pagination"
        :indexLabel="indexLabel"
        @refresh="getList"
        @selectChage="selectChage"
        @allChecked="allChecked"
      >
        <slot name="tableCom" />
      </TableTemp>
    </el-card>
  </div>
</template>

<script>
import TableTemp from './Table.vue';
import SearchForm from './From.vue';
import publicMixin from './publicMixin.js';
/**
 * 布局组件
 * 适用于基础的 表格+筛选+分页 的组合
 */
export default {
  name: 'PageLayout',
  components: { TableTemp, SearchForm },
  mixins: [publicMixin],
  data() {
    return {
      defaultSearchHandle: [
        {
          label: '查询',
          type: 'primary',
          icon: 'Search',
          handle: () => this.check()
        },
        {
          label: '重置',
          icon: 'RefreshLeft',
          handle: () => this.resetFormInline()
        }
      ]
    };
  },
  computed: {
    pageSearchHandle() {
      return [...this.defaultSearchHandle, ...this.searchHandle];
    }
  },
  props: {
    // 表格请求的api
    api: {
      type: Function,
      default: () => () => {}
    },
    // 查询条件
    searchData: {
      type: Object,
      default: () => ({})
    },
    // 查询条件
    searchForm: {
      type: Array,
      default: () => []
    },
    // 查询按钮
    searchHandle: {
      type: Array,
      default: () => []
    },
    // 表格上方按钮
    tableHandles: {
      type: Array,
      default: () => []
    },
    // 表头
    tableCols: {
      type: Array,
      default: () => []
    },
    // 分页条件
    pagination: {
      type: Object,
      default: () => ({ pageSize: 10, pageIndex: 1, total: 0 })
    },
    isShowCustomBtn: { type: Boolean, default: true }, // 是否显示自定义表格 按钮
    isIndex: { type: Boolean, default: true }, // 是否显示表格索引
    isSelection: { type: Boolean, default: false }, // 是否显示表格复选框
    indexLabel: { type: String, default: '序号' }, //自定义的序号
    isShowPageBtn: { type: Boolean, default: false }, // 是否显示分页左侧按钮

    addedHeight: { type: Number, default: 0 }, //计算高度，额外减去的高度
    tableBtnIsTopRight: { type: Boolean, default: false }, //table 的顶层按钮 是否要和上面筛选框变成一排
    formmater: {
      type: Function
    }, //自定义的过滤方法
    requestFormmter: {
      type: Function
    }, //自定义的请求过滤方法
    requestData: {
      type: Object,
      default: () => ({})
    } //额外的查询条件
  },
  methods: {
    selectChage(res) {
      this.$emit('selectChage', res);
    },
    allChecked(selection) {
      this.$emit('allChecked', selection);
    }
  }
};
</script>

<style scoped>
.main {
  width: calc(100% - 30px);
  height: calc(100% - 30px);
  margin: 15px auto;
}

#content_box {
  width: 100%;
  height: 100%;
}
</style>
<style>
.tableBtnIsTopRight .ces-table-page .ces-handle {
  float: right !important;
  margin-top: -50px !important;
}
</style>

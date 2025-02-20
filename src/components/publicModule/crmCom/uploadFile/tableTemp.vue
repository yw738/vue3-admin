<template>
  <el-table
    :data="tableData"
    id="editAbletrendsTable"
    class="mergetable"
    border
    ref="multipleTable"
    size="mini"
    :span-method="arraySpanMethod"
    :height="height ? height : null"
  >
    <!-- :width="widthIsAuto ? 'auto' : v.width || '120'" -->
    <!-- :width="widthIsAuto ? 'auto' : item.width || '120'" -->
    <el-table-column
      v-for="(item, index) in tableArray"
      :key="index"
      :label="item.label"
      :width="item.width ? item.width : 'auto'"
      min-width="100"
    >
      <template v-if="item.children && item.children.length" #default="scope">
        <el-table-column
          v-for="(v, i) in item.children"
          :key="i"
          :prop="v.value"
          :label="v.label"
          :width="item.width ? item.width : 'auto'"
          min-width="100"
        >
        </el-table-column>
      </template>
      <template #default="scope">
        <div>{{ scope.row[item.value] }}</div>
      </template>
    </el-table-column>
    <slot />
  </el-table>
</template>

<script>
/**
 * 详情表格渲染模板
 */
export default {
  props: {
    //表格数据
    tableData: {
      type: Array,
      default: () => []
    },
    //表格表头
    tableArray: {
      type: Array,
      default: () => []
    },
    //是否显示合计 ，需要手动添加合计列表，不是公共属性,生产质检专用
    isShowSummary: {
      type: Boolean,
      default: false
    },
    //宽度是否自适应
    widthIsAuto: {
      type: Boolean,
      default: true
    },
    //高度 默认288
    height: {
      type: Number
    }
  },

  methods: {
    //合并单元格
    arraySpanMethod({ row, column, rowIndex, columnIndex }) {
      if (rowIndex % 2 == 0) {
        if (columnIndex < 6) {
          return {
            rowspan: row.rowspan,
            colspan: 1
          };
        }
      } else {
        if (columnIndex < 6) {
          return {
            rowspan: row.rowspan,
            colspan: 1
          };
        }
      }
    }
  }
};
</script>

<style >
.mergetable .cell {
  text-align: center;
}
</style>

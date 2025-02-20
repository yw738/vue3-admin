<template>
  <section class="ces-table-page" v-if="isShow">
    <!-- 表格操作按钮 -->
    <section class="ces-handle" v-if="isHandle && tableHandles.length">
      <template v-for="(item, index) in tableHandles" :key="index">
        <UploadBotton
          v-has-perm="item.roleId || 'noAuthentication'"
          v-if="item.type == 'uploadFile'"
          :isCustomUpload="true"
          :title="item.label"
          @success="item.handle"
          :style="{
            'margin-left': '0',
            'margin-right': '20px'
          }"
        />
        <!--           v-else
 -->
        <el-button
          v-has-perm="item.roleId || 'noAuthentication'"
          :style="{
            'margin-left': '0',
            'margin-right': '20px'
          }"
          :size="item.size || size"
          :type="item.type"
          :icon="item.icon"
          v-if="
            item.type != 'uploadFile' &&
            (!item.isShow || (item.isShow && item.isShow(item, index)))
          "
          @click="item.handle()"
          >{{ item.label }}</el-button
        >
      </template>
      <!-- crm 专用的排序表格插件 -->
      <div v-if="isShowCustomBtn">
        <CustomTable @success="customTableCB" />
      </div>
    </section>

    <!-- 数据表格 -->
    <!-- :summary-method="getSummaries"
    :show-summary="showSummary"
    :data="tableData"
    class="table"
    :border="border"
    ref="multipleTable"
    :height="height ? height : null"
    :max-height="maxHeight ? maxHeight : null"
    @select="handSelectChange"
    @selection-change="handleSelectionChange"
    @select-all="handSelectAll"
    :stripe="isShowStripe"
    :header-cell-style="headerStyle" -->
    <section class="ces-table">
      <el-table
        :data="tableData"
        v-loading="loading"
        :size="size"
        ref="cesTable"
        :height="tableH"
        :stripe="true"
        :border="isBorder"
        :header-cell-style="headerStyle"
        :defaultSelections="defaultSelections"
        @select="handSelectChange"
        @select-all="handSelectAll"
        @selection-change="handleSelectionChange"
        @row-click="rowClick"
      >
        <el-table-column v-if="isSelection" type="selection" />
        <el-table-column
          v-if="isIndex"
          type="index"
          :label="indexLabel"
          width="80"
        />
        <!-- 数据栏 -->
        <el-table-column
          v-for="item in tableCols"
          :key="item.id"
          :prop="item.prop"
          :label="item.label"
          :width="item.width"
          :align="item.align"
          show-overflow-tooltip
          :render-header="item.require ? renderHeader : null"
          :sortable="item.sortable || false"
          :fixed="item.fixed"
          @sort-method="item.sortMethod"
        >
          <template #default="scope">
            <!-- html -->
            <span
              v-if="item.type === 'Html'"
              v-html="item.html(scope.row)"
            ></span>
            <!-- 按钮 -->
            <span v-if="item.type === 'Button'">
              <el-button
                v-for="(btn, i) in item.btnList"
                v-show="
                  !btn.isShow ||
                  (btn.isShow && btn.isShow(scope.row, scope.$index))
                "
                :key="i"
                :disabled="btn.isDisabled && btn.isDisabled(scope.row)"
                :type="btn.type"
                :size="btn.size || size"
                :icon="btn.icon"
                :plain="btn.plain || false"
                @click="btn.handle(scope.row, scope.$index)"
                >{{
                  (btn.formatter && btn.formatter(scope.row)) || btn.label
                }}</el-button
              >
            </span>
            <!-- 输入框 -->
            <el-input
              v-if="item.type === 'Input'"
              v-model="scope.row[item.prop]"
              :size="size"
              :disabled="item.isDisabled && item.isDisabled(scope.row)"
              @focus="item.focus && item.focus(scope.row)"
            >
            </el-input>
            <!-- 下拉框 -->
            <el-select
              v-if="item.type === '请选择'"
              v-model="scope.row[item.prop]"
              :size="size"
              :props="item.props"
              :disabled="item.isDisabled && item.isDisabled(scope.row)"
              @change="item.change && item.change(scope.row)"
            >
              <el-option
                v-for="op in item.options"
                :label="op[item.props.label]"
                :value="op[item.props.value]"
                :key="op[item.props.value]"
              ></el-option>
            </el-select>
            <!-- 单选 -->
            <el-radio-group
              v-if="item.type === 'Radio'"
              v-model="scope.row[item.prop]"
              :disabled="item.isDisabled && item.isDisabled(scope.row)"
              @change="item.change && item.change(scope.row)"
            >
              <el-radio
                v-for="(ra, raI) in item.radios"
                :label="ra.value"
                :key="raI"
                >{{ ra.label }}</el-radio
              >
            </el-radio-group>
            <!-- 复选框 -->
            <el-checkbox-group
              v-if="item.type === 'Checkbox'"
              v-model="scope.row[item.prop]"
              :disabled="item.isDisabled && item.isDisabled(scope.row)"
              @change="item.change && item.change(scope.row)"
            >
              <el-checkbox
                v-for="(ra, raI) in item.checkboxs"
                :label="ra.value"
                :key="raI"
                >{{ ra.label }}</el-checkbox
              >
            </el-checkbox-group>
            <!-- 评价 -->
            <el-rate
              v-if="item.type === 'Rate'"
              v-model="scope.row[item.prop]"
              :disabled="item.isDisabled && item.isDisabled(scope.row)"
              @change="item.change && item.change(scope.row)"
            >
            </el-rate>
            <!-- 开关 -->
            <el-switch
              v-if="item.type === 'Switch'"
              v-model="scope.row[item.prop]"
              :disabled="item.isDisabled && item.isDisabled(scope.row)"
              @change="item.change && item.change(scope.row)"
            >
            </el-switch>
            <!-- 图像 -->
            <img
              style="width: 50px; height: 50px; float: left"
              v-if="item.type === 'Image'"
              :src="scope.row[item.prop]"
              @click="item.handle && item.handle(scope.row)"
            />
            <!-- 滑块 -->
            <el-slider
              v-if="item.type === 'Slider'"
              v-model="scope.row[item.prop]"
              :disabled="item.isDisabled && item.isDisabled(scope.row)"
              @change="item.change && item.change(scope.row)"
            >
            </el-slider>
            <!-- 带提示的  Tooltip -->
            <span v-if="item.type === 'Tooltip'">
              <el-tooltip
                v-if="item.txtType(scope.row) == 'warning'"
                effect="dark"
                :content="item.formatter && item.msgFormatter(scope.row)"
                placement="top"
              >
                <span
                  class="tableTemp_txt"
                  style="color: #ff3300"
                  @click="item.handle && item.handle(scope.row)"
                >
                  {{
                    (item.formatter && item.formatter(scope.row)) ||
                    scope.row[item.prop] ||
                    '-'
                  }}<el-icon style="margin-left: 2px" :size="14"
                    ><Warning /></el-icon
                ></span>
              </el-tooltip>
              <span
                v-else-if="item.txtType(scope.row) == 'success'"
                class="tableTemp_txt"
                style="color: #66cc66"
                @click="item.handle && item.handle(scope.row)"
              >
                {{
                  (item.formatter && item.formatter(scope.row)) ||
                  scope.row[item.prop]
                }}</span
              >
              <span
                v-else
                class="tableTemp_txt"
                style="color: #666666"
                @click="item.handle && item.handle(scope.row)"
              >
                {{
                  (item.formatter && item.formatter(scope.row)) ||
                  scope.row[item.prop]
                }}</span
              >
            </span>

            <!-- 文字链接 -->
            <el-link
              v-if="
                item.type === 'TxtDown' && item.show && item.show(scope.row)
              "
              type="primary"
              @click="item.handle && item.handle(scope.row)"
              target="_blank"
              >{{ item.prop }}</el-link
            >
            <!-- 导入 -->
            <UploadBotton
              v-if="item.type == 'uploadFile'"
              :isCustomUpload="true"
              :title="item.label"
              @success="item.handle"
            />
            <!-- 默认 -->
            <span
              v-if="!item.type"
              class="tableTemp_txt"
              :style="item.itemStyle && item.itemStyle(scope.row)"
              :class="item.itemClass && item.itemClass(scope.row)"
              @click="item.handle && item.handle(scope.row)"
            >
              <el-image
                v-if="item.img"
                style="width: 16px; height: 16px; margin-right: 4px"
                :src="item.img"
                fit="fill"
              />
              {{
                (item.formatter && item.formatter(scope.row)) ||
                scope.row[item.prop] ||
                '-'
              }}</span
            >
          </template>
        </el-table-column>
        <slot />
      </el-table>
    </section>

    <!-- 分页 -->
    <section class="ces-pagination" v-if="isPagination">
      <!-- v-if="isShowPageBtn" -->
      <!-- 暂时不做 -->
      <div v-if="false">
        <el-button>选择全部</el-button>
        <el-button>反向选择</el-button>

        <el-dropdown>
          <el-button style="margin-left: 12px"
            >更多操作<el-icon class="el-icon--right">
              <arrow-down />
            </el-icon>
          </el-button>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item>Action 1</el-dropdown-item>
              <el-dropdown-item>Action 2</el-dropdown-item>
              <el-dropdown-item>Action 3</el-dropdown-item>
              <el-dropdown-item>Action 4</el-dropdown-item>
              <el-dropdown-item>Action 5</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
      <div v-else></div>
      <!-- [10, 20, 30, 40, 50, 100] -->
      <el-pagination
        class="el_pagination"
        @current-change="handleCurrentChange"
        @size-change="handleSizeChange"
        background
        :page-sizes="pagination.sizesArr || [10, 20, 30]"
        layout="total,sizes ,prev, pager, next"
        :page-size="pagination.pageSize"
        :current-page="pagination.pageIndex"
        :total="pagination.total"
      />
      <!-- ,jumper -->
    </section>
  </section>
</template>

<script lang="js">
import UploadBotton from "./UploadBotton.vue"
import CustomTable from "./crmCom/CustomTable.vue"
import { getAllList } from '@/api/customTable/mixins';

/**
 * 表格通用组件
 */
export default {
  components:{UploadBotton,CustomTable},
  props: {
    size: { type: String, default: () => 'default' }, // 表格型号：large / default /small
    isBorder: { type: Boolean, default: false },
    loading: { type: Boolean, default: false },
    isHandle: { type: Boolean, default: false }, // 是否启用 表格操作
    tableHandles: { type: Array, default: () => [] }, //表格操作 按钮列表
    tableData: { type: Array, default: () => [] }, // 表格数据
    tableCols: { type: Array, default: () => [] }, // 表格列配置
    isSelection: { type: Boolean, default: false }, // 是否显示表格复选框
    defaultSelections: { type: [Array, Object], default: () => null }, //默认勾选的列表
    isIndex: { type: Boolean, default: false }, // 是否显示表格索引
    headerStyle: {
      type: Object,
      default: () => ({
        background: '#f5f5f5',
        color: '#666666',
        fontSize: '14px',
        fontWeight: 700,
        // border: 'none',
        height: '49px'
      })
    }, //表头样式
    indexLabel: { type: String, default: '序号' }, //自定义的序号
    isPagination: { type: Boolean, default: true }, // 是否显示分页
    isShowPageBtn: { type: Boolean, default: true }, // 是否显示分页左侧按钮
    pagination: {
      type: Object,
      default: () => ({ pageSize: 10, pageIndex: 1, total: 0 })
    }, // 分页数据
    comheight: {type: Number,default: 0}, //组件高度
    isShowCustomBtn:{type: Boolean, default: true},// 是否显示自定义列表按钮
  },
  data() {
    return {
      multipleSelection: [],
      isShow: true,
      tableH: '100%',
      reload: true,
    };
  },
  inject:['calsType'],
  computed: {
    // tableH() {}
  },
  mounted() {
    if(this.comheight){
      this.setHeight();
    }
  },
  watch: {
    defaultSelections(val) {
      this.$nextTick(function () {
        if (Array.isArray(val)) {
          val.forEach(row => {
            this.$refs.cesTable.toggleRowSelection(row);
          });
        } else {
          this.$refs.cesTable.toggleRowSelection(val);
        }
      });
    },
    comheight() {
      this.setHeight();
    }
  },
  methods: {
    setHeight() {
      let pageH = 0,
        topBtnH = 0;
      if (this.isPagination) pageH = 56;
      if (this.tableHandles?.length) topBtnH = 52;
      // console.log('监听：',this.comheight - pageH - topBtnH);
      this.tableH = this.comheight - pageH - topBtnH;
      // console.log(this.tableH)
      if (!this.comheight) {
        this.tableH = "100%"
      }
      this.repaint();
    },
    /* 重绘 */
    repaint() {
      this.isShow = false;
      this.$nextTick(() => (this.isShow = true));
    },
    /**
     * 全选 || 选择勾选
     * 供外部调用
     * @param {array} arr 可以勾选的
     */
    allChecked(rows) {
      // debugger
      if (rows) {
        //回显专用
        let ids = rows.map(item => item.id);
        this.tableData.forEach(row => {
          if (ids.find(id => id == row.id)) {
            this.$refs.cesTable.toggleRowSelection(row);
          }
        });
        let arr = this.tableData.filter(v=>ids.includes(v.id))

        this.$emit('selectChage', { selection:arr});
      } else {
        this.tableData.forEach(row => {
          this.$refs.cesTable.toggleRowSelection(row);
        });
        this.$emit('selectChage', { selection:this.tableData});
      }

    },
    /**
     * 勾选框发生变化 触发的函数
     * @param {array} selection
     * @param {object} row
     */
    handSelectChange(selection, row) {
      this.$emit('selectChage', { selection, row });
    },
    /**
     * 当用户手动勾选全选 Checkbox 时触发的事件
     * @param {array} selection 勾选的值
     */
    handSelectAll(selection) {
      this.$emit('selectChage', { selection:selection,row:{} });
      this.$emit('allChecked', selection);
    },
    /**
     * 勾选的值 发生改变
     * @param {array} val 勾选的列表
     */
    handleSelectionChange(val) {
      return
      this.multipleSelection = val;
      let data = JSON.parse(JSON.stringify(this.selectionData));
      this.$emit('update:selectionData', {
        ...data,
        [this.indexKey]: val
      });
    },
    //点击表格的某一行
    rowClick(rows) {
      this.$emit('rowClick', rows);
    },
    //分页页数改变
    handleCurrentChange(val) {
      this.pagination.pageIndex = val;
      // console.log(val);
      this.$emit('refresh');
    },
    //分页每页条数改变
    handleSizeChange(val) {
      this.pagination.pageSize = val;
      this.$emit('refresh');
    },
    renderHeader(h, obj) {
      return h('span', { class: 'ces-table-require' }, obj.column.label);
    },
    /**
     * 表格排序的回调函数
     * 操作按钮还有问题
    */
    customTableCB(arr){
      let btnArr = JSON.parse(JSON.stringify(this.tableCols))
      let json = btnArr.filter(v=>v.type=='Button'&&v.label=='操作');//操作按钮
      let calsProp = arr.map(v=>v.prop);
      let allList = getAllList(this.calsType)
      let table = []
      calsProp.forEach(v=>{
        let item = allList.filter(a=>a.prop==v)[0]
        if(item)table.push(item);
      })
      // 给表格赋值
      let arr2 = [...table,...json];//新的表格
      this.tableCols.splice(0,10)
      this.tableCols.splice(0,0,...arr2)
      // console.log(this.tableCols)
      this.repaint();
    }
  }
};
</script>

<style>
.ces-table-require::before {
  content: '*';
  color: red;
}

.ces-handle {
  margin-bottom: 20px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
}

.ces-pagination {
  margin-top: 20px;
  display: flex;
  justify-content: space-between;
  /* height: 100%; */
  height: 36px;
  align-items: center;
}

.round {
  position: relative;
}

.round:after {
  content: ' ';
  position: absolute;
  left: -10px;
  top: 5px;
  width: 8px;
  height: 8px;
  background-color: red;
  border-radius: 4px;
}

.success:after {
  background-color: #03bf16;
}

.warning:after {
  background-color: #ff9900;
}
.cancel:after {
  background-color: #999999;
}
.noStart:after {
  background-color: #4bced0;
}
.tableTemp_txt {
  display: flex;
  align-items: center;
}

.openClass {
  color: #0079fe;
  cursor: pointer;
}
</style>

<template>
  <div>
    <!--  style="margin-left: 20px" -->
    <el-button icon="Film" @click="open()">列表</el-button>
    <el-dialog
      title="自定义显示列项"
      v-model="visible"
      width="600px"
      @close="cancel"
      :close-on-click-modal="false"
      v-if="visible"
      append-to-body
    >
      <div class="marginB20">
        <el-alert
          title="列项显示不得少于5项，最多支持自定义10个列项，灰色选中列不支持隐藏和排序"
          :closable="false"
          type="info"
        />
      </div>
      <!-- 拖拽功能必须绑定row-key唯一 -->
      <el-table
        id="dragTable"
        :border="true"
        ref="dragTable"
        :data="tableData"
        style="width: 100%"
        height="500px"
        row-key="id"
      >
        <el-table-column label="显示" align="center" width="55px">
          <template #default="scope">
            <el-checkbox v-model="scope.row.isChecked" size="large" />
          </template>
        </el-table-column>
        <el-table-column prop="label" label="列名" />
        <el-table-column label="拖动调整顺序" align="center" width="110px">
          <template #default="scope">
            <el-tooltip content="点击拖动排序" placement="top">
              <span class="sortBtn">
                <el-icon><Sort /></el-icon>
              </span>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
      <div class="flexBetween marginT20">
        <div>
          <el-link type="primary" :underline="false" @click="resetTable()"
            >恢复默认</el-link
          >
        </div>
        <div class="flexStart">
          <el-button @click="cancel()">取消</el-button>
          <el-button type="primary" @click="onSubmit()">确定</el-button>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script lang="js">
/**
 * 表格拖拽、控制表格显示隐藏的
 * 引用第三方拖拽插件
*/
import Sortable from "sortablejs";
import {getCals,getAllList,setCals} from "@/api/customTable/mixins"
export default {
  data() {
    return {
      tableData: [],
      defaultList:[],//默认列表
      newList: [],
      visible:false,
    };
  },
  inject:["calsType"],
  mounted() {},
  methods: {
    async open(){
      this.visible = true;
      this.setRowSort();
      let res = await getCals(this.calsType);
      let arr = getAllList(this.calsType);

      this.defaultList = arr?.map(item=>({
        ...item,
        isChecked:item.default||false
      }))||[]

      if(res){
        this.tableData = JSON.parse(res)
        // let arr = getAllList(this.calsType);
        // this.defaultList = arr?.map(item=>({
        //   ...item,
        //   isChecked:item.default||false
        // }))||[]
        // this.tableData = this.defaultList
      }else{
        // 默认数据
        this.tableData = this.defaultList
      }
    },

    setRowSort() {
      this.$nextTick(() => {
        let box = document.querySelector("#dragTable tbody")
        new Sortable(box, {
            animation: 150,
            handle: ".sortBtn",
            ghostClass: 'blue-background-class',
            onEnd: ({ newIndex, oldIndex }) => {
              // console.log(newIndex, oldIndex)
              // 表格重排序
              this.tableData.splice(
                newIndex,
                0,
                this.tableData.splice(oldIndex, 1)[0]
              );
              var newArray = this.tableData.slice(0);
              this.tableData = [];
              this.$nextTick(function () {
                this.tableData = newArray;
                // console.log(this.tableData)
              });

            }
        });

      });
    },
    // 恢复默认
    resetTable(){

      this.tableData = this.defaultList
    },
    cancel(){
      this.tableData = [];
      this.visible = false;
    },
    // 提交
    async onSubmit(){
      let seled = this.tableData.filter(v=>v.isChecked)
      if(seled?.length<5||seled?.length>10){
        this.$message.error('列项显示不得少于5项,最多支持自定义10个列项!!');
        return
      }
      await setCals({
        permissionName:this.calsType,
        checked:JSON.stringify(this.tableData)
      })
      this.$emit("success",seled);
      this.cancel();
    }
  },
};
</script>

<style scoped></style>

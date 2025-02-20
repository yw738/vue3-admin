<template>
  <el-config-provider :locale="locale" :size="size">
    <router-view />
  </el-config-provider>
</template>

<script setup lang="ts">
import { computed, ref, watch, provide, onBeforeMount, onMounted } from 'vue';
import {
  ElConfigProvider,
  ElMessage,
  ElMessageBox,
  ElNotification
} from 'element-plus';
import useStore from '@/store';

// 导入 Element Plus 语言包
import zhCn from 'element-plus/es/locale/lang/zh-cn';
import { useRouter } from 'vue-router';
const router = useRouter();
const { app, user, permission } = useStore();
const size: any = computed(() => app.size);
const locale = ref(zhCn);

onMounted(() => {});
</script>
<style lang="scss">
// 文字超出三行，溢出隐藏
.txtOverFlow3 {
  overflow: hidden;
  text-overflow: ellipsis;
  width: 100%;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  word-break: break-all;
}
/*滚动条的宽度*/
::-webkit-scrollbar {
  width: 10px;
  height: 10px;
}
/*滚动条的滑块*/
::-webkit-scrollbar-thumb {
  background-color: #e0e0e0;
  border-radius: 10px;
}

/*火狐滚动条样式*/
* {
  scrollbar-color: #e0e0e0 #f7f7f9; /* 滑块颜色  滚动条背景颜色 */
  scrollbar-width: thin; /* 滚动条宽度有三种：thin、auto、none */
}

// 公共css

.marginB20 {
  margin-bottom: 20px;
}
.marginB10 {
  margin-bottom: 10px;
}
.marginT20 {
  margin-top: 20px;
}
.marginR10 {
  margin-right: 10px;
}
.marginR30 {
  margin-right: 30px;
}
.marginL20 {
  margin-left: 20px;
}
.marginL10 {
  margin-left: 10px;
}
.flexStart {
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
.flexEnd {
  display: flex;
  justify-content: flex-end;
  align-items: center;
}
.flexBetween {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.flexCenter {
  display: flex;
  justify-content: center;
  align-items: center;
}
.flexAround {
  display: flex;
  justify-content: space-around;
  align-items: center;
}
.inputArea {
  textarea {
    // text-indent: 50px !important;
  }
}
.inputArea_label {
  position: absolute;
  top: 5px;
  left: 11px;
  z-index: 6;
}
.flex1 {
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
}
.tipsIcon {
  height: 22px;
  width: 5px;
  display: inline-block;
  background: #409eff;
  margin-right: 5px;
}
.home_input_box {
  margin: 20px 0;
  width: 100%;
  .el-input-group__append {
    background-color: #409eff !important;
    color: #fff !important;
  }
}

.detail_tit {
  font-size: 14px;
  color: #606266;
  line-height: 23px;
  margin-bottom: 10px;
}

// 日程日历 css 自定义
#calendar_header {
  .el-calendar__header {
    display: none;
  }
  .el-calendar__body {
    padding: 0;
  }
}
</style>

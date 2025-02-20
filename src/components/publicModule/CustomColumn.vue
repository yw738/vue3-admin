<template>
  <el-dialog
    title="自定义显示列项"
    v-model="visible"
    width="500px"
    @close="cancel"
    :close-on-click-modal="false"
    v-if="visible"
    append-to-body
  >
    <el-alert
      style="margin-bottom: 15px"
      title="列项显示不得少于5项，最多支持自定义10个列项，灰色选中列不支持隐藏和排序"
      type="info"
      :closable="false"
      show-icon
    />
    <el-tree
      :allow-drop="allowDrop"
      :allow-drag="allowDrag"
      :data="data"
      draggable
      default-expand-all
      node-key="id"
      @node-drag-start="handleDragStart"
      @node-drag-enter="handleDragEnter"
      @node-drag-leave="handleDragLeave"
      @node-drag-over="handleDragOver"
      @node-drag-end="handleDragEnd"
      @node-drop="handleDrop"
    />
    <template #footer>
      <div class="dialog-footer" style="text-align: center">
        <el-button type="primary" @click="submitForm">保存</el-button>
        <el-button @click="cancel">取消</el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref, toRefs, defineEmits } from 'vue';
import { ElForm, ElMessage, ElMessageBox } from 'element-plus';
import { stateList, paymentWayList } from '@/api/dict';
import useStore from '@/store';
import type Node from 'element-plus/es/components/tree/src/model/node';
import type { DragEvents } from 'element-plus/es/components/tree/src/model/useDragNode';
import type { DropType } from 'element-plus/es/components/tree/src/tree.type';
const { user } = useStore();

const dataFormRef = ref(ElForm);
const state = reactive({
  visible: false,
  visible2: false,
  msg: '为了您的账号安全，进行敏感操作前须先验证身份。',
  formData: {
    employeeId: '',
    companyId: '', //企业ID
    name: '', //姓名
    departmentIds: [], //部门ID
    roleIds: [], //角色ID '1'
    phoneNumber: '', //手机号
    email: '', //邮箱
    username: '', //账号
    password: '', //密码
    state: stateList[0].value //账号状态
  },
  data: [
    {
      label: 'Level one 1'
    },
    {
      label: 'Level two 2-1'
    },
    {
      label: 'Level three 2-1-1'
    },
    {
      label: 'Level two 2-2'
    },
    {
      label: 'Level three 2-2-1'
    },
    {
      label: 'Level one 2'
    },
    {
      label: 'Level one 3'
    },
    {
      label: 'Level two 3-1'
    },
    {
      label: 'Level three 3-1-1'
    },
    {
      label: 'Level two 3-2'
    },
    {
      label: 'Level three 3-2-1'
    }
  ],
  rules: {
    code: [{ required: true, message: '请输入验证码', trigger: 'blur' }]
  },

  props1: {
    checkStrictly: true,
    value: 'id',
    label: 'name'
  },
  allList: [],
  openType: '',

  codeNum: 10, //短信计数
  isShowCountdown: false,
  isSendCode: false,
  timer: null
});
// emit 子组件向父组件事件传递
const emit = defineEmits(['success']);

const {
  visible,
  visible2,
  formData,
  data,
  rules,
  isShowCountdown,
  isSendCode,
  codeNum,
  msg
} = toRefs(state);
let init = async (type: string, res: any = {}) => {
  if (type == 'edit') {
    // state.title = '修改应用';
    // await requstApi.getDetail(res.id).then((response: any) => {
    //   let depart = response.data.departments[0];
    //   let arr = depart ? getDepartList(depart?.id) : [];
    //   Object.assign(state.formData, {
    //     ...response.data,
    //     employeeId: response.data.id,
    //     roleIds: response.data.roles.map((v: any) => v.id),
    //     departmentIds: arr.length ? [-1, ...arr] : []
    //   });
    // });
  } else {
    // state.title = '添加应用';
  }
  state.openType = type;
  state.visible = true;
};

const handleDragStart = (node: Node, ev: DragEvents) => {
  console.log('drag start', node);
};
const handleDragEnter = (
  draggingNode: Node,
  dropNode: Node,
  ev: DragEvents
) => {
  console.log('tree drag enter:', dropNode.label);
};
const handleDragLeave = (
  draggingNode: Node,
  dropNode: Node,
  ev: DragEvents
) => {
  console.log('tree drag leave:', dropNode.label);
};
const handleDragOver = (draggingNode: Node, dropNode: Node, ev: DragEvents) => {
  console.log('tree drag over:', dropNode.label);
};
const handleDragEnd = (
  draggingNode: Node,
  dropNode: Node,
  dropType: DropType,
  ev: DragEvents
) => {
  console.log('tree drag end:', dropNode && dropNode.label, dropType);
};
const handleDrop = (
  draggingNode: Node,
  dropNode: Node,
  dropType: DropType,
  ev: DragEvents
) => {
  console.log('tree drop:', dropNode.label, dropType);
};
const allowDrop = (draggingNode: Node, dropNode: Node, type: DropType) => {
  if (dropNode.data.label === 'Level two 3-1') {
    return type !== 'inner';
  } else {
    return true;
  }
};
const allowDrag = (draggingNode: Node) => {
  return !draggingNode.data.label.includes('Level three 3-1-1');
};
function handleAdd() {
  state.visible2 = true;
}

function submitForm() {
  dataFormRef.value.validate((isValid: boolean) => {
    if (isValid) {
      handleAdd();
    }
  });
}

function copyUrl1() {
  const value = state.formData2.appId;
  const clipboardObj = navigator.clipboard;
  clipboardObj.writeText(value);
  ElMessage.success('复制成功！');
}

function copyUrl2() {
  const value = state.formData2.appKey;
  const clipboardObj = navigator.clipboard;
  clipboardObj.writeText(value);
  ElMessage.success('复制成功！');
}

function cancel() {
  dataFormRef.value.resetFields();
  state.visible = false;
}

// 组件暴露自己的属性
defineExpose({ init });
</script>

<style lang="scss" scoped>
$dark_gray: #889aa4;
$light_gray: #666;
$bg: rgba(236, 245, 255, 1);
.svg-container {
  padding: 5px 10px;
  color: $dark_gray;
  vertical-align: middle;
  width: 40px;
  display: inline-block;
  display: flex;
  justify-content: center;
  align-items: center;
}

.show-pwd {
  position: absolute;
  right: 10px;
  top: 7px;
  font-size: 16px;
  color: $dark_gray;
  cursor: pointer;
  user-select: none;
}
.getCode,
.getCode2 {
  font-size: 14px;
  color: #409eff;
}
.getCode2 {
  cursor: default;
}
</style>

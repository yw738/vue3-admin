# add 模板
<!-- ------------------------------------------------------- -->
<!-- ------------------------------------------------------- -->
<template>
  <el-dialog
    :title="title"
    v-model="visible"
    width="500px"
    @close="cancel"
    :close-on-click-modal="false"
    v-if="visible"
    append-to-body
  >
    <el-form
      ref="dataFormRef"
      :model="formData"
      :rules="rules"
      label-width="130px"
    >
      <el-alert
        style="margin-bottom: 15px"
        :title="msg"
        type="info"
        :closable="false"
        show-icon
      />
      <el-form-item label="应用账号:" prop="name">
        <el-select
          v-model="formData.name"
          style="width: 100%"
          placeholder="请输入应用账号"
        >
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="模板类型:" prop="name">
        <el-radio-group v-model="formData.state" props="state">
          <el-radio
            v-for="(item, index) in options2"
            :label="item.value"
            :key="index"
            >{{ item.label }}</el-radio
          >
        </el-radio-group>
      </el-form-item>

      <el-form-item label="模板名称:" prop="name">
        <el-input
          v-model="formData.name"
          placeholder="请输入模板的名称，不能超过8个字"
        />
      </el-form-item>
      <el-form-item label="模板内容:" prop="name">
        <el-input
          v-model="formData.description"
          type="textarea"
          :rows="6"
          placeholder="请输入短信内容，链接网址必须前后空格，短信内容不能超过180个字"
          :autosize="{ minRows: 4, maxRows: 4 }"
        />
      </el-form-item>
    </el-form>
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
import {
  clientApi as requstApi,
  departmentApi,
  roleApi
} from '@/api/client/index';
import useStore from '@/store';
const { user } = useStore();

const dataFormRef = ref(ElForm);
const state = reactive({
  title: '',
  msg: '人工审核将在工作日30分钟内完成，请耐心等待！(工作时间:9:00~21:00)如对审核状态有疑义，请联系客服。',
  visible: false,
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
    state: stateList[0].value, //账号状态
    description: ''
  },
  rules: {
    name: [{ required: true, message: '请输入应用名称', trigger: 'blur' }],
    departmentIds: [{ required: true, message: '请选择部门', trigger: 'blur' }],
    roleIds: [{ required: true, message: '请选择角色', trigger: 'blur' }]
  },
  options: [] as any, //部门
  options2: [
    {
      label: '1',
      value: '1'
    },
    {
      label: '2',
      value: '2'
    }
  ] as any,

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

const { title, visible, formData, rules, options, options2, codeNum, msg } =
  toRefs(state);
let init = async (type: string, res: any = {}) => {
  // state.options
  if (type == 'edit') {
    state.title = '修改签名';
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
    state.title = '添加签名';
  }
  state.openType = type;
  state.visible = true;
};

function handleAdd() {
  let params = JSON.parse(JSON.stringify(state.formData));
  requstApi.add(params).then(() => {
    ElMessage.success('新增成功！');
    cancel();
    emit('success');
  });
}

function handleUpdate() {
  let params = JSON.parse(JSON.stringify(state.formData));
  requstApi.update(params).then(() => {
    ElMessage.success('编辑成功！');
    cancel();
    emit('success');
  });
}

function submitForm() {
  dataFormRef.value.validate((isValid: boolean) => {
    if (isValid) {
      if (state.openType == 'edit') {
        handleUpdate();
      } else {
        handleAdd();
      }
    }
  });
}

function cancel() {
  dataFormRef.value.resetFields();
  state.visible = false;
  state.title = '';
  Object.assign(state.formData, {
    employeeId: '',
    companyId: '', //企业ID
    name: '', //姓名
    departmentIds: [], //部门ID
    roleIds: [], //角色ID
    phoneNumber: '', //手机号
    email: '', //邮箱
    username: '', //账号
    password: '', //密码
    state: stateList[0].value //账号状态
  });
}

// 组件暴露自己的属性
defineExpose({ init });
</script>

<style lang="scss" scoped>
$dark_gray: #889aa4;
$light_gray: #666;
$bg: rgba(236, 245, 255, 1);
</style>

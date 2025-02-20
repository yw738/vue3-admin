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
      label-width="100px"
    >
      <el-form-item label="接收对象:" prop="belongUserId">
        <el-select
          v-model="formData.belongUserId"
          style="width: 100%"
          placeholder="请选择"
          @change="handChange"
        >
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="备注信息:">
        <el-input
          v-model="formData.remarks"
          type="textarea"
          :rows="6"
          placeholder="请输入备注信息"
          :autosize="{ minRows: 4, maxRows: 4 }"
        />
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="dialog-footer" style="text-align: center">
        <el-button type="primary" @click="submitForm">确定</el-button>
        <el-button @click="cancel">取消</el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
/**
 * 分配线索 || 转移线索
 */
import { onMounted, reactive, ref, toRefs, defineEmits } from 'vue';
import { ElForm, ElMessage, ElMessageBox } from 'element-plus';
import { clueApi as requstApi } from '@/api/client/index';
import useStore from '@/store';
import { clientApi } from '@/api/client/index';
const { user } = useStore();

const dataFormRef = ref(ElForm);
const state = reactive({
  visible: false,
  formData: {
    clueIds: '', //线索id集合
    belongUserId: '', //接收人员
    remarks: '', //备注信息
    departmentId: '' //备注信息
  },
  rules: {
    belongUserId: [{ required: true, message: '请选择', trigger: 'blur' }]
  },
  options: [] as any,
  openType: null as any,
  title: ''
});
// emit 子组件向父组件事件传递
const emit = defineEmits(['success']);

const { visible, formData, rules, options, title } = toRefs(state);
let init = async (arr: any = [], type = 'fenpei') => {
  if (!arr?.length) {
    ElMessage.error('分配线索至少需选择1条数据');
    return;
  }

  if (type == 'fenpei') {
    state.title = '分配线索';
  } else if (type == 'zhuanyi') {
    state.title = '转移线索';
  }
  state.openType = type;
  await clientApi.queryEmployee().then(res => {
    state.options = res.data?.map((v: any) => ({
      label: v.name,
      value: v.id,
      departmentId: v.departmentId
    }));
  });
  state.formData.clueIds = arr;
  state.visible = true;
};

function handleAdd() {
  let params = JSON.parse(JSON.stringify(state.formData));
  if (state.openType == 'fenpei') {
    // 分配线索
    requstApi.assignLeads(params).then(() => {
      ElMessage.success('操作成功！');
      cancel();
      emit('success');
    });
  } else if (state.openType == 'zhuanyi') {
    // 转移线索
    requstApi.divertClue(params).then(() => {
      ElMessage.success('操作成功！');
      cancel();
      emit('success');
    });
  }
}

function submitForm() {
  dataFormRef.value.validate((isValid: boolean) => {
    if (isValid) {
      handleAdd();
    }
  });
}

function handChange(e) {
  let item = state.options?.find(v => v.value == e) || {};
  state.formData.departmentId = item.departmentId;
}

function cancel() {
  dataFormRef.value.resetFields();
  state.visible = false;
  Object.assign(state.formData, {
    clueIds: [], //线索id集合
    belongUserId: '', //接收人员
    remarks: '', //备注信息
    departmentId: '' //备注信息
  });
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

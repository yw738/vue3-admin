<template>
  <el-dialog
    title="批量导入"
    v-model="visible"
    width="800px"
    @close="cancel"
    :close-on-click-modal="false"
    v-if="visible"
    append-to-body
  >
    <div class="flexBetween marginB20" v-if="step != 4">
      <div class="top flexStart" :class="getCalss(1)">
        <div>1</div>
        <div>上传文件</div>
      </div>
      <div class="top flexStart" :class="getCalss(2)">
        <div>2</div>
        <div>数据预览</div>
      </div>
      <div class="top flexStart">
        <div>3</div>
        <div>导入数据</div>
      </div>
    </div>
    <div>
      <!-- 上传文件 step1 -->
      <div class="marginB20" v-if="step == 1">
        <el-card
          class="marginB20"
          shadow="never"
          :body-style="{ padding: '0 ' }"
        >
          <div class="flexStart card_box">
            <div class="left_img flexCenter">
              <el-icon color="#ccc" size="40px"><Download /></el-icon>
            </div>
            <div class="right flexBetween">
              <div class="tit">填写导入数据信息</div>
              <div class="txt">
                请按照数据模板的格式准备导入数据，模板中的表头名称不可更改，表头行不能删除
              </div>
              <el-link type="primary" @click="exportFn" :underline="false"
                >下载模板</el-link
              >
            </div>
          </div>
        </el-card>
        <el-card
          class="marginB20"
          shadow="never"
          :body-style="{ padding: '0 ' }"
        >
          <div class="flexStart card_box">
            <div class="left_img flexCenter">
              <el-icon color="#ccc" size="40px"><UploadFilled /></el-icon>
            </div>
            <div class="right flexBetween">
              <div class="tit">上传填好的信息表</div>
              <div class="txt">
                文件后缀名必须为xls 或xlsx
                （即Excel格式），文件大小不得大于10M，最多支持导入3000条数据
              </div>
              <!-- <el-link type="primary" @click="exportFn" :underline="false"
                >上传文件</el-link
              > -->
              <!-- v-if="!fileName" -->
              <p class="flexStart">
                <UploadBotton
                  :isCustomUpload="true"
                  :isShowTxtLink="true"
                  title="上传文件"
                  @success="uploadFn"
                  style="width: 100%"
                />
                <span v-if="fileName" class="fileClass">{{ fileName }}</span>
              </p>
            </div>
          </div>
        </el-card>
      </div>
      <div class="marginB20" v-if="step == 2">
        <el-card
          class="marginB20"
          shadow="never"
          :body-style="{ padding: '0 ' }"
        >
          <div class="flexStart card_box">
            <div class="left_img flexCenter">
              <el-icon color="#ccc" size="40px"><WarningFilled /></el-icon>
            </div>
            <div class="right flexBetween">
              <div class="tit">
                正常数量条数:
                <span class="ok">{{ uploadData.normalSize }}条</span>
              </div>
              <div class="tit">
                异常数量条数:
                <span class="err">{{ uploadData.errorInfos.length }}条</span>
              </div>
            </div>
          </div>
        </el-card>
        <el-card class="marginB20" shadow="never">
          <div>异常提示：</div>
          <div class="errInfo">
            <div
              v-if="props.typeName == 'order'"
              v-for="(item, index) in uploadData.errorInfos"
            >
              {{ item.tipsInfo }}
            </div>
            <div v-else v-for="(item, index) in uploadData.errorInfos">
              第{{ item.rowNumber }}行： {{ item.errorDetails }}
            </div>
          </div>
        </el-card>
      </div>
      <div class="marginB20" v-if="step == 3">
        <MergeTableTemp
          v-if="props.typeName == 'order'"
          :tableArray="tableCal"
          :tableData="uploadData.result"
        />
        <!-- 未合并的表格 -->
        <el-table
          v-else
          ref="multipleTableRef"
          :border="true"
          :data="uploadData.result"
          height="300px"
        >
          <el-table-column
            v-for="(item, index) in tableCal"
            :key="index"
            :label="item.label"
          >
            <template #default="scope">
              <el-rate v-if="item.type == 1" v-model="scope.row.clientStar" />
              <span v-else>{{
                (item.formatter && item.formatter(scope.row)) ||
                scope.row[item.value] ||
                '-'
              }}</span>
            </template>
          </el-table-column>
        </el-table>
        <!-- 合并表格 订单专属-->
        <!-- v-if="props.typeName == 'order'" -->
      </div>
      <div class="marginB20" v-if="step == 4">
        <el-result
          icon="success"
          title="批量导入完成"
          sub-title="您已成功导入数据"
        >
        </el-result>
      </div>
    </div>

    <template #footer>
      <div class="flexBetween" v-if="step != 4">
        <div>
          <el-link
            type="primary"
            v-if="step == 1"
            @click="openLog"
            :underline="false"
            >导入记录</el-link
          >
        </div>
        <div class="dialog-footer">
          <div v-if="step == 1">
            <el-button @click="cancel">取消</el-button>
            <el-button type="primary" @click="nextButton(2)">下一步</el-button>
          </div>
          <div v-if="step == 2">
            <el-button @click="step = 1">重新上传</el-button>
            <el-button type="primary" @click="nextButton(3)">下一步</el-button>
          </div>
          <div v-if="step == 3">
            <el-button @click="step = 2">上一步</el-button>
            <el-button type="primary" @click="submitForm">下一步</el-button>
          </div>
        </div>
      </div>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
/**
 * 导入组件
 *  <UploadFile ref="uploadFileRef" typeName="product"/>
    const uploadFileRef: any = ref(null);
    let uploadFn = (file?: any) => {
      uploadFileRef?.value?.init();
    };
    import UploadFile from '@/components/publicModule/crmCom/uploadFile/index.vue';
 * */
import { onMounted, reactive, ref, toRefs, defineEmits } from 'vue';
import { ElForm, ElMessage, ElMessageBox } from 'element-plus';
import useStore from '@/store';
import MergeTableTemp from './tableTemp.vue';
import { uploadApi } from '@/api/uploadApi';
import { importType } from '@/api/officeManage/index';

import { useRouter, useRoute } from 'vue-router';
import { getCals } from '@/api/customTable/mixins';
import tableCalJson from './public';
const router = useRouter();
const route = useRoute();
const { user } = useStore();

const props = defineProps({
  typeName: {
    type: String,
    default: 'client'
  }
});

const dataFormRef = ref(ElForm);
const state = reactive({
  title: '',
  visible: false,
  formData: {
    clientFollowId: '', //跟进id 新增时此字段不传，更新时传此字段
    clientId: '', //客户id

    clientState: '', //客户状态 0了解产品，1正在跟进，2正在试用，3准备购买，4准备付款，5已经购买，暂时搁置
    contactUserId: '', //联系人id

    followType: 0, //跟进类型，0到访，1电话，2微信，3短信，4邮件，5QQ，6其它
    followTime: '', //跟进时间
    followContent: '', //跟进内容
    remindPeople: [], //提醒人员id，用逗号分隔开

    nextFollowTime: '', //下次跟进时间
    nextFollowContent: '', //下次跟进内容
    nextFollowUserId: '', //下次跟进人员id
    followUpReminder: '', //跟进提醒
    followUpTypes: [] //提醒方式
  } as any,
  checked1: false,
  rules: {
    nextFollowTime: [
      { required: true, message: '请选择跟进时间', trigger: 'blur' }
    ],
    nextFollowUserId: [
      { required: true, message: '请选择跟进人员', trigger: 'blur' }
    ]
  },

  options: [] as any, //部门

  clientNameList: [] as any, //客户列表
  contactUserList: [] as any, //联系人
  remindPeople: [] as any, //提醒谁看 || 归属人
  props1: {
    checkStrictly: true,
    value: 'id',
    label: 'name'
  },
  allList: [],

  tableCal: (tableCalJson as any)[props.typeName],
  fileName: '',
  uploadData: {
    result: [], //table list
    normalSize: 0,
    errorInfos: []
  } as any,
  step: 1 //当前步骤
});
// emit 子组件向父组件事件传递
const emit = defineEmits(['success']);

const { visible, tableCal, fileName, step, uploadData } = toRefs(state);
/**

 */
let init = async (type = 'customer', res: any = {}) => {
  state.visible = true;
  state.step = 1;
};

let nextButton = async (step: any) => {
  if (step == 2) {
    if (!state.fileName) {
      ElMessage.warning('请上传填好的信息表！');
      return;
    }
  }
  if (step == 3) {
    // 进入查看导入结果界面 ：只查看成功的
    // if (!state.fileName) {
    //   ElMessage.warning('请上传填好的信息表！');
    //   return;
    // }
  }

  state.step = step;
};

let getCalss = (type: any) => {
  let { step } = state;
  if (type == 1) {
    if (step == 1 || step == 2 || step == 3) {
      return 'active';
    }
  } else if (type == 2) {
    if (step == 3) {
      return 'active';
    }
  }
};

let exportFn = () => {
  let { typeName } = props;
  let item = importType.filter((v: any) => v.id == typeName)[0] || {};
  let type = item.value;
  let fileName = item.label;
  if (!type && !fileName) return;
  (window as any).fileDown(
    'fileTemplate',
    {
      type
    },
    fileName
  );
};
/**
 * 导入文件
 */
let uploadFn = (file: any) => {
  const formData = new FormData();
  formData.append('file', file);
  let { typeName } = props;
  (uploadApi as any)[typeName](formData).then((res: any) => {
    if (res.data.type == 'application/json') {
      const reader: any = new FileReader(); //创建一个FileReader实例
      reader.readAsText(res.data, 'utf-8'); //读取文件,结果用字符串形式表示
      reader.onload = function () {
        //读取完成后,**获取reader.result**
        const { data } = JSON.parse(reader.result);
        if (data) {
          state.fileName = file.name;
          //
          // data.result = data.errorInfos;
          //

          if (typeName == 'order' && data.result.length) {
            let arr: any = [];
            data.result.forEach((v: any) => {
              if (v.productInfos?.length) {
                let infoL = v.productInfos.length;
                for (let i = 0; i < infoL; i++) {
                  let params = {
                    ...v,
                    ...v.productInfos[i]
                  };
                  if (i === 0) {
                    Object.assign(params, {
                      rowspan: infoL //第一个
                    });
                  } else {
                    Object.assign(params, {
                      rowspan: 0 //非第一个
                    });
                  }
                  arr.push(params);
                }
              } else {
                arr.push({
                  ...v,
                  rowspan: 1
                });
              }
            });
            data.result = arr;
          }
          state.uploadData = data;

          ElMessage.success('上传成功');
        } else {
          ElMessage.error('上传失败');
        }
      };
    }
  });
};

async function submitForm() {
  let { typeName } = props;
  let importDataType = importType?.filter(v => v.id == typeName)[0]?.value;
  try {
    let res = await uploadApi.warehousing({
      importDataType: importDataType
    });
    ElMessage.success('导入成功！');
    state.step = 4;
    emit('success');
  } catch (err) {}
}
let openLog = () => {
  router.push({
    path: `/officeManage/importLog`
  });
};
function cancel() {
  state.visible = false;
  state.uploadData = {};
  state.fileName = '';
}

// 组件暴露自己的属性
defineExpose({ init });
</script>

<style lang="scss" scoped>
.top {
  line-height: 26px;
  font-weight: bold;
  div:nth-of-type(1) {
    background: #cccccc;
    width: 26px;
    height: 26px;
    text-align: center;
    font-size: 16px;
    color: #fff;
  }

  div:nth-of-type(2) {
    color: #666;
    font-size: 14px;
    margin-left: 15px;
  }
}
.top.active {
  div:nth-of-type(1) {
    background: #0079fe;
  }
}

.card_box {
  .left_img {
    width: 100px;
    height: 110px;
    background: #f5f5f5;
    border-right: 1px solid rgb(233, 233, 233);
  }
  .right {
    padding: 20px;
    box-sizing: border-box;
    flex-direction: column;
    align-items: flex-start;
    width: 100%;
    height: 110px;
    .tit {
      font-size: 14px;
      color: #666;
    }
    .txt {
      font-size: 12px;
      color: #999;
    }
  }
}

.err {
  color: #f95e5a;
}
.ok {
  color: #4bd863;
}

.errInfo {
  height: 200px;
  overflow: auto;
}

.fileClass {
  display: block;
  width: auto;
  flex-shrink: 0;
  margin-left: 20px;
}
</style>

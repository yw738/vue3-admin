<!--  -->
<template>
  <el-upload
    :action="uploadUrl"
    :accept="fileType"
    :headers="getToken"
    :show-file-list="false"
    :file-list="fileList"
    :before-upload="beforeAvatarUpload"
    :on-success="handleAvatarSuccess"
  >
    <el-link v-if="isShowTxtLink" type="primary" :underline="false">{{
      title
    }}</el-link>
    <el-button
      v-else-if="isPlainBool"
      plain
      icon="UploadFilled"
      type="primary"
      >{{ title }}</el-button
    >
    <el-button v-else icon="UploadFilled" type="primary">{{ title }}</el-button>
  </el-upload>
</template>

<script lang="js">
/**
 * 文件上传按钮
 */
// import { getToken, uploadUrl } from '@/utils/auth';
// import store from '@/store';
export default {
  data() {
    return {
      getToken: {
        // access_token: getToken(),
        // companyId: store.getters.companyId
      },
      fileList: [], //上传的文件列表
      isLoading: false
    };
  },
  props: {
    /**
     * 上传文件的接口 路径
     * 可选参数
     */
    uploadUrl: {
      type: String
      // default: () => uploadUrl
    },
    /**
     * 是否限制上传图片类型为图片
     * 默认     =>  true
     * 其他类型  => false
     */
    isUploadImg: {
      type: Boolean,
      default: false
    },
    /**
     * 是否禁用 || 详情
     */
    title: {
      type: String,
      default: '导入'
    },
    /**
     * .jpg,.jpeg,.png,.gif,.bmp,.pdf,.JPG,.JPEG,.PBG,.GIF,.BMP,.PDF
     */
    fileType: {
      type: String,
      default: '.xls,.xlsx'
    },
    /**
     * 是否自定义上传
     */
    isCustomUpload: {
      type: Boolean,
      default: false
    },
    /**
     * 是否展示上传的文件
    */
    isShowFile:{
      type: Boolean,
      default: false
    },
    /**
     * 按钮是否为 plain 格式
    */
    isPlainBool:{
      type: Boolean,
      default: false
    },
     /**
     * 按钮是否为 文字 格式
    */
    isShowTxtLink:{
      type: Boolean,
      default: false
    },
  },
  created() {
  },
  methods: {
    /**
     * 上传成功
     * @param {object} res 请求的参数
     * @param {object} file 本次上传的文件
     * @param {array} fileList 已上传的文件列表
     */
    handleAvatarSuccess(res, file, fileList) {
      this.isLoading = false;
      this.$message.success(`${this.title}成功！`);
      this.$emit('success', {
        res: res?.result,
        id: res?.result?.fileId
      });
    },
    /**
     * 上传前钩子
     * 验证文件类型
     * @param {object} file 当前上传的文件
     */
    beforeAvatarUpload(file) {
      if (this.isCustomUpload) {
        this.$emit('success', file);
        return false; //自定义上传
      }
      let fileName = file.name.substring(file.name.lastIndexOf('.') + 1);
      let arr = this.fileType.split(',');
      let isHas = arr.find(item => item.includes(fileName));
      if (!isHas) {
        this.$message({
          message: `上传文件只能是 ${this.fileType} 格式!`,
          type: 'warning'
        });
      } else {
        this.isLoading = true;
      }
      return Boolean(isHas);
    }
  }
};
</script>
<style lang="less" scoped></style>

<!--  -->
<template>
  <div>
    <el-upload
      :action="uploadUrl"
      :headers="getToken"
      :file-list="fileList"
      list-type="picture-card"
      :before-upload="beforeAvatarUpload"
      :on-success="handleAvatarSuccess"
      :on-preview="onPreview"
      :on-remove="handleRemove"
      :limit="limit"
      v-if="!isDisable"
    >
      <el-icon><Plus /></el-icon>
    </el-upload>
    <!-- 图片预览 -->
    <el-dialog v-model="showViewer">
      <img w-full :src="imageUrl" alt="Preview Image" />
    </el-dialog>

    <div v-if="isDisable">
      <el-image
        v-for="(item, index) in fileList"
        :key="index"
        style="width: 146px; height: 146px; margin: 0 8px 8px 0"
        :src="item.url"
        :preview-src-list="[item.url]"
      />
    </div>
  </div>
</template>

<script>
/**
 * 公共的图片上传组件
 *
 */
// import { getToken, uploadUrl } from '@/utils/auth';
// require('./fileImg.jpg')
export default {
  data() {
    return {
      showViewer: false, // 显示查看器
      getToken: {
        // access_token: getToken(),
      },
      fileList: [], //上传的文件列表
      imageUrl: '',
      defaultImg: ''
    };
  },
  props: {
    /**
     * 做文件回显的
     * 文件回显 必传
     */
    files: {
      type: Array,
      default: () => []
    },
    /**
     * 双向绑定的id list
     * 必传
     */
    fileIdList: {
      type: Array,
      default: () => []
    },
    /**
     * 上传图片文件的接口 路径
     * 可选参数
     */
    uploadUrl: {
      type: String,
      default: () => '/'
    },
    /**
     * 是否限制上传图片类型为图片
     * 默认     =>  true
     * 其他类型  => false
     */
    isUploadImg: {
      type: Boolean,
      default: true
    },
    /**
     * 是否禁用 || 详情
     */
    isDisable: {
      type: Boolean,
      default: false
    },
    /**
     * 文件的最大数量
     */
    limit: {
      type: Number,
      default: 100
    }
  },
  created() {
    if (this.files?.length) {
      this.fileList = this.setFileList(this.files);
    } else {
      this.fileList = [];
    }
  },
  watch: {
    /**
     * 详情文件回显
     */
    files(newVal) {
      if (newVal?.length) {
        this.fileList = this.setFileList(newVal);
      }
    }
  },
  methods: {
    /**
     * 非文件 替换图标
     */
    setFileList(array) {
      let arr = ['png', 'jpg', 'jpeg'];
      return array.map(item => {
        let fileType = item?.name?.split('.')?.reverse()[0] || '';
        if (arr.includes(fileType)) {
          return item;
        } else {
          return {
            ...item,
            url: this.defaultImg,
            notShow: true
          };
        }
      });
    },
    /*图片预览*/
    // 打开查看器
    onPreview(file) {
      let arr = ['png', 'jpg', 'jpeg'];
      let fileType = file?.name?.split('.')?.reverse()[0] || '';
      //判定 预览文件是否是图片
      //notShow =>true 不能预览 ，默认为false 新增的需求
      if (arr.includes(fileType) && !file.notShow) {
        this.imageUrl = file.url;
        this.showViewer = true;
      } else {
        this.$message.error('只能预览图片！');
      }
    },
    // 关闭查看器
    closeViewer() {
      this.showViewer = false;
    },
    /*图片移除*/
    handleRemove(file, fileList) {
      let fileIdArr = [];
      for (let i = 0; i < fileList.length; i++) {
        try {
          fileIdArr.push(fileList[i].response.result.fileId);
        } catch (e) {
          if (fileList[i].id) {
            fileIdArr.push(fileList[i].id);
          } else if (fileList[i].fileId) {
            fileIdArr.push(fileList[i].fileId);
          }
        }
      }
      this.fileList = JSON.parse(JSON.stringify(fileList));
      this.$emit('update:fileIdList', fileIdArr);
    },
    /**
     * 图片上传成功
     * @param {object} res 请求的参数
     * @param {object} file 本次上传的文件
     * @param {array} fileList 已上传的文件列表
     */
    handleAvatarSuccess(res, file, fileList) {
      if (!res.success) {
        this.$message.error('文件上传失败！');
        return;
      }
      let arr = JSON.parse(JSON.stringify(this.fileIdList));
      arr.push(res.result.fileId);
      this.$emit('update:fileIdList', arr);
      this.$emit('uploadSuccess', arr);
      this.fileList = JSON.parse(JSON.stringify(this.setFileList(fileList)));
    },
    /**
     * 上传前钩子
     * @param {object} file 当前上传的文件
     */
    beforeAvatarUpload(file) {
      if (!this.isUploadImg) return true;
      const isJPG = file.type === 'image/jpeg';
      const isPNG = file.type === 'image/png';
      const isLt600 = file.size / 600 < 1024;
      if (!isJPG && !isPNG) {
        this.$message.error('上传图片只能是 JPG或PNG 格式!');
      }
      if (!isLt600) {
        this.$message.error('上传图片大小不能超过 600KB!');
      }
      return (isJPG || isPNG) && isLt600;
    }
  }
};
</script>
<style lang="less" scoped></style>

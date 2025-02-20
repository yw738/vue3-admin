<template>
  <el-upload
    v-model:file-list="fileList"
    class="upload-demo"
    action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
    :on-change="handleChange"
  >
    <el-button type="primary" icon="UploadFilled">上传文件</el-button>
    <template #tip>
      <div class="el-upload__tip">
        支持格式：.rar .zip .doc .docx .pdf ，单个文件不能超过20MB
      </div>
    </template>
  </el-upload>
</template>
<script lang="ts" setup>
/**
 * 自定义的文件上传
 * 各种类型都支持
 */
import { ref } from 'vue';

import type { UploadProps, UploadUserFile } from 'element-plus';

const fileList = ref<UploadUserFile[]>([
  {
    name: 'food.jpeg',
    url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
  },
  {
    name: 'food2.jpeg',
    url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
  }
]);

const handleChange: UploadProps['onChange'] = (uploadFile, uploadFiles) => {
  fileList.value = fileList.value.slice(-3);
};
</script>

<template>
  <Upload name="file" accept="image/*" method="POST" :fileList="fileList" @update:fileList="updateFileList"
    :sizeLimit="1" @onUploadError="error=$event||'上传失败'" action="http://127.0.0.1:3000/upload"
    :parseResponse="parseResponse">
    <button>上传</button>
    <template v-slot:tips>
      <div>只能上传 xxx KB 以内的文件</div>
    </template>
  </Upload>
</template>

<script lang="ts" setup>
import { reactive, ref } from "vue";
import Upload from "../lib/Upload.vue";
import { FileType } from "../lib/Upload.vue";

const error = ref('')
const fileList = reactive<FileType[]>([]);
const parseResponse = (response: any) => {
  const object = JSON.parse(response);
  const url = `http://127.0.0.1:3000/preview/${object.id}`;
  return url;
};
const updateFileList = (value: FileType[]) => {
  Object.assign(fileList, value);
};
</script>

<style lang="scss" scoped></style>

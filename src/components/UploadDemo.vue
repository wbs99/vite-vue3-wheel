<template>
  <Upload name="file" accept="image/*" method="POST" :fileList="fileList" @update:fileList="updateFileList"
    action="http://127.0.0.1:3000/upload" :parseResponse="parseResponse">
    <button>上传</button>
  </Upload>
</template>

<script lang="ts" setup>
import { reactive } from "vue";
import Upload from "../lib/Upload.vue";
import { FileType } from "../lib/Upload.vue";

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

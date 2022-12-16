<template>
  <Upload name="file" accept="image/*,video/*" method="POST" v-model:fileList="fileList" :sizeLimit="1"
    @onUploadError="error=$event||'上传失败'" action="http://127.0.0.1:3000/upload" :parseResponse="parseResponse">
    <button>上传</button>
    <template v-slot:tips>
      <div>只能上传 xxx KB 以内的文件</div>
    </template>
  </Upload>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import Upload from "./Upload.vue";
import { FileType } from "./Upload.vue";

const error = ref('')
const fileList = ref<FileType[]>([]);
const parseResponse = (response: string) => {
  const object = JSON.parse(response);
  const url = `http://127.0.0.1:3000/preview/${object.id}`;
  return url;
};
</script>

<style lang="scss" scoped></style>

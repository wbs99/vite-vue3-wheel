<template>
  {{ fileList }}
  <div class="w-upload">
    <div @click="onClickUpload">
      <slot></slot>
    </div>
    <slot name="tips"></slot>
    <ol class="w-upload-fileList">
      <li v-for="(file, index) in fileList" :key="index">
        <template v-if="file.status === 'uploading'">
          <Loading />
        </template>
        <template v-else-if="file.type.indexOf('image') === 0">
          <img class="w-upload-image" :src="file.url" width="40" height="40" />
        </template>
        <template v-else>
          <div class="w-upload-defaultImage"></div>
        </template>
        <span class="w-upload-name" :class="{ [file.status]: file.status }">{{ file.name }}</span>
        <button @click="onRemoveFile(file)">删除</button>
      </li>
    </ol>
    <div ref="temp" style="width: 0; height: 0; overflow: hidden"></div>
  </div>
</template>

<script lang="ts" setup>
import { PropType, ref } from "vue";
import Loading from '../Loading.vue'

export interface FileType {
  name: string;
  size: string;
  type: string;
  url?: string;
  status: string;
}

const props = defineProps({
  name: {
    type: String,
    required: true,
  },
  action: {
    type: String,
    required: true,
  },
  method: {
    type: String,
    default: "POST",
  },
  accept: {
    type: String,
    default: 'image/*'
  },
  parseResponse: {
    type: Function,
    required: true,
  },
  fileList: {
    type: Array as PropType<FileType[]>,
    default: () => [],
  },
  sizeLimit: {
    type: Number,
    default: 2
  }

});
const emit = defineEmits(["update:fileList", 'onUploadError', 'addFile',]);
const temp = ref<HTMLElement | null>(null);

const createInput = () => {
  temp.value!.innerHTML = ''
  const input = document.createElement("input");
  input.type = "file";
  input.multiple = true
  input.accept = props.accept
  temp.value?.appendChild(input);
  return input;
};
const onClickUpload = () => {
  const input = createInput();
  input.addEventListener("change", () => {
    uploadFiles(input.files);
    input.remove();
  });
  input.click();
};
const uploadFiles = (rawFiles: any) => {
  const newNames = []
  for (let i = 0; i < rawFiles.length; i++) {
    const rawFile = rawFiles[i]
    const { name } = rawFile;
    const newName = generateName(name);
    newNames[i] = newName
  }
  if (!beforeUploadFiles(rawFiles, newNames)) { return }
  for (let i = 0; i < rawFiles.length; i++) {
    const rawFile = rawFiles[i]
    const newName = newNames[i]
    const formData = new FormData();
    formData.append(props.name, rawFile);
    uploadAjax(
      formData,
      (response: any) => {
        const url = props.parseResponse(response);
        afterUploadFile(rawFile, newName, url)
      },
      (xhr: XMLHttpRequest) => {
        uploadError(xhr, newName)
      }
    );
  }
};
const beforeUploadFiles = (rawFiles: FileType[], newNames: string[]) => {
  rawFiles = Array.from(rawFiles)
  for (let i = 0; i < rawFiles.length; i++) {
    const { size } = rawFiles[i]
    if (parseFloat(size) > props.sizeLimit * 1024 * 1024) {
      emit('onUploadError', `文件大于 ${props.sizeLimit / 1024 / 1024} MB`)
      return false
    }
  }
  const x = rawFiles.map((rawFile, index) => (
    { name: newNames[index], size: rawFile.size, type: rawFile.type, status: "uploading" }
  ))
  emit('update:fileList', [...props.fileList, ...x])
  return true
};
const uploadAjax = (formData: any, success: Function, fail: Function) => {
  const xhr = new XMLHttpRequest();
  xhr.open(props.method, props.action);
  xhr.onload = () => {
    success(xhr.response)
  };
  xhr.onerror = () => {
    fail(xhr)
  }
  xhr.send(formData);
};
const afterUploadFile = (rawFile: FileType, newName: string, url: string) => {
  const file = props.fileList.find(file => file.name === newName)
  const fileIndex = props.fileList.findIndex(file => file.name === newName)
  const tempFile = JSON.parse(JSON.stringify(file))
  const tempFileList = JSON.parse(JSON.stringify(props.fileList))
  tempFile.url = url
  tempFile.status = 'success'
  tempFileList.splice(fileIndex, 1, tempFile)
  emit("update:fileList", tempFileList);
};
const uploadError = (xhr: XMLHttpRequest, newName: string) => {
  const file = props.fileList.find(file => file.name === newName)
  const fileIndex = props.fileList.findIndex(file => file.name === newName)
  const tempFile = JSON.parse(JSON.stringify(file))
  const tempFileList = JSON.parse(JSON.stringify(props.fileList))
  tempFile.status = 'fail'
  tempFileList.splice(fileIndex, 1, tempFile)
  emit("update:fileList", tempFileList);
  let error = ''
  if (xhr.status === 0) {
    error = '网络无法连接'
  }
  emit('onUploadError', error)
}
const onRemoveFile = (file: FileType) => {
  const fileIndex = props.fileList.indexOf(file);
  props.fileList.splice(fileIndex, 1);
  emit("update:fileList", props.fileList);
};
// 处理多次上传同名图片名称重复问题
const generateName = (name: string) => {
  while (props.fileList.find((file) => file.name === name)) {
    const dotIndex = name.lastIndexOf(".");
    const nameWithoutExtension = name.substring(0, dotIndex);
    const extension = name.substring(dotIndex);
    name = `${nameWithoutExtension}(1)${extension}`;
  }
  return name;
};
</script>

<style lang="scss" scoped>
.w-upload{
  &-fileList{
    list-style: none;
    >li{
      display: flex;
      align-items: center;
      margin: 8px 0;
      padding: 8px;
      background-color: #f7f8fa;
    }
  }
  &-defaultImage{
    width: 32px;
    height: 32px;
  }
  &-image{
    margin-right: 20px;
  }
  &-name{
    margin-right: auto;
    &.success{
      color: green;
    }
    &.fail{
      color: red;
    }
  }
}
</style>
<template>
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
import Loading from '../components/Loading.vue'

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
const emit = defineEmits(["update:fileList", 'onUploadError']);
const temp = ref<HTMLElement | null>(null);

const createInput = () => {
  temp.value!.innerHTML = ''
  const input = document.createElement("input");
  input.type = "file";
  temp.value?.appendChild(input);
  return input;
};
const onClickUpload = () => {
  const input = createInput();
  input.addEventListener("change", () => {
    const file = input.files![0];
    uploadFile(file);
    input.remove();
  });
  input.click();
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

const onRemoveFile = (file: FileType) => {
  const fileCopyList = props.fileList;
  const fileIndex = fileCopyList.indexOf(file);
  fileCopyList.splice(fileIndex, 1);
  emit("update:fileList", fileCopyList);
};
const beforeUploadFile = (rawFile: FileType, newName: string) => {
  let { size, type } = rawFile;
  if (parseFloat(size) > props.sizeLimit * 1024 * 1024) {
    emit('onUploadError', `文件大于 ${props.sizeLimit / 1024 / 1024} MB`)
    return false
  } else {
    emit("update:fileList", [...props.fileList, { name: newName, size, type, status: "uploading" }]);
    return true
  }
};
const afterUploadFile = (rawFile: FileType, newName: string, url: string) => {
  const file = props.fileList.find(file => file.name === newName)
  const tempFile = JSON.parse(JSON.stringify(file))
  const fileIndex = props.fileList.indexOf(tempFile)
  tempFile.url = url
  tempFile.status = 'success'
  const tempFileList = JSON.parse(JSON.stringify(props.fileList))
  tempFileList.splice(fileIndex, 1, tempFile)
  emit("update:fileList", tempFileList);
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
const uploadFile = (rawFile: any) => {
  let { name } = rawFile;
  const newName = generateName(name);
  beforeUploadFile(rawFile, newName)
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
};
const uploadError = (xhr: XMLHttpRequest, newName: string) => {
  const file = props.fileList.find(file => file.name === newName)
  const tempFile = JSON.parse(JSON.stringify(file))
  const fileIndex = props.fileList.indexOf(tempFile)
  tempFile.status = 'fail'
  const tempFileList = JSON.parse(JSON.stringify(props.fileList))
  tempFileList.splice(fileIndex, 1, tempFile)
  emit("update:fileList", tempFileList);
  let error = ''
  if (xhr.status === 0) {
    error = '网络无法连接'
  }
  emit('onUploadError', error)
}

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

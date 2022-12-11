<template>
  {{ fileList }}
  <div class="w-upload">
    <div @click="onClickUpload">
      <slot></slot>
    </div>
    <div ref="temp" style="width: 0; height: 0; overflow: hidden"></div>
    <ol>
      <li v-for="(file, index) in fileList" :key="index">
        <template v-if="file.status === 'uploading'">菊花</template>
        <img :src="file.url" width="100" height="100" />
        {{ file.name }}
        <button @click="onRemoveFile(file)">删除</button>
      </li>
    </ol>
  </div>
</template>

<script lang="ts" setup>
import { PropType, ref } from "vue";

export interface FileType {
  name: string;
  size: string;
  type: string;
  url?: string;
  status?: "uploading";
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
});
const emit = defineEmits(["update:fileList"]);
const temp = ref<HTMLElement | null>(null);

const createInput = () => {
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
  emit("update:fileList", [...props.fileList, { name: newName, size, type, status: "uploading" }]);
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
const doUploadFile = (formData: any, success: Function, fail: Function) => {
  const xhr = new XMLHttpRequest();
  xhr.open(props.method, props.action);
  xhr.onload = (response) => {
    //success(xhr.response);
    fail()
  };
  xhr.send(formData);
};
const uploadFile = (rawFile: any) => {
  let { name } = rawFile;
  const newName = generateName(name);
  beforeUploadFile(rawFile, newName)
  const formData = new FormData();
  formData.append(props.name, rawFile);
  doUploadFile(
    formData,
    (response: any) => {
      const url = props.parseResponse(response);
      afterUploadFile(rawFile, newName, url)
    },
    () => {
      uploadError(newName)
    }
  );
};
const uploadError = (newName: string) => {
  const file = props.fileList.find(file => file.name === newName)
  const tempFile = JSON.parse(JSON.stringify(file))
  const fileIndex = props.fileList.indexOf(tempFile)
  tempFile.status = 'fail'
  const tempFileList = JSON.parse(JSON.stringify(props.fileList))
  tempFileList.splice(fileIndex, 1, tempFile)
  emit("update:fileList", tempFileList);
}

</script>

<style lang="scss" scoped></style>

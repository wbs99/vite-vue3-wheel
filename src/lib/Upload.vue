<template>
  <div class="w-upload">
    <div @click="onClickUpload">
      <slot></slot>
    </div>
    <div ref="temp" style="width: 0; height: 0; overflow: hidden"></div>
    <ol>
      <li v-for="(file, index) in fileList" :key="index">
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
  url: string;
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
const imgRef = ref("");

const onClickUpload = () => {
  const input = createInput();
  input.addEventListener("change", () => {
    const file = input.files![0];
    uploadFile(file);
    input.remove();
  });
  input.click();
};

const createInput = () => {
  const input = document.createElement("input");
  input.type = "file";
  temp.value?.appendChild(input);
  return input;
};

const uploadFile = (file: File) => {
  const formData = new FormData();
  formData.append(props.name, file);
  let { name, size, type } = file;
  doUploadFile(formData, (response: any) => {
    const url = props.parseResponse(response);
    imgRef.value = url;
    // 处理多次上传同名图片名称重复问题
    while (props.fileList.find((file) => file.name === name)) {
      const dotIndex = name.lastIndexOf(".");
      const nameWithoutExtension = name.substring(0, dotIndex);
      const extension = name.substring(dotIndex);
      name = `${nameWithoutExtension}(1)${extension}`;
    }
    emit("update:fileList", [...props.fileList, { name, size, type, url }]);
  });
};
const doUploadFile = (formData: any, success: Function) => {
  const xhr = new XMLHttpRequest();
  xhr.open(props.method, props.action);
  xhr.onload = (response) => {
    success(xhr.response);
  };
  xhr.send(formData);
};
const onRemoveFile = (file: FileType) => {
  const fileCopyList = props.fileList;
  const fileIndex = fileCopyList.indexOf(file);
  fileCopyList.splice(fileIndex, 1);
  emit("update:fileList", fileCopyList);
};
</script>

<style lang="scss" scoped></style>

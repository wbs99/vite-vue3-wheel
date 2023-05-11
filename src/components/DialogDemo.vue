<template>
  <div>
    <Dialog v-model:visible="dialogVisible" :isOverlayCloseable="isOverlayCloseable" @onConfirm="onConfirm"
      @onClose="onClose">
      <template v-slot:title>
        <div class="title">
          <strong>加粗的标题</strong>
        </div>
      </template>
      <template v-slot:content>
        <strong>加粗的内容</strong>
        <div>普通的内容</div>
      </template>
    </Dialog>
    <Button @click="openDialog">打开 dialog</Button>
  </div>
</template>

<script lang="ts" setup>
import Dialog from "../lib/Dialog.vue";
import Button from "../lib/Button.vue";
import { ref } from "vue";

const dialogVisible = ref(false)
const openDialog = () => {
  dialogVisible.value = true
};

const isOverlayCloseable = ref(false)

const onClose = () => {
  console.log('关闭')
}
const onConfirm = () => {
  console.log('确定')
}
</script>

<style lang="scss" scoped></style>

<template>
  <div>
    <Dialog v-model:visible="x" :isOverlayCloseable="y">
      <template v-slot:title>
        <strong>加粗的标题</strong>
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

const x = ref(false);
const openDialog = () => {
  x.value = true;
};

const y = ref(true);
</script>

<style lang="scss" scoped></style>

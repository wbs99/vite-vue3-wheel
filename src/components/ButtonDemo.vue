<template>
  <div>
    <Button @click="onClick" @mouseover="onMouseOver" size="size">
      你好啊
    </Button>
  </div>
</template>

<script lang="ts" setup>
import Button from "../lib/Button.vue";

const onClick = () => {
  console.log("button 被点击了");
};
const onMouseOver = () => {
  console.log("鼠标悬浮");
};
</script>

<style lang="scss" scoped></style>

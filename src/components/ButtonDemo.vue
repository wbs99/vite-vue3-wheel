<template>
  <div>
    <Button @click="onClick" @mouseover="onMouseOver"> 你好啊 </Button>
    <Button @click="onClick" @mouseover="onMouseOver" theme="button">
      你好啊
    </Button>
    <Button @click="onClick" @mouseover="onMouseOver" theme="text">
      你好啊
    </Button>
    <Button @click="onClick" @mouseover="onMouseOver" theme="link">
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

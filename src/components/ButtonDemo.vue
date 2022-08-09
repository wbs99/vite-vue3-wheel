<template>
  <div class="wrapper">
    <div>
      基本用法
      <br />
      <Button @click="onClick" @mouseover="onMouseOver" theme="primary">
        Primary
      </Button>
      <Button @click="onClick" @mouseover="onMouseOver"> Secondary </Button>
      <Button @click="onClick" @mouseover="onMouseOver" theme="dashed">
        Dashed
      </Button>
      <Button @click="onClick" @mouseover="onMouseOver" theme="outline">
        outline
      </Button>
      <Button @click="onClick" @mouseover="onMouseOver" theme="text">
        text
      </Button>
    </div>
    <div>
      按钮尺寸 primary
      <br />
      <Button
        @click="onClick"
        @mouseover="onMouseOver"
        theme="primary"
        size="mini"
      >
        mini
      </Button>
      <Button
        @click="onClick"
        @mouseover="onMouseOver"
        theme="primary"
        size="small"
      >
        small
      </Button>
      <Button
        @click="onClick"
        @mouseover="onMouseOver"
        theme="primary"
        size="medium"
      >
        medium
      </Button>
      <Button
        @click="onClick"
        @mouseover="onMouseOver"
        theme="primary"
        size="large"
      >
        large
      </Button>
    </div>
    <div>
      按钮尺寸 dashed
      <br />
      <Button
        @click="onClick"
        @mouseover="onMouseOver"
        theme="dashed"
        size="mini"
      >
        mini
      </Button>
      <Button
        @click="onClick"
        @mouseover="onMouseOver"
        theme="dashed"
        size="small"
      >
        small
      </Button>
      <Button
        @click="onClick"
        @mouseover="onMouseOver"
        theme="dashed"
        size="medium"
      >
        medium
      </Button>
      <Button
        @click="onClick"
        @mouseover="onMouseOver"
        theme="dashed"
        size="large"
      >
        large
      </Button>
    </div>
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

<style lang="scss" scoped>
.wrapper {
  display: flex;
  flex-direction: column;
  > div {
    margin-bottom: 24px;
  }
}
</style>

<template>
  <button :class="{ checked: isChecked }" @click="toggle"><span></span></button>
</template>

<script lang="ts" setup>
import { ref } from "vue";

const isChecked = ref(false);
const toggle = () => {
  isChecked.value = !isChecked.value;
};
</script>

<style lang="scss" scoped>
button {
  min-width: 40px;
  height: 24px;
  line-height: 24px;
  border: none;
  border-radius: 12px;
  cursor: pointer;
  background: #c9cdd4;
  position: relative;
  > span {
    position: absolute;
    top: 4px;
    left: 4px;
    width: 16px;
    height: 16px;
    border-radius: 50%;
    background: #ffffff;
    transition: all 0.2s cubic-bezier(0.34, 0.69, 0.1, 1);
  }
  &.checked {
    background: #165dff;
    > span {
      left: calc(100% - 20px);
    }
  }
}
</style>

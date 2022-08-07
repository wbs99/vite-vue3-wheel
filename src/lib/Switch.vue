<template>
  <button :class="{ checked: props.isChecked }" @click="toggle">
    <span></span>
  </button>
  <div>{{ props.isChecked }}</div>
</template>

<script lang="ts" setup>
const props = defineProps({
  isChecked: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(["update:isChecked"]);

const toggle = () => {
  emit("update:isChecked", !props.isChecked);
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

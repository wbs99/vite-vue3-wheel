<template>
  <button :class="[{ checked: isChecked }, type]" @click="toggle">
    <span :class="[type]"> </span>
  </button>
  <div>{{ props.isChecked }}</div>
</template>

<script lang="ts" setup>
const props = defineProps({
  isChecked: {
    type: Boolean,
    default: false,
  },
  type: {
    type: String,
    default: "circle",
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
  &.round {
    border-radius: 0;
  }
  > span {
    position: absolute;
    top: 4px;
    left: 4px;
    width: 16px;
    height: 16px;
    border-radius: 50%;
    background: #ffffff;
    transition: all 0.2s cubic-bezier(0.34, 0.69, 0.1, 1);
    &:active {
      width: 20px;
    }
    &.round {
      border-radius: 0;
    }
  }
  &.checked {
    background: #165dff;
    > span {
      left: calc(100% - 20px);
      &:active {
        width: 20px;
        margin-left: -4px;
      }
    }
  }
}
</style>

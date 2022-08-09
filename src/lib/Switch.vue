<template>
  <div>
    <button
      class="w-switch"
      :class="[{ 'w-checked': isChecked }, type]"
      :disabled="disabled"
      @click="toggle"
      ref="buttonRef"
    >
      <span :class="[type]" v-if="type !== 'line'"> </span>
    </button>
    <div>{{ props.isChecked }}</div>
    <!-- <div>传入的值 {{ props.value }}</div> -->
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref, watch } from "vue";

const props = defineProps({
  isChecked: {
    type: Boolean,
    default: false,
  },
  type: {
    type: String,
    default: "circle",
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  checkedValue: {
    type: [String, Number],
  },
  uncheckedValue: {
    type: [String, Number],
  },
  value: {
    type: [String, Number, Boolean],
    default: "",
  },
  checkedColor: {
    type: String,
    default: "",
  },
  uncheckedColor: {
    type: String,
    default: "",
  },
});

const buttonRef = ref();
const emit = defineEmits(["update:isChecked", "updated:value"]);

const toggle = () => {
  emit("update:isChecked", !props.isChecked);
  if (props.value !== undefined || props.value !== null) {
    props.isChecked
      ? emit("updated:value", props.uncheckedValue)
      : emit("updated:value", props.checkedValue);
  } else {
    console.log("没有传 value");
  }
};
onMounted(() => {
  !props.isChecked
    ? emit("updated:value", props.uncheckedValue)
    : emit("updated:value", props.checkedValue);

  if (props.checkedColor || props.uncheckedColor) {
    buttonRef.value.style.backgroundColor = props.isChecked
      ? props.checkedColor
      : props.uncheckedColor;
  }
});
watch(
  () => props.isChecked,
  isChecked => {
    if (props.checkedColor || props.uncheckedColor) {
      buttonRef.value.style.backgroundColor = isChecked
        ? props.checkedColor
        : props.uncheckedColor;
    }
  }
);
</script>

<style lang="scss">
.w-switch {
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
  &.line {
    height: 6px;
    line-height: 6px;
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
    &.line {
      top: -4px;
    }
  }
  &.line::after {
    content: "";
    position: absolute;
    top: 2px;
    left: 0;
    width: 20px;
    height: 20px;
    border-radius: 10px;
    transform: translateY(-50%);
    background-color: #ffffff;
    transition: all 0.2s cubic-bezier(0.34, 0.69, 0.1, 1);
    box-shadow: 0 0 2px 2px rgba(134, 144, 156, 0.2);
  }
  &.w-checked {
    background: #165dff;
    > span {
      left: calc(100% - 20px);
      &:active {
        width: 20px;
        margin-left: -4px;
      }
    }
    &.line::after {
      content: "";
      position: absolute;
      top: 2px;
      left: calc(100% - 18px);
      width: 20px;
      height: 20px;
      border-radius: 10px;
      transform: translateY(-50%);
      box-shadow: 0 0 2px 2px rgba(134, 144, 156, 0.2);
    }
    &[disabled] {
      background-color: #94bfff;
      span {
        &:active {
          margin-left: 0;
          width: 16px;
        }
      }
    }
  }
  &[disabled] {
    background-color: #f2f3f5;
    cursor: not-allowed;
  }
}
</style>

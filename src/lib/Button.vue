<template>
  <button class="w-button" :class="classes" :disabled="disabled">
    <span v-if="loading" class="w-loadingIndicator"></span>
    <slot />
  </button>
</template>

<script lang="ts" setup>
import { computed } from "vue";

const props = defineProps({
  theme: {
    type: String,
    default: "primary",
  },
  size: {
    type: String,
    default: "normal",
  },
  status: {
    type: String,
    default: "level",
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  loading: {
    type: Boolean,
    default: false,
  },
});

const classes = computed(() => {
  const { theme, size, status: level, disabled, loading } = props;
  return {
    [`w-theme-${theme}`]: true,
    [`w-size-${size}`]: true,
    [`w-level-${level}`]: true,
    "w-disabled": disabled,
    "w-loading": loading,
  };
});
</script>

<style lang="scss">
.w-button {
  box-sizing: border-box;
  height: 32px;
  padding: 0 14px;
  cursor: pointer;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  white-space: nowrap;
  background-color: #f2f3f5;
  color: #4e5969;
  border: 1px solid #d9d9d9;
  border-radius: 2px;
  //box-shadow: 0 1px 0 fade-out(black, 0.95);
  transition: background 250ms;
  position: relative;
  overflow: hidden;
  & + & {
    margin-left: 8px;
  }
  &:after {
    content: "";
    display: block;
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    pointer-events: none;
    background-image: radial-gradient(circle, #666 10%, transparent 10%);
    background-repeat: no-repeat;
    background-position: 50%;
    transform: scale(10, 10);
    opacity: 0;
    transition: 0.3s, opacity 0.5s;
  }
  &:active:after {
    transform: scale(0, 0);
    opacity: 0.3;
    transition: 0s;
  }
  &:hover,
  &:focus {
    background-color: #e5e6eb;
  }
  &:focus {
    outline: none;
  }
  &::-moz-focus-inner {
    border: 0;
  }
  &.w-theme-link {
    box-shadow: none;
    color: black;
    border: 1px solid #d9d9d9;
    &:hover,
    &:focus {
      color: #1313ff;
      border-color: #1313ff;
    }
    &.w-level-danger {
      color: red;
      &:hover,
      &:focus {
        color: darken(red, 10%);
      }
    }
  }

  &.w-theme-button {
    &.w-level-main {
      background: blue;
      color: white;
      border-color: blue;
      &:hover,
      &:focus {
        background: darken(blue, 10%);
        border-color: darken(blue, 10%);
      }
    }
    &.w-level-danger {
      background: red;
      color: white;
      border-color: red;
      &:hover,
      &:focus {
        background: darken(red, 10%);
        border-color: darken(red, 10%);
      }
    }
    &.w-level-warning {
      background: #ffce3d;
      color: white;
      border-color: #ffce3d;
      &:hover,
      &:focus {
        background: darken(#ffce3d, 10%);
        border-color: darken(#ffce3d, 10%);
      }
    }
    &.w-level-success {
      background: #00a854;
      color: white;
      border-color: #00a854;
      &:hover,
      &:focus {
        background: darken(#00a854, 10%);
        border-color: darken(#00a854, 10%);
      }
    }
  }
  &.w-theme-button {
    &[disabled] {
      cursor: not-allowed;
      color: grey;

      &:hover {
        border-color: #d9d9d9;
      }
    }
  }
  &.w-theme-link,
  &.w-theme-text {
    &[disabled] {
      cursor: not-allowed;
      color: grey;
      &:hover {
        border: none;
        background: none;
      }
    }
  }
  &.w-theme-primary {
    background-color: #165dff;
    color: #ffffff;
    border: 1px solid transparent;
    &:hover,
    &:focus {
      background-color: #5381ec;
    }
  }
  &.w-theme-dashed {
    background-color: #f2f3f5;
    color: #4e5969;
    border: 1px dashed #d9d9d9;
    &:hover,
    &:focus {
      background-color: #e5e6eb;
    }
  }
  &.w-theme-outline {
    background-color: transparent;
    color: #165dff;
    border: 1px solid #165dff;
  }
  &.w-theme-text {
    border: none;
    color: #165dff;
    background-color: transparent;
    &:hover {
      color: #1313ff;
      border-color: #1313ff;
      background-color: #f2f3f5;
    }
    &:active {
      background-color: transparent;
    }
    &.w-level-main {
      color: blue;
      &:hover,
      &:focus {
        color: darken(blue, 10%);
      }
    }
    &.w-level-danger {
      color: red;
      &:hover,
      &:focus {
        color: darken(red, 10%);
      }
    }
  }
  &.w-size-mini {
    height: 24px;
    padding: 0 11px;
    font-size: 12px;
  }
  &.w-size-small {
    height: 28px;
    padding: 0 15px;
    font-size: 14px;
  }
  &.w-size-medium {
    height: 32px;
    padding: 0 15px;
    font-size: 14px;
  }
  &.w-size-large {
    height: 36px;
    padding: 0 19px;
    font-size: 14px;
  }

  > .w-loadingIndicator {
    width: 14px;
    height: 14px;
    display: inline-block;
    margin-right: 4px;
    border-radius: 8px;
    border-color: blue blue blue transparent;
    border-style: solid;
    border-width: 2px;
    animation: w-loading 1s infinite linear;
  }
}
@keyframes w-loading {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>

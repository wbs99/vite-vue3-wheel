<template>
  <template v-if="visible">
    <Teleport to="body">
      <div class="w-dialog-overlay" @click="onClickOverlay"></div>
      <div class="w-dialog-wrapper">
        <div class="w-dialog">
          <header>
            <slot name="title"></slot>
            <div class="w-dialog-close" @click="close"></div>
          </header>
          <main>
            <slot name="content"> </slot>
          </main>
          <footer>
            <Button @click="close" theme="dashed">取消</Button>
            <Button @click="onConfirm">确定</Button>
          </footer>
        </div>
      </div>
    </Teleport>
  </template>
</template>

<script lang="ts" setup>
import Button from "./Button.vue";

const props = defineProps({
  visible: {
    type: Boolean,
    default: false,
  },
  isOverlayCloseable: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits(["update:visible", 'onClose', 'onConfirm'])

const close = () => {
  emit("update:visible", false)
  emit('onClose')
};
const onClickOverlay = () => {
  if (props.isOverlayCloseable) {
    close()
  }
}
const onConfirm = () => {
  emit("update:visible", false)
  emit('onConfirm')
}
</script>

<style lang="scss" scoped>
.w-dialog {
  background: white;
  min-width: 30em;
  max-width: 90%;
  border-radius: 6px;

  &-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: fade-out(black, 0.7);
    z-index: 10;
  }

  &-wrapper {
    position: fixed;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    z-index: 11;
  }

  >header {
    padding: 12px 16px;
    font-size: 18px;
    border-bottom: 1px solid #d9d9d9;
    border-radius: 6px 6px 0 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  >main {
    padding: 12px 16px;
  }

  >footer {
    border-top: 1px solid #d9d9d9;
    padding: 12px 16px;
    text-align: right;
  }

  &-close {
    position: relative;
    display: inline-block;
    width: 16px;
    height: 16px;
    cursor: pointer;

    &::before,
    &::after {
      content: "";
      position: absolute;
      background: black;
      top: 50%;
      left: 50%;
      height: 1px;
      width: 100%;
    }

    &::before {
      transform: translate(-50%, -50%) rotate(-45deg);
    }

    &::after {
      transform: translate(-50%, -50%) rotate(45deg);
    }
  }
}
</style>

<template>
  <div :size="size">
    <button :="rest">
      <slot />
    </button>
  </div>
</template>

<script lang="ts">
export default {
  inheritAttrs: false,
};
</script>
<script lang="ts" setup>
import { useAttrs } from "vue";
const { size, ...rest } = useAttrs();
</script>

<style lang="scss" scoped>
div {
  border: 1px solid red;
}
</style>

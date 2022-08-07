<template>
  <div>
    <router-view></router-view>
  </div>
</template>

<script lang="ts" setup>
import { provide, ref } from "vue";
import router from "./router";

const width = document.documentElement.clientWidth;
const asideVisible = ref(width > 500);
provide("asideVisible", asideVisible);
router.afterEach(() => {
  if (width <= 500) {
    asideVisible.value = false;
  }
});
</script>

<style lang="scss" scoped></style>

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

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>

<template>
  <div>
    <router-view></router-view>
  </div>
</template>

<script lang="ts" setup>
import { provide, ref } from "vue";

const asideVisible = ref(true);
provide("asideVisible", asideVisible);
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

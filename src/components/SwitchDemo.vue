<template>
  <div>
    <Switch v-model:isChecked="value" />
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import Switch from "../lib/Switch.vue";

const value = ref(false);
</script>

<style lang="scss" scoped></style>

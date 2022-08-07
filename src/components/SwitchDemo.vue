<template>
  <div>
    <Switch v-model:isChecked="value" />
    <Switch v-model:isChecked="value" :type="type" />
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import Switch from "../lib/Switch.vue";

const value = ref(false);
const type = ref("round");
</script>

<style lang="scss" scoped></style>

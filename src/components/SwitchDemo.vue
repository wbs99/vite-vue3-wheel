<template>
  <div>
    <Switch v-model:isChecked="value" disabled />
    <Switch v-model:isChecked="value" :type="type" />
    <Switch v-model:isChecked="value" :type="type2" />
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import Switch from "../lib/Switch.vue";

const value = ref(true);
const type = ref("round");
const type2 = ref("line");
</script>

<style lang="scss" scoped></style>

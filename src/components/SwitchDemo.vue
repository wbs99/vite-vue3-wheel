<template>
  <div>
    <Switch :isChecked="value" @update:is-checked="onCheckedChange" />
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import Switch from "../lib/Switch.vue";

const value = ref(false);

const onCheckedChange = (x: boolean) => {
  value.value = x;
};
</script>

<style lang="scss" scoped></style>

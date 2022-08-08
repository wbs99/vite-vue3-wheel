<template>
  <div>
    <Switch v-model:isChecked="value" disabled />
    <Switch
      v-model:isChecked="value"
      :type="roundType"
      checked-value="true"
      unchecked-value="false"
      :value="value2"
      @updated:value="onUpdateValue"
    />
    <Switch v-model:isChecked="value" :type="lineType" />
    <Switch
      v-model:isChecked="value"
      checked-color="#F53F3F"
      unchecked-color="#14C9C9"
    />
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import Switch from "../lib/Switch.vue";

const value = ref(true);
const roundType = ref("round");
const lineType = ref("line");
const value2 = ref<number | string | boolean>("");
const onUpdateValue = (xxx: number | string | boolean) => {
  value2.value = xxx;
};
</script>

<style lang="scss" scoped></style>

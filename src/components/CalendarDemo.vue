<template>
  <div>
    日历组件
    <Calendar :defaultDate="xxx" />
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue"
import Calendar from "../lib/Calendar.vue"

const xxx = ref("")
</script>

<style lang="scss" scoped></style>

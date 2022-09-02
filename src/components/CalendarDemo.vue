<template>
  <div class="wrapper">
    <div>
      <span>第一天是星期天</span>
      <Calendar :defaultDate="xxx" :dayStartOfWeek="0" />
    </div>
    <div>
      <span>第一天是星期一</span>
      <Calendar :defaultDate="xxx" :dayStartOfWeek="1" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue"
import Calendar from "../lib/Calendar.vue"

const xxx = ref("")
</script>

<style lang="scss" scoped>
.wrapper {
  display: flex;
  > div {
    margin-right: 128px;
    > span {
      display: inline-block;
      padding-bottom: 24px;
    }
  }
}
</style>

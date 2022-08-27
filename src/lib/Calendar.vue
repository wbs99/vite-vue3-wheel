<template>
  <div class="w-calendar-wrapper">
    <div class="w-calendar-header">2022 年 8 月</div>
    <div class="w-calendar-main">
      <ul class="w-calendar-main-week">
        <li>一</li>
        <li>二</li>
        <li>三</li>
        <li>四</li>
        <li>五</li>
        <li>六</li>
        <li>日</li>
      </ul>
      <ul class="w-calendar-main-month">
        <li v-for="(item, index) in monthList" :key="index">
          {{ item }}
        </li>
      </ul>
    </div>
    <div class="w-calendar-footer">今天</div>
  </div>
</template>

<script lang="ts" setup>
import { reactive } from "vue"

const monthList = reactive<number[]>([])
for (let i = 0; i < 42; i++) {
  monthList.push(i)
}
</script>

<style lang="scss" scoped>
.w-calendar-wrapper {
  border: 1px solid #f2f3f5;
  max-width: 264px;
  padding: 16px 8px;

  > .w-calendar-header {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  > .w-calendar-main {
    > .w-calendar-main-week {
      display: flex;
      > li {
        width: 14.2857%;
        text-align: center;
        height: 42px;
        line-height: 42px;
      }
    }
    > .w-calendar-main-month {
      display: flex;
      flex-wrap: wrap;
      > li {
        width: 14.2857%;
        text-align: center;
        height: 42px;
        line-height: 42px;
        cursor: pointer;
        border-radius: 4px;
        &:hover {
          background: #e8f3ff;
          color: #165dff;
        }
      }
    }
  }
  > .w-calendar-footer {
    display: flex;
    justify-content: center;
  }
}
</style>

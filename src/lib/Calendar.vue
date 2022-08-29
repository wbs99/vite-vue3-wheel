<template>
  <div class="w-calendar-wrapper">
    <div class="w-calendar-header">{{ currentTime }}</div>
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
        <li
          v-for="(item, index) in state.monthList"
          :key="index"
          :class="{
            prevMonth: item.prevDay,
            currentMonth: item.currentDay,
            nextDay: item.nextDay,
            today: item.today,
            selectedDay: item.selectedDay,
          }"
          @click="onDayClick(item)"
        >
          {{ item.date }}
        </li>
      </ul>
    </div>
    <div class="w-calendar-footer">
      <span @click="onPrevMonthClick">上个月</span>
      <span @click="onBackToday">今天</span>
      <span @click="onNextMonthClick">下个月</span>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, reactive, ref } from "vue"
import dayjs from "dayjs"

interface dateType {
  date: string | number
  prevDay?: boolean
  nextDay?: boolean
  currentDay?: boolean
  today?: boolean
  selectedDay?: boolean
}

const props = defineProps({
  defaultDate: {
    type: String,
    default: "",
  },
})

const state = reactive({
  monthList: [] as dateType[],
})
const count = ref(0)
const currentTime = ref("")

const rendTime = (time: string) => {
  const today = dayjs(time).format("YYYY-MM-DD")
  console.log(time)

  console.log()

  const firstDayOfMonth = dayjs(time).startOf("month")
  const firstDayOfWeek = dayjs(firstDayOfMonth).day()

  // 计算当月多少天
  for (let i = 1; i <= dayjs(firstDayOfMonth).daysInMonth(); i++) {
    // 判断是不是今天
    if (
      `${time}-${i}` === dayjs(new Date()).format("YYYY-MM-DD") ||
      `${time}-${i}` === dayjs(new Date()).format("YYYY-MM-D")
    ) {
      state.monthList.push({ date: i, currentDay: true, today: true })
    } else {
      state.monthList.push({ date: i, currentDay: true })
    }

    count.value += 1
  }
  // 计算前面需要铺垫多少天
  if (firstDayOfWeek === 0) {
    for (let i = 1; i < 7; i++) {
      state.monthList.unshift({
        date: dayjs(firstDayOfMonth)
          .startOf("month")
          .subtract(i, "day")
          .format("DD"),
        prevDay: true,
      })
      count.value += 1
    }
  } else {
    for (let i = 1; i < firstDayOfWeek; i++) {
      state.monthList.unshift({
        date: dayjs(firstDayOfMonth)
          .startOf("month")
          .subtract(i, "day")
          .format("DD"),
        prevDay: true,
      })
      count.value += 1
    }
  }
  // 计算后面需要铺垫多少天
  for (let i = 1; i <= 42 - count.value; i++) {
    state.monthList.push({
      date: dayjs(firstDayOfMonth).endOf("month").add(i, "day").format("D"),
      nextDay: true,
    })
  }
  count.value = 0
}

const onNextMonthClick = () => {
  state.monthList = []
  currentTime.value = dayjs(currentTime.value).add(1, "month").format("YYYY-MM")
  rendTime(currentTime.value)
}

const onPrevMonthClick = () => {
  state.monthList = []
  currentTime.value = dayjs(currentTime.value)
    .subtract(1, "month")
    .format("YYYY-MM")
  rendTime(currentTime.value)
}

const onDayClick = (e: dateType) => {
  state.monthList.map(item => (item.selectedDay = false))
  e.selectedDay = true
}

const onBackToday = () => {
  state.monthList = []
  currentTime.value = dayjs(new Date()).format("YYYY-MM")
  rendTime(currentTime.value)
}

onMounted(() => {
  if (props.defaultDate === "") {
    currentTime.value = dayjs(new Date()).format("YYYY-MM")
    rendTime(currentTime.value)
  } else {
    currentTime.value = dayjs(props.defaultDate).format("YYYY-MM")
    rendTime(currentTime.value)
  }
})
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
      > .prevMonth,
      .nextDay {
        color: #c6c6c6;
      }
      > .today,
      .selectedDay {
        outline: 1px solid #165dff;
        background: #165dff;
        color: white;
        &:hover {
          outline: 1px solid #165dff;
          background: #165dff;
          color: white;
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

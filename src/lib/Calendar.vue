<template>
  <div class="w-calendar-wrapper">
    <div class="w-calendar-header">{{ currentTime }}</div>
    <div class="w-calendar-main">
      <ul class="w-calendar-main-week" v-if="props.dayStartOfWeek === 0">
        <li v-for="item in state.weekFromSunday" :key="item">{{ item }}</li>
      </ul>
      <ul class="w-calendar-main-week" v-if="props.dayStartOfWeek === 1">
        <li v-for="item in state.weekFromMonday" :key="item">{{ item }}</li>
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
      <span @click="onPrevYearClick">上一年</span>
      <span @click="onPrevMonthClick">上个月</span>
      <span @click="onBackToday">今天</span>
      <span @click="onNextMonthClick">下个月</span>
      <span @click="onNextYearClick">下一年</span>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, reactive, ref } from "vue"
import dayjs from "dayjs"

interface dateType {
  completeTime: string
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
  dayStartOfWeek: {
    type: Number,
    default: 0,
  },
})

onMounted(() => {
  props.defaultDate === ""
    ? injectTimeAndRender(dayjs(new Date()).format("YYYY-MM"))
    : injectTimeAndRender(dayjs(props.defaultDate).format("YYYY-MM"))
})

const state = reactive({
  monthList: [] as dateType[],
  weekFromMonday: ["一", "二", "三", "四", "五", "六", "日"] as string[],
  weekFromSunday: ["日", "一", "二", "三", "四", "五", "六"] as string[],
})
const count = ref(0)
const currentTime = ref("")

const rendTime = (time: string) => {
  const firstDayOfMonth = dayjs(time).startOf("month")
  const firstDayOfWeek = dayjs(firstDayOfMonth).day()
  // 计算当月多少天
  for (let i = 1; i <= dayjs(firstDayOfMonth).daysInMonth(); i++) {
    // 判断是不是今天
    if (
      `${time}-${i}` === dayjs(new Date()).format("YYYY-MM-DD") ||
      `${time}-${i}` === dayjs(new Date()).format("YYYY-MM-D")
    ) {
      state.monthList.push({
        completeTime: dayjs(`${currentTime.value}-${i}`).format("YYYY-MM-DD"),
        date: i,
        currentDay: true,
        today: true,
      })
    } else {
      state.monthList.push({
        completeTime: dayjs(`${currentTime.value}-${i}`).format("YYYY-MM-DD"),
        date: i,
        currentDay: true,
      })
    }

    count.value += 1
  }
  // 计算前面需要铺垫多少天
  if (props.dayStartOfWeek === 1) {
    if (firstDayOfWeek === 0) {
      for (let i = 1; i < 7; i++) {
        state.monthList.unshift({
          completeTime: dayjs(currentTime.value)
            .subtract(1, "month")
            .endOf("month")
            .subtract(i - 1, "day")
            .format("YYYY-MM-DD"),
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
          completeTime: dayjs(currentTime.value)
            .subtract(1, "month")
            .endOf("month")
            .subtract(i - 1, "day")
            .format("YYYY-MM-DD"),
          date: dayjs(firstDayOfMonth)
            .startOf("month")
            .subtract(i, "day")
            .format("DD"),
          prevDay: true,
        })
        count.value += 1
      }
    }
  } else {
    if (firstDayOfWeek !== 0) {
      for (let i = 1; i <= firstDayOfWeek; i++) {
        state.monthList.unshift({
          completeTime: dayjs(currentTime.value)
            .subtract(1, "month")
            .endOf("month")
            .subtract(i - 1, "day")
            .format("YYYY-MM-DD"),
          date: dayjs(firstDayOfMonth)
            .startOf("month")
            .subtract(i, "day")
            .format("DD"),
          prevDay: true,
        })
        count.value += 1
      }
    }
  }

  // 计算后面需要铺垫多少天
  for (let i = 1; i <= 42 - count.value; i++) {
    state.monthList.push({
      completeTime: dayjs(currentTime.value)
        .add(1, "month")
        .startOf("month")
        .add(i - 1, "day")
        .format("YYYY-MM-DD"),
      date: dayjs(firstDayOfMonth).endOf("month").add(i, "day").format("D"),
      nextDay: true,
    })
  }

  count.value = 0
}

const onNextYearClick = () => {
  state.monthList = []
  injectTimeAndRender(dayjs(currentTime.value).add(1, "year").format("YYYY-MM"))
}

const onNextMonthClick = () => {
  state.monthList = []
  injectTimeAndRender(
    dayjs(currentTime.value).add(1, "month").format("YYYY-MM")
  )
}

const onPrevYearClick = () => {
  state.monthList = []
  injectTimeAndRender(
    dayjs(currentTime.value).subtract(1, "year").format("YYYY-MM")
  )
}

const onPrevMonthClick = () => {
  state.monthList = []
  injectTimeAndRender(
    dayjs(currentTime.value).subtract(1, "month").format("YYYY-MM")
  )
}

const onDayClick = (e: dateType) => {
  if (
    e.completeTime.substring(0, 7) ===
    dayjs(currentTime.value).add(1, "month").format("YYYY-MM")
  ) {
    onNextMonthClick()
    state.monthList.map(item => {
      item.completeTime === e.completeTime && (item.selectedDay = true)
    })
  } else if (
    e.completeTime.substring(0, 7) ===
    dayjs(currentTime.value).subtract(1, "month").format("YYYY-MM")
  ) {
    onPrevMonthClick()
    state.monthList.map(item => {
      item.completeTime === e.completeTime && (item.selectedDay = true)
    })
  } else {
    state.monthList.map(item => (item.selectedDay = false))
    e.selectedDay = true
  }
}

const onBackToday = () => {
  state.monthList = []
  injectTimeAndRender(dayjs(new Date()).format("YYYY-MM"))
}

const injectTimeAndRender = (time: string) => {
  currentTime.value = time
  rendTime(currentTime.value)
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
    justify-content: space-between;
    cursor: pointer;
  }
}
</style>

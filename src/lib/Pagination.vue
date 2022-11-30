<template>
  <div class="w-pagination">
    <span v-for="page in pages" :key="page" class="w-pagination-item" 
    :class="{ active: page === currentPage,separator:page==='...' }">
      {{ page }}
    </span>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, reactive } from 'vue';

const props = defineProps({
  totalPage: {
    type: Number,
    required: true
  },
  currentPage: {
    type: Number,
    required: true
  },
  hideIfOnePage: {
    type: Boolean
  }
})

const pages = reactive<any[]>([])
onMounted(() => {
  const data = [1, props.totalPage, props.currentPage, props.currentPage - 1, props.currentPage - 2, props.currentPage + 1, props.currentPage + 2]
  Object.assign(pages, unique(data.sort((a, b) => a - b)))
  Object.assign(pages, pages.reduce((result, item, index) => {
    pages[index + 1] !== undefined && pages[index + 1] - pages[index] > 1
      ? result.push(item, '...')
      : result.push(item)
    return result
  }, []))
})

const unique = (array: number[]) => {
  const map = new Map()
  for (let i = 0; i < array.length; i++) {
    const number = array[i]
    if (number === undefined || map.has(number)) { continue }
    map.set(number, true)
  }
  return [...map.keys()]
}
</script>


<style lang="scss" scoped>
.w-pagination{
  &-item{
    cursor: pointer;
    border:1px solid #e1e1e1;
    border-radius: 4px;
    padding: 0 4px;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    font-size: 12px;
    min-width: 20px;
    height: 20px;
    margin: 0 4px;
    &.active{
      color: #165dff;
      border-color: #e8f3ff;
      background-color: #e8f3ff;
    }
    &:hover{
      border-color: #e8f3ff;
    }
    &.separator{
      border:none;
    }
  }
}
</style>

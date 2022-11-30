<template>
  <ul class="w-pagination">
    <li class="prev" :class="{ disabled: currentPage === 1 }">
      <Icon name="left" />
    </li>
    <template v-for="page in pages" :key="page">
      <template v-if="page === currentPage">
        <li class="w-pagination-item current">{{ page }}</li>
      </template>
      <template v-else-if="page === '...'">
        <li class="w-pagination-item separator">
          <Icon name="ellipsis" />
        </li>
      </template>
      <template v-else>
        <li class="w-pagination-item other">{{ page }}</li>
      </template>
    </template>
    <li class="next" :class="{ disabled: currentPage === totalPage }">
      <Icon name="right" />
    </li>
  </ul>
</template>

<script lang="ts" setup>
import { onMounted, reactive } from "vue";
import Icon from "../components/Icon.vue";

const props = defineProps({
  totalPage: {
    type: Number,
    required: true,
  },
  currentPage: {
    type: Number,
    required: true,
  },
  hideIfOnePage: {
    type: Boolean,
  },
});

const pages = reactive<any[]>([]);
onMounted(() => {
  const data = [
    1,
    props.totalPage,
    props.currentPage,
    props.currentPage - 1,
    props.currentPage - 2,
    props.currentPage + 1,
    props.currentPage + 2,
  ];
  Object.assign(
    pages,
    unique(
      data.filter((item) => item >= 1 && item <= props.totalPage).sort((a, b) => a - b)
    )
  );
  Object.assign(
    pages,
    pages.reduce((result, item, index) => {
      pages[index + 1] !== undefined && pages[index + 1] - pages[index] > 1
        ? result.push(item, "...")
        : result.push(item);
      return result;
    }, [])
  );
});

const unique = (array: number[]) => {
  const map = new Map();
  for (let i = 0; i < array.length; i++) {
    const number = array[i];
    if (number === undefined || map.has(number)) {
      continue;
    }
    map.set(number, true);
  }
  return [...map.keys()];
};
</script>

<style lang="scss" scoped>
.w-pagination {
  display: flex;
  align-items: center;
  cursor: pointer;
  &-item {
    display: inline-block;
    text-align: center;
    vertical-align: middle;
    list-style: none;
    box-sizing: border-box;
    cursor: pointer;
    outline: 0;
    user-select: none;
    border-radius: 2px;
    color: rgb(78, 89, 105);
    border: 0 solid transparent;
    background-color: transparent;
    font-size: 14px;
    min-width: 32px;
    height: 32px;
    line-height: 32px;
    &.current {
      color: #165dff;
      border-color: #e8f3ff;
      background-color: #e8f3ff;
    }
    &:hover {
      border-color: #e8f3ff;
    }
    &.separator {
      border: none;
    }
  }
}
.prev,
.next {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 8px;
  &.disabled {
    cursor: not-allowed;
    svg {
      fill: darken(#e1e1e1, 30%);
    }
  }
  .icon {
    width: 1em;
    height: 1em;
  }
}
</style>

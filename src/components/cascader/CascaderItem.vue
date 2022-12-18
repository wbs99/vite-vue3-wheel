<template>
  <div class="cascader-item">
    <div class="left">
      <div class="label" v-for="item in items" :key="item.name" @click="onLeftSelected(item)"> {{ item.name }}</div>
    </div>
    <div class="right" v-if="rightItems">
      <CascaderItem :items="rightItems" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, PropType, ref } from 'vue';

const props = defineProps({
  items: {
    type: Array as PropType<any[]>,
    default: () => []
  }
})

const leftSelected = ref<any>(null)

const rightItems = computed(() => {
  if (leftSelected.value && leftSelected.value.children) {
    return leftSelected.value.children
  } else {
    return null
  }
})
const onLeftSelected = (item: any) => {
  leftSelected.value = item
}
</script>


<style lang="scss" scoped>
.cascader-item{
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  .left{
    border:1px solid red;
  }
  .right{
    margin-top: -1px;
  }
}
</style>

<template>
  <div>
    <!-- <Cascader :list="dataSource" :selected="selected" @update:selected="selected = $event" popoverHeight="200px" /> -->
    <Cascader :list="dataSource" popoverHeight="200px" />

  </div>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue';
import { useCascaderStore } from '../../store/useMeStore';
import Cascader from './Cascader.vue'

const cascaderStore = useCascaderStore()

const dataSource = reactive([
  {
    name: '浙江',
    children: [
      {
        name: '杭州',
        children: [
          { name: '上城区' },
          { name: '下城区' },
          { name: '江干区' },
        ]
      },
      { name: '温州' },
      { name: '宁波' },
    ]
  },
  {
    name: '福建',
    children: [
      {
        name: '福州',
        children: [
          { name: '鼓楼' },
          { name: '台江' },
          { name: '仓山' },
        ]
      },
      { name: '厦门' },
      { name: '三明' },
      { name: '泉州' },
    ]
  }
])
const selected = ref([])

</script>


<style lang="scss" scoped>

</style>

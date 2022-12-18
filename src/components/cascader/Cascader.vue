<template>
  <div class="cascader">
    <div class="trigger" @click="popoverVisible = !popoverVisible"></div>
    <div class="popover" v-if="popoverVisible">
      <CascaderItem :items="list" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, PropType, ref } from 'vue';
import CascaderItem from './CascaderItem.vue';

type Children = {
  name: string
  children?: Children[]
}
type List = {
  name: string,
  children: Children[]
}

const props = defineProps({
  list: {
    type: Array as PropType<List[]>,
    default: () => []
  }
})
const popoverVisible = ref(false)

</script>


<style lang="scss" scoped>
.cascader{
  .trigger{
    border:1px solid red;
    height: 32px;
    width: 300px;
  }
  .popover{
    border:1px solid green;
    height: 200px;
    width: 200px;
    display: flex;
  }
}
</style>

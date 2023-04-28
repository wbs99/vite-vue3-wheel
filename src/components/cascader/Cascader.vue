<template>
  <div class="cascader">
    <div class="trigger" @click="popoverVisible = !popoverVisible"></div>
    <!-- <div class="popover" v-if="popoverVisible">
      <CascaderItem :items="props.list" :selected="selected" @update:selected="onUpdateSelected"
        :height="popoverHeight" />
    </div> -->
    <div class="popover" v-if="popoverVisible">
      <CascaderItem :items="props.list" :height="popoverHeight" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { PropType, ref } from 'vue';
import CascaderItem from './CascaderItem.vue';


const props = defineProps({
  list: {
    type: Array as PropType<Item[]>,
    default: () => []
  },
  popoverHeight: {
    type: String
  },
  selected: {
    type: Array as PropType<Item[]>,
    default: () => []
  }
})
const emit = defineEmits(['update:selected'])

const popoverVisible = ref(false)

const onUpdateSelected = (value: any) => {
  console.log('你好啊')
  console.log(value)
  emit('update:selected', value)
}

</script>


<style lang="scss" scoped>
@import '../../../styles/var.scss';

.cascader{
  position: relative;
  .trigger{
    border:1px solid red;
    height: 32px;
    width: 300px;
  }
  .popover{
    position: absolute;
    top: 100%;
    left: 0;
    display: flex;
    background: white; 
    margin-top: 8px;z-index: 1;
    @extend .box-shadow;
  }
}
</style>

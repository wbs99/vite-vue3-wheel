<template>
  <div class="cascader-item" :style="{ height: height }">
    <div>
      selected:{{ cascaderStore.selected && cascaderStore.selected[0] && cascaderStore.selected[0].name }}

      level:{{ level }}
    </div>
    <div class="left">
      <div class="label" v-for="item in items" :key="item.name" @click="onClickLabel(item, level)">
        {{ item.name }}
        <Icon name="right" v-if="item.children" class="icons" />
      </div>
    </div>
    <div class="right" v-if="rightItems">
      <CascaderItem :items="rightItems" :level="level + 1" :height="height" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, PropType, ref } from 'vue';
import { useCascaderStore } from '../../store/useMeStore';
import Icon from '../Icon.vue';

const cascaderStore = useCascaderStore()
const props = defineProps({
  items: {
    type: Array as PropType<Item[]>,
    default: () => []
  },
  height: {
    type: String
  },
  level: {
    type: Number,
    default: 0
  },
  selected: {
    type: Array as PropType<Item[]>,
    default: () => []
  }
})
const emit = defineEmits(['update:selected'])

const leftSelected = ref<Item>()

const rightItems = computed(() => {
  if (leftSelected.value && leftSelected.value.children) {
    return leftSelected.value.children
  } else {
    return undefined
  }
})
// const onClickLabel = (item: Item) => {
//   const copy = JSON.parse(JSON.stringify(props.selected))
//   copy[props.level] = item
//   emit('update:selected', copy)
// }
const onClickLabel = (item: Item, level: number) => {
  cascaderStore.onLabelClick(item, level)
}
</script>


<style lang="scss" scoped>
@import '../../../styles/var.scss';
.cascader-item{
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  height: 160px;
  .left{
    height: 100%;
    padding: .3em 0;
  }
  .right{
    height: 100%;
    border-left: 1px solid $border-color ;
  }
  .label{
    padding: .5em 1em;
    display: flex;
    align-items: center;
    cursor: pointer;
    white-space: nowrap;
    &:hover {
      background: $grey;
    }
  }
  .icons{
    margin-left: 12px;
  }
}
</style>

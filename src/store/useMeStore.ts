import { defineStore } from "pinia"
import { ref } from "vue"

export const useCascaderStore = defineStore('cascaderStore', () => {
  const selected = ref<any>([])

  const onLabelClick = (value: Item, level: number) => {
    selected.value[level] = value
  }

  return { selected, onLabelClick }
})


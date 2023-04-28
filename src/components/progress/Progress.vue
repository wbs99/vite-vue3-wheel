<template>
  <div class="bar">
    <div class='bar_inner' :style="{ width: `${width}%`, backgroundColor }"></div>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps({
  width: {
    type: Number,
    default: 0
  },
  backgroundColor: {
    type: String,
    default: '#0075ff'
  }
})
</script>

<style lang="scss" scoped>
.bar {
  height: 8px;
  border-radius: 4px;
  background: #CCCCCC;
  position: relative;
  overflow: hidden;
  margin-top: 4px;
}
.bar_inner {
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width:0;
  transition: width 500ms;
}
</style>

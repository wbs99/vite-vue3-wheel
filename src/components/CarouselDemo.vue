<template>
  <Carousel :imageList="imageList" :duration="3000" :autoPlay="true" />
</template>

<script lang="ts" setup>
import { reactive } from "vue";
import Carousel from "../lib/Carousel.vue";

const imageList = reactive([
  {
    imageUrl: "https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/cd7a1aaea8e1c5e3d26fe2591e561798.png~tplv-uwbnlip3yd-webp.webp"
  },
  {
    imageUrl: "https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/6480dbc69be1b5de95010289787d64f1.png~tplv-uwbnlip3yd-webp.webp"
  },
  {
    imageUrl:
      "https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/0265a04fddbd77a19602a15d9d55d797.png~tplv-uwbnlip3yd-webp.webp"
  },
])

</script>

<style lang="scss" scoped>
</style>
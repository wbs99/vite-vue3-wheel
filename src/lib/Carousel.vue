<template>
  <div class="carousel">
    <div class="panels">
      <a v-for="(image, index) in imageList" :key="image.imageUrl" :class="{ active: currentIndex === index }">
        <img :src="image.imageUrl" />
      </a>
    </div>
    <div class="action">
      <span class="pre" @click="toggle(-1)">上一个</span>
      <div class="dots">
        <span v-for="(image, index) in imageList" :key="index" :class="{ active: currentIndex === index }"
          @click="currentIndex = index">
        </span>
      </div>
      <span class="next" @click="toggle(1)">下一个</span>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, watch, onUnmounted } from 'vue'

interface Props {
  imageList: { imageUrl: string }[]
  duration?: number
  autoPlay?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  imageList: () => [
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
  ],
  duration: 3000,
  autoPlay: false
})

// 切换
const currentIndex = ref(0)
const toggle = (index: number) => {
  currentIndex.value += index
  if (currentIndex.value >= props.imageList.length) {
    currentIndex.value = 0
    return
  }
  if (currentIndex.value < 0) {
    currentIndex.value = props.imageList.length - 1
  }
}

const timer = ref(0)
const autoPlayFn = () => {
  clearInterval(timer.value)
  timer.value = setInterval(() => {
    currentIndex.value++
    if (currentIndex.value >= props.imageList.length) {
      currentIndex.value = 0
    }
  }, props.duration)
}


watch(() => props.imageList, (newValue) => {
  if (newValue.length > 1 && props.autoPlay) {
    currentIndex.value = 0
    autoPlayFn()
  }
}, { immediate: true })

onUnmounted(() => {
  clearInterval(timer.value)
  timer.value = 0
})
</script>

<style lang="scss" scoped>
.carousel {
  width: 600px;
  > .panels {
    position: relative;
    height: 240px;
    > a {
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
    opacity: 0;
    transition: all 0.5s linear;
    object-fit: cover;
    &.active {
      opacity: 1;
      z-index: 1;
    }
    }
    img {
      width: 100%;
      height: 100%;
    }
  }
  > .action {
    display: flex;
    font-size: 18px;
    color: #666;
    align-items: center;
    margin-top: 6px;
    justify-content: space-between;
    align-items: center;
    >.pre{
      cursor: pointer;
    }
    >.next{
      cursor: pointer;
    }
    > .dots {
      text-align: center;
      > span {
        width: 8px;
        height: 4px;
        border-radius: 2px;
        background: #ddd;
        display: inline-block;
        transition: width 0.3s;
        cursor: pointer;
        margin-right: 2px;
        &.active {
          background: #aaa;
          width: 10px;
        }
      }
    }
  }
}
</style>

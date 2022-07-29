<template>
  <div class="top-nav">
    <div class="logo" @click="toggleAside">logo</div>
    <div class="menu">
      <li>菜单1</li>
      <li>菜单2</li>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { inject, Ref } from "vue";

const asideVisible = inject<Ref<boolean>>("asideVisible");
const toggleAside = () => {
  asideVisible!.value = !asideVisible!.value;
};
</script>

<style lang="scss" scoped>
.top-nav {
  background: white;
  display: flex;
  padding: 16px;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 20;
  box-shadow: 0 5px 5px rgb(51 51 51 / 10%);
  > .logo {
    max-width: 6em;
    margin-right: auto;
    cursor: pointer;
    > svg {
      width: 40px;
      height: 40px;
    }
  }
  > .menu {
    display: flex;
    white-space: nowrap;
    flex-wrap: wrap;
    > li {
      margin: 0 1em;
    }
  }
  > .toggleAside {
    display: none;
    width: 30px;
    height: 30px;
    position: absolute;
    left: 16px;
    top: 50%;
    transform: translateY(-50%);
  }
  @media (max-width: 500px) {
    > .menu {
      display: none;
    }
    > .logo {
      margin: 0 auto;
    }
    > .toggleAside {
      display: inline-block;
    }
  }
}
</style>

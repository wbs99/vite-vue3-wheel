<template>
  <div class="home">
    <div class="wrapper">
      <TopNav class="topnav" />
      <div class="banner">
        <h1>Good UI</h1>
        <h2>一个普普通通的 UI 框架</h2>
        <p class="actions">
          <a href="https://github.com/wbs99?tab=repositories">GitHub</a>
          <router-link to="/doc">马上开始</router-link>
        </p>
      </div>
    </div>
    <div class="ads">
      <ul>
        <li>
          <svg class="icon">
            <use xlink:href="#icon-Vue"></use>
          </svg>
          <h3>基于 Vue3</h3>
          <p>使用了 Vue3 Composition API</p>
        </li>
        <li>
          <svg class="icon">
            <use xlink:href="#icon-ts"></use>
          </svg>
          <h3>基于 TypeScript</h3>
          <p>源代码采用 TypeScript 书写</p>
        </li>
        <li>
          <svg class="icon">
            <use xlink:href="#icon-lights"></use>
          </svg>
          <h3>代码易读</h3>
          <p>每个组件的源代码都极其简洁</p>
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts" setup>
import TopNav from "../components/TopNav.vue";
</script>

<style lang="scss" scoped>
.home {
  height: 100vh;
  z-index: 30;
  background-image: url(https://browser9.qhimg.com/bdr/__100/t01376952f5589c328d.jpg);
  background-color: transparent;
  background-size: cover;
}
.topnav {
  background-color: transparent;
  box-shadow: none;
  color: black;
}
.ads {
  margin: 64px auto;
  width: 400px;
  @media (min-width: 800px) {
    width: 800px;
  }
  @media (min-width: 1200px) {
    width: 1200px;
  }

  > ul {
    display: flex;
    flex-wrap: wrap;
    color: black;

    > li {
      width: 400px;
      margin: 16px 0;
      display: grid;
      justify-content: start;
      align-content: space-between;
      grid-template-areas:
        "icon title"
        "icon text";
      grid-template-columns: 80px auto;
      grid-template-rows: 1fr auto;

      > svg {
        grid-area: icon;
        width: 64px;
        height: 64px;
      }

      > h3 {
        grid-area: title;
        font-size: 28px;
      }

      > p {
        grid-area: text;
      }
    }
  }
}
.banner {
  padding: 100px 0;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  color: black;

  > .actions {
    padding: 8px 0;
    margin: 12px 0;
    a {
      margin: 0 12px;
      background-color: #93bf85;
      color: white;
      display: inline-block;
      border-radius: 2rem;
      padding: 12px 24px;

      &:hover {
        text-decoration: none;
      }
    }
  }
}
</style>

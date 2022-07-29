<template>
  <div>
    <TopNav />
    <div class="banner">
      <h1>Vue3-UI</h1>
      <h2>一个框架</h2>
      <p class="actions">
        <a href="Github">Github</a>
        <a href="开始">开始</a>
      </p>
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

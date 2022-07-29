<template>
  <div>
    <TopNav />

    <div class="content" v-if="asideVisible === true">
      <aside>
        <h3>文档</h3>
        <ol>
          <li>
            <router-link to="/doc/intro">介绍</router-link>
          </li>
        </ol>
        <ol>
          <li>
            <router-link to="/doc/install">安装</router-link>
          </li>
        </ol>
        <ol>
          <li>
            <router-link to="/doc/start">开始使用</router-link>
          </li>
        </ol>
        <h3>组件列表</h3>
        <ol>
          <li>
            <router-link to="/doc/switch">Switch 开关</router-link>
          </li>
          <li>
            <router-link to="/doc/button">Button 按钮</router-link>
          </li>
          <li>
            <router-link to="/doc/dialog">Dialog 对话框</router-link>
          </li>
          <li>
            <router-link to="/doc/tabs">Tabs 标签页</router-link>
          </li>
        </ol>
      </aside>
      <main>
        <router-view />
      </main>
    </div>
  </div>
</template>

<script lang="ts" setup>
import TopNav from "../components/TopNav.vue";
import { inject, Ref } from "vue";

const asideVisible = inject<Ref<boolean>>("asideVisible");
</script>

<style lang="scss" scoped>
.layout {
  display: flex;
  flex-direction: column;
  height: 100vh;

  > .nav {
    flex-shrink: 0;
  }

  > .content {
    flex-grow: 1;
    padding-top: 60px;
    padding-left: 156px;
    @media (max-width: 500px) {
      padding-left: 0;
    }
  }
}

.content {
  display: flex;
  > aside {
    flex-shrink: 0;
  }
  > main {
    flex-grow: 1;
    padding: 64px 96px;
    background: white;
  }
}
aside {
  background: white;
  width: 180px;
  position: fixed;
  top: 10px;
  left: 0;
  padding-top: 70px;
  height: 100%;
  z-index: 10;
  box-shadow: 10px 2px 8px 2px rgb(51 51 51 / 10%);
  > h3 {
    margin-bottom: 4px;
    padding: 8px 16px;
    font-weight: bolder;
  }
  > ol {
    > li {
      > a {
        display: block;
        padding: 8px 16px;
        text-decoration: none;
      }
      .router-link-active {
        background: #e6f7ff;
        border-right: 2px solid #1890ff;
      }
    }
  }
}
main {
  overflow: auto;
}
</style>

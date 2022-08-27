<template>
  <div class="layout">
    <TopNav class="nav" />
    <div class="content">
      <aside v-if="asideVisible">
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
          <li v-for="item in routerList" :key="item.routerName">
            <router-link :to="item.router">{{ item.routerName }}</router-link>
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
import TopNav from "../components/TopNav.vue"
import { inject, reactive, Ref } from "vue"

const asideVisible = inject<Ref<boolean>>("asideVisible")
const routerList = reactive<{ router: string; routerName: string }[]>([
  {
    router: "/doc/switch",
    routerName: "Switch 开关",
  },
  {
    router: "/doc/button",
    routerName: "Button 按钮",
  },
  {
    router: "/doc/dialog",
    routerName: "Dialog 对话框",
  },
  {
    router: "/doc/tabs",
    routerName: "Tabs 标签页",
  },
  {
    router: "/doc/calendar",
    routerName: "calendar 日历",
  },
])
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
  > main {
    flex-grow: 1;
    padding: 64px 96px;
    background: white;
    overflow: auto;
  }
}
</style>

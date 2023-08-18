<script setup lang="ts">
import { GlobalStore } from '@/stores'
import CloudHeader from './components/CloudHeader.vue'
import CloudAside from './components/CloudAside.vue'
import CloudFooter from './components/CloudFooter.vue'

const cloudAsideRef = ref<{ collapsed: boolean }>()
const globalStore = GlobalStore()
const collapsed = computed(() => globalStore.themeConfig.collapsed)
</script>

<template>
  <a-layout class="cloud-layout">
    <!-- header -->
    <cloud-header />
    <a-layout
      class="aside-content"
      :class="collapsed ? 'aside-close' : 'aside-open'"
    >
      <!-- aside 菜单 -->
      <cloud-aside ref="cloudAsideRef" />
      <a-layout class="content-main">
        <a-layout-content>
          <!-- 页面 -->
          <router-view />
          <router-view />
          <router-view />
        </a-layout-content>
        <!-- footer -->
        <cloud-footer />
      </a-layout>
    </a-layout>
  </a-layout>
</template>

<style scoped lang="less">
.cloud-layout {
  width: 100%;
  height: 100vh;
  padding-top: 60px;
  .aside-close {
    padding-left: 60px;
    transition: all 0.2s;
  }
  .aside-open {
    padding-left: 180px;
    transition: all 0.2s;
  }
  .aside-content {
    min-height: calc(100% - 60px);
    display: flex;
    flex-direction: row;
    .content-main {
      flex: 1;
      min-width: 0;
      position: relative;
      .ant-layout-content {
        overflow: scroll;
        padding: 8px;
        padding-bottom: 40px;
      }
    }
  }
}
</style>

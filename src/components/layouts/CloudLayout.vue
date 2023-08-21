<script setup lang="ts">
import { useAppStore } from '@/stores/modules/app'
import CloudHeader from './components/CloudHeader.vue'
import CloudAside from './components/CloudAside.vue'
import CloudFooter from './components/CloudFooter.vue'

const cloudAsideRef = ref<{ isCollapse: boolean }>()
const AppStore = useAppStore()
const isCollapse = computed(() => AppStore.isCollapse)
</script>

<template>
  <layout class="cloud-layout">
    <!-- header -->
    <cloud-header />
    <layout
      class="aside-content"
      :class="isCollapse ? 'aside-close' : 'aside-open'"
    >
      <!-- aside 菜单 -->
      <cloud-aside ref="cloudAsideRef" />
      <layout class="content-main">
        <layout-content>
          <!-- 页面 -->
          <router-view />
          <router-view />
          <router-view />
        </layout-content>
        <!-- footer -->
        <cloud-footer />
      </layout>
    </layout>
  </layout>
</template>

<style scoped lang="less">
.cloud-layout {
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
    margin-top: 60px;
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

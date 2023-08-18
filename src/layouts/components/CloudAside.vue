<script setup lang="ts">
import SubMenu from '@/layouts/components/SubMenu.vue'
import { staticRouter } from '@/router/modules/staticRouter'
import { GlobalStore } from '@/stores'

const selectedKeys = ref<string[]>([])
const openKeys = ref<string[]>([])
const menuList = computed(() => staticRouter)

const globalStore = GlobalStore()
const themeConfig = computed(() => globalStore.themeConfig)
const collapsed = computed(() => globalStore.themeConfig.collapsed)

const collapseClick = () => {
  globalStore.setThemeConfig({
    ...themeConfig.value,
    collapsed: !themeConfig.value.collapsed
  })
}

defineExpose({
  collapsed: collapsed
})
</script>

<template>
  <a-layout-sider
    v-model:collapsed="collapsed"
    :collapsedWidth="60"
    :width="180"
    collapsible
    theme="dark"
    class="CloudAside"
    @collapse="collapseClick"
  >
    <!-- logo & name -->
    <div :class="collapsed ? 'title-close' : 'title-open'" class="title">
      <router-link :to="{ path: '/' }" class="logo-a">
        <span class="ee-logo-wrapper">
          <img
            :class="collapsed ? 'logo-animate' : ''"
            src="@/assets/future_cloud_logo1.png"
            width="32px"
            height="32px"
          />
        </span>
        <span
          :class="collapsed ? 'logo-animate2' : ''"
          style="font-size: 16px; font-weight: 700; color: #fff"
        >
          cloud-admin
        </span>
      </router-link>
    </div>
    <!-- 菜单 -->
    <a-menu
      v-model:openKeys="openKeys"
      v-model:selectedKeys="selectedKeys"
      :inline-indent="16"
      mode="inline"
      theme="dark"
    >
      <template v-for="item in menuList" :key="item.name">
        <template v-if="!item.children">
          <a-menu-item :key="item.name">
            <template #icon>
              <component
                :is="item.meta?.icon"
                style="margin-right: 8px"
              ></component>
            </template>
            {{ item.meta?.title }}
          </a-menu-item>
        </template>
        <template v-else>
          <SubMenu :key="item.name" :menu-info="item" />
        </template>
      </template>
    </a-menu>
  </a-layout-sider>
</template>

<style lang="scss" scoped>
.CloudAside {
  position: fixed;
  top: 60px;
  left: 0;
  bottom: 0;
  .toggleBtn {
    color: #fff;
    position: absolute;
    bottom: 0;
    left: 7;
  }
}
.title {
  color: #fff;
  width: 180px;
  height: 60px;
  line-height: 60px;
  padding-left: 20px;
  background-color: #002140;

  img {
    display: inline-block;
    vertical-align: middle;
    width: 40px;
    height: 40px;
  }

  span {
    display: inline-block;
    font-size: 18px;
    line-height: 64px;

    i {
      font-size: 12px;
    }
  }

  .ee-logo-wrapper {
    display: inline-block;
    margin-right: 8px;
  }
}

.title-open {
  transition: all 0.2s;
  overflow: hidden;
}
.title-close {
  padding-left: 8px;
  width: 60px;
  overflow: hidden;
  transition: all 0.2s;
  .logo-animate {
    transition: all 0.3s;
    transform: translateX(2px);
  }

  .logo-animate2 {
    opacity: 0;
    transition: all 0.3s;
    transform: translateX(12px);
  }
}
</style>

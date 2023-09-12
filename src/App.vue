<template>
  <a-config-provider
    :locale="locale"
    :component-size="componentSize"
    :theme="{
      token: {
        colorPrimary: '#1890ff'
      }
    }"
  >
    <router-view v-slot="{ Component }">
      <keep-alive v-if="isKeepAlive">
        <component :is="Component" />
      </keep-alive>
      <component :is="Component" v-if="!isKeepAlive" />
    </router-view>
  </a-config-provider>
</template>

<script setup lang="ts">
import zhCN from 'ant-design-vue/es/locale/zh_CN'
import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn'

const route = useRoute()
const isKeepAlive = ref(route.meta.isKeepAlive)

dayjs.locale('zh-cn')

const locale = zhCN

type SizeType = 'small' | 'middle' | 'large'
const componentSize = ref<SizeType>('middle')

onBeforeMount(() => {})
</script>

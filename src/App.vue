<template>
  <ConfigProvider
    :locale="locale"
    :component-size="componentSize"
  >
    <RouterView />
  </ConfigProvider>
</template>

<script setup lang="ts">
import zhCN from 'ant-design-vue/es/locale/zh_CN';
import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';

dayjs.locale('zh-cn');

const locale = zhCN

type SizeType = 'small' | 'middle' | 'large';
const componentSize = ref<SizeType>('small');
</script>

<style scoped>

</style>

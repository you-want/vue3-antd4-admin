<script setup lang="ts">
const props = defineProps(['menuInfo'])

console.log(111, 'props', props)
</script>

<template>
  <sub-menu>
    <template #icon>
      <component
        :is="menuInfo.meta?.icon"
        style="margin-right: 8px"
      ></component>
    </template>
    <template #title>
      {{ menuInfo.meta?.title }}
    </template>
    <template v-for="item in menuInfo.children" :key="item.name">
      <template v-if="!item.children">
        <menu-item :key="item.name">
          <template #icon>
            <component
              :is="item.meta?.icon"
              style="margin-right: 8px"
            ></component>
          </template>
          {{ item.meta?.title }}
        </menu-item>
      </template>
      <template v-else>
        <child-menu :menu-info="item" :key="item.name" />
      </template>
    </template>
  </sub-menu>
</template>

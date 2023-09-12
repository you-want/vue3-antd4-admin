<template>
  <page-wrapper title="关于" :content="description">
    <project-info class="enter-y" />
    <dependencies class="enter-y !mt-16px" />
    <dev-dependencies class="enter-y !mt-16px" />
  </page-wrapper>
</template>

<script setup lang="ts">
import ProjectInfo from './components/ProjectInfo.vue'
import Dependencies from './components/DependenciesInfo.vue'
import DevDependencies from './components/DevDependencies.vue'
import { PageWrapper } from '@/components/Page'

const { pkg } = __APP_INFO__
const { description } = pkg
</script>

<style>
@media (min-width: 1024px) {
  .about {
    display: flex;
    align-items: center;
  }
}
</style>

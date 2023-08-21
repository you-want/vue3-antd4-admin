<template>
  <div>
    <team-select class="h-72px flex items-center m-10px pl-30px bg-#fff"></team-select>
  </div>
</template>

<script setup lang="ts" name="DevMachine">
import { machines } from "@/api/dev"

onMounted(() => {
  machines({
    organization: 'bd-jinfeng-train',
    clusters: ''
  }).then(res => {
    console.log(res)
  }).catch(err => {
    console.error(err)
  })
})
</script>
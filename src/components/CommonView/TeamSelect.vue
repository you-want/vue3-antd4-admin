<template>
  <a-card style="display: flex">
    <span class="mr-5px">选择团队：</span>
    <a-select class="w-200px" v-model:value="selectedTeam" placeholder="请选择">
      <a-select-option
        v-for="item in teamOptions"
        :key="item.name"
        :value="item.name"
      >
        {{ item.name }}
      </a-select-option>
    </a-select>

    <div style="flex: auto">
      <slot></slot>
    </div>
  </a-card>
</template>

<script setup lang="ts" name="TeamSelect">
import { useUserStore } from "@/stores/modules/user";
import { organizations } from "@/api/org";

let teamOptions = ref<any[]>([]);
const selectedTeam = ref("");

const userStore = useUserStore();

onMounted(() => {
  getOrgs();
});

const getOrgs = () => {
  organizations().then(res => {
    console.log("selectedTeam", res);
  }).catch(err => {
    console.error(err)
  })
}
</script>

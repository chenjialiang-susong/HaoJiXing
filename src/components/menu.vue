<template>
  <!-- <el-menu :default-active="route.path" router> -->
  <el-menu :default-active="'/food'" router>
    <el-sub-menu v-for="item in menus" :key="item.path" :index="item.path">
      <template #title>
        <el-icon><component :is="item.meta?.icon"></component></el-icon>
        <span>{{ item.meta?.title }}</span>
      </template>
      <el-menu-item
        v-for="itemChild in item.children"
        :key="item.path + itemChild.path"
        :index="
          item.path === '/'
            ? item.path + itemChild.path
            : item.path + '/' + itemChild.path
        "
      >
        <el-icon><component :is="itemChild.meta?.icon"></component></el-icon>
        <span>{{ itemChild.meta?.title }}</span>
      </el-menu-item>
    </el-sub-menu>
  </el-menu>
</template>

<script setup lang="ts">
import _ from "lodash";
import { useRouter, useRoute } from "vue-router";
const router = useRouter();
const route = useRoute();

const menus = _.cloneDeep(router.options.routes).filter((v) => {
  return v.meta?.menu;
});
</script>

<style scoped></style>

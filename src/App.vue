<script setup lang="ts">
import mainContent from "@/components/main.vue";
import menuContent from "@/components/menu.vue";
</script>

<template>
  <el-row>
    <el-col :span="4">
      <menu-content></menu-content>
    </el-col>
    <el-col :span="20">
      <!-- <home-breadcrumb></home-breadcrumb> -->
      <main-content></main-content
    ></el-col>
  </el-row>
</template>

<style scoped lang="less">
@import "@/assets/style/common.less";
#app {
  height: 100vh;
  width: 100vw;
}
</style>

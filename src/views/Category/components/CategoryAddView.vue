<template>
  <div class="category-add">
    <el-button type="primary" @click="categoryAdd">添加分类</el-button>
  </div>
</template>

<script setup lang="ts">
import { addCategory } from "@/api/category";
const categoryAdd = () => {
  const param = {
    name: "vue",
    createTime: new Date().getTime().toString(),
    studyLink: "http://baidu.com",
  };
  addCategory(param).then((res) => {
    console.log(res);
  });
};
</script>

<style scoped lang="less"></style>

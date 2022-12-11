<script lang="ts">
import { defineComponent, reactive, onMounted } from "vue";
// import {
//   addItem,
//   deleteItem,
//   changeItem,
//   queryAll,
// } from "@/api/category";
import { addTiWen, deleteTiWen, changeTiWen, queryAllTiWen } from "@/api/tiWen";
export default defineComponent({
  setup() {
    const state = reactive({
      test: "test666",
    });
    onMounted(() => {
      // 新增
      // const param = {
      //   name: "vue",
      //   createTime: new Date().getTime().toString(),
      //   studyLink: "http://baidu.com",
      // };
      // addItem(param);
      // 删除
      // const param = {
      //   id: 3,
      // };
      // deleteItem(param);
      // 修改
      // const param = {
      //   id: 1,
      //   name: "vue3",
      //   count: 1,
      //   createTime: new Date().getTime().toString(),
      //   studyLink: "http://baidu.com4",
      //   priority: 9,
      //   isEffective: "1",
      // };
      // changeItem(param);
      // // 查询
      // queryAll();
      // 新增
      // const param = {
      //   categoryId: 2,
      //   categoryName: "name",
      //   question: "question",
      //   answer: "answer",
      //   createTime: "2022年12月8日 20点02分",
      // };
      // addTiWen(param).then((res) => {
      //   console.log(res);
      // });

      // 删除
      // const param = {
      //   id: 1,
      // };
      // deleteTiWen(param).then((res) => {
      //   console.log(res);
      // });

      // 修改
      // const param = {
      //   categoryId: 666,
      //   categoryName: "name666",
      //   question: "question666",
      //   answer: "answer666",
      //   createTime: "2022年12月8日 20点02分666",
      //   isEffective: "666",
      //   isMastered: "666",
      //   id: 6,
      // };
      // changeTiWen(param).then((res) => {
      //   console.log(res);
      // });

      // 查询
      queryAllTiWen();
    });
    return {
      state,
    };
  },
});
</script>

<template>
  <div class="layout">
    <span>{{ state.test }}</span>
  </div>
</template>

<style scoped lang="less"></style>

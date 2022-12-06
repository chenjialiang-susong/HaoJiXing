<script lang="ts">
import { defineComponent, reactive, onMounted } from "vue";
import { test, addItem, deleteItem, changeItem, queryAll } from "@/api/request";
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
      const param = {
        id: 1,
        name: "vue3",
        count: 1,
        createTime: new Date().getTime().toString(),
        studyLink: "http://baidu.com4",
        priority: 9,
        isEffective: "1",
      };
      changeItem(param);

      // 查询
      queryAll();
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

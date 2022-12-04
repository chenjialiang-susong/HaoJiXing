<script lang="ts">
import { defineComponent, reactive, onMounted } from "vue";
import { test } from "@/api/request";
export default defineComponent({
  setup() {
    const state = reactive({
      test: "test666",
    });
    onMounted(() => {
      test(1)
        .then((res) => {
          debugger;
        })
        .catch((err) => {
          debugger;
        });
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

<script lang="ts">
import { defineComponent } from "vue";
import test from "@/components/Test.vue";
import mar from "@/components/marked.vue";
export default defineComponent({
  name: "App",
  components: { test, mar },
});
</script>

<template>
  <div class="layout">
    <test></test>
    <mar></mar>
  </div>
</template>

<style scoped lang="less"></style>

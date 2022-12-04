<script lang="ts">
import { defineComponent } from "vue";
import test from "@/components/Test.vue";
export default defineComponent({
  name: "App",
  components: { test },
});
</script>

<template>
  <div class="layout">
    <test></test>
  </div>
</template>

<style scoped lang="less"></style>

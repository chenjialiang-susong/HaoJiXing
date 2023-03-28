<template>
  <!-- 题问项展示 -->
  <div class="tiwen-show">
    <div class="operate">
      <el-select
        ref="selectCategoryRef"
        @change="onCategorySelected"
        v-model="curEditTiwen.CATEGORY_ID"
        placeholder="请选择分类"
      >
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.value"
          :value="item.label"
        />
      </el-select>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref, shallowRef } from "vue";
import { queryAllCategory } from "@/api/category";
interface CateModel {
  ID: number;
  NAME: string;
  COUNT: number;
  CREATE_TIME: string;
  STUDY_LINK: string;
  PRIORITY: number;
  IS_EFFECTIVE: string;
  [index: string]: any;
}
interface TiwenModel {
  ID?: number;
  CATEGORY_NAME?: string;
  CATEGORY_ID?: number;
  QUESTION?: string;
  ANSWER?: string;
  CREATE_TIME?: string;
  IS_MASTERED?: string;
  IS_EFFECTIVE?: string;
  [index: string]: any;
}
interface ListItem {
  value: string;
  label: number;
}
onMounted(() => {
  queryCategory();
});
const curEditTiwen: TiwenModel = reactive({
  ID: 0,
});
const options = ref<ListItem[]>([]);
const selectCategoryRef = ref();
const onCategorySelected = (val: any) => {
  curEditTiwen.CATEGORY_ID;
  console.log(selectCategoryRef.value.selected);
};
const queryCategory = () => {
  queryAllCategory()
    .then((res: any) => {
      if (res.errorCode === 1) {
        res.data.forEach((element: CateModel) => {
          const it: ListItem = {
            value: element.NAME,
            label: element.ID,
          };
          options.value.push(it);
        });
      } else {
        options.value = [];
      }
    })
    .catch((err) => {
      options.value = [];
      throw new Error(err);
    });
};
</script>

<style scoped lang="less">
.tiwen-show {
  padding: 24px;
  .operate {
    padding: 8px;
    border-bottom: gray 2px solid;
  }
}
</style>

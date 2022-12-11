<template>
  <div class="category-add">
    <div class="operate">
      <el-button type="primary" @click="queryCategory">表格刷新</el-button>
      <el-button type="primary" @click="openCategoryAddDialog"
        >添加分类</el-button
      >
    </div>
    <div class="category-list">
      <el-table :data="state.categoryList" style="width: 100%" border stripe>
        <el-table-column prop="NAME" label="名称" />
        <el-table-column prop="COUNT" label="题问项总数" />
        <el-table-column label="学习官网">
          <template #default="scope">
            <a :href="scope.row.STUDY_LINK" target="_blank">{{
              scope.row.STUDY_LINK
            }}</a>
          </template>
        </el-table-column>
        <el-table-column prop="CREATE_TIME" label="创建时间" />
        <el-table-column prop="IS_EFFECTIVE" label="是否生效" />
        <el-table-column prop="PRIORITY" label="优先级" />
      </el-table>
    </div>
    <el-dialog
      v-if="showAddCategory"
      v-model="showAddCategory"
      title="Shipping address"
    >
      <el-form
        ref="ruleFormRef"
        :model="form"
        :rules="rules"
        status-icon
        label-width="120px"
        class="demo-ruleForm"
      >
        <el-form-item
          label="分类名称"
          :label-width="formLabelWidth"
          prop="name"
          clearable
        >
          <el-input v-model="form.name" autocomplete="off" />
        </el-form-item>
        <el-form-item
          label="学习官网"
          :label-width="formLabelWidth"
          prop="studyLink"
          clearable
        >
          <el-input v-model="form.studyLink" autocomplete="off" />
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="showAddCategory = false">取消</el-button>
          <el-button type="primary" @click="confirm(ruleFormRef)">
            确认
          </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { addCategory, queryAllCategory } from "@/api/category";
import { onMounted, reactive, ref } from "vue";
import type { FormInstance, FormRules } from "element-plus";
import moment from "moment";
const formLabelWidth = "140px";
const ruleFormRef = ref<FormInstance>();
const showAddCategory = ref(false);
const rules = reactive<FormRules>({
  name: [{ required: true, message: "请输入分类名称", trigger: "blur" }],
  studyLink: [
    {
      required: true,
      message: "请输入正确的url地址，如：http://baidu.com",
      trigger: "blur",
      type: "url",
    },
  ],
});

interface CateModel {
  NAME: string;
  COUNT: number;
  CREATE_TIME: string;
  STUDY_LINK: string;
  PRIORITY: number;
  IS_EFFECTIVE: string;
  [index: string]: any;
}
const form = reactive({
  name: "",
  studyLink: "",
});
const state = reactive({
  categoryList: [],
});
const queryCategory = () => {
  queryAllCategory()
    .then((res: any) => {
      if (res.errorCode === 1) {
        res.data.forEach((element: CateModel) => {
          element.IS_EFFECTIVE = element.IS_EFFECTIVE === "1" ? "有效" : "失效";
        });
        state.categoryList = res.data;
      } else {
        state.categoryList = [];
      }
    })
    .catch((err) => {
      state.categoryList = [];
      throw new Error(err);
    });
};
onMounted(() => {
  queryCategory();
});
const confirm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  await formEl.validate((valid, fields) => {
    if (valid) {
      showAddCategory.value = false;
      const param = {
        name: form.name,
        createTime: moment().format("YYYY年MM月DD日 hh:mm:ss"),
        studyLink: form.studyLink,
      };
      addCategory(param)
        .then((res: any) => {
          if (res.errorCode === 1) {
            queryCategory();
          }
        })
        .catch((err) => {
          throw new Error(err);
        });
    } else {
      console.log("error submit!", fields);
    }
  });
};
const openCategoryAddDialog = () => {
  form.name = "";
  form.studyLink = "";
  showAddCategory.value = true;
};
</script>

<style scoped lang="less">
.category-add {
  .operate {
    padding: 8px;
    border-bottom: gray 2px solid;
  }
  .category-list {
    padding: 24px;
  }
}
</style>

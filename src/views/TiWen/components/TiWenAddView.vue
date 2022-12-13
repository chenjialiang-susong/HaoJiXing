<template>
  <div class="tiwen-add">
    <div class="operate">
      <el-button type="primary" @click="queryTiwen">表格刷新</el-button>
      <el-button type="primary" @click="openTiwenAddDialog"
        >添加题问项</el-button
      >
    </div>
    <div class="tiwen-list">
      <el-table :data="state.tiwenList" style="width: 100%" border stripe>
        <el-table-column prop="CATEGORY_NAME" label="分类名称" />
        <el-table-column prop="QUESTION" label="问题描述" />
        <el-table-column prop="ANSWER" label="答案">
          <template #default="scope">
            <el-popover
              effect="light"
              trigger="hover"
              placement="top"
              width="auto"
            >
              <template #default>
                <div>{{ scope.row.ANSWER }}</div>
              </template>
              <template #reference>
                <el-tag>查看答案</el-tag>
              </template>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column prop="CREATE_TIME" label="创建时间" />
        <el-table-column prop="IS_EFFECTIVE" label="是否生效" />
        <el-table-column prop="IS_MASTERED" label="是否掌握" />
        <el-table-column fixed="right" label="Operations" width="120">
          <template #default="scope">
            <el-button
              link
              type="primary"
              size="small"
              @click="openEditTiwen(scope.row)"
              >编辑</el-button
            >
            <el-button
              link
              type="primary"
              size="small"
              @click="openDeleteTiwen(scope.row)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 新增 题问项弹窗  全屏 -->
    <el-dialog
      v-if="showAddTiwen"
      v-model="showAddTiwen"
      title="Shipping address"
      :align-center="false"
      fullscreen
      draggable
    >
      <el-form
        ref="ruleFormRef"
        :model="form"
        :rules="rules"
        status-icon
        label-width="120px"
        class="demo-ruleForm"
      >
        <el-row>
          <el-col :span="12">
            <el-form-item
              label="分类名称"
              :label-width="formLabelWidth"
              prop="categoryId"
              clearable
            >
              <el-select
                ref="selectRef"
                @change="onSelected"
                v-model="form.categoryId"
                placeholder="请选择分类"
              >
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.value"
                  :value="item.label"
                />
              </el-select>
            </el-form-item>
            <el-form-item
              label="问题描述"
              :label-width="formLabelWidth"
              prop="question"
              clearable
            >
              <el-input v-model="form.question" autocomplete="off" />
            </el-form-item>
            <el-form-item
              label="答案"
              :label-width="formLabelWidth"
              prop="answer"
              clearable
            >
              <el-input
                type="textarea"
                v-model="form.answer"
                autocomplete="off"
                @input="answerChanged"
                rows="10"
              />
            </el-form-item>
            <span class="dialog-footer">
              <el-button @click="showAddTiwen = false">取消</el-button>
              <el-button type="primary" @click="confirm(ruleFormRef)">
                确认
              </el-button>
            </span>
          </el-col>
          <el-col :span="12" class="markdown-area">
            <div v-html="markdownToHtml" class="markdown-body"></div>
          </el-col>
        </el-row>
      </el-form>
    </el-dialog>
    <!-- 删除 题问项弹窗 -->
    <el-dialog
      v-if="showDelTiwen"
      v-model="showDelTiwen"
      title="Tips"
      width="30%"
    >
      <span>确认删除该条问题吗？</span>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="showDelTiwen = false">取消</el-button>
          <el-button type="primary" @click="delTiwenFun"> 确认 </el-button>
        </span>
      </template>
    </el-dialog>
    <!-- 编辑 题问项弹窗  全屏 -->
    <el-dialog
      v-if="showEditTiwen"
      v-model="showEditTiwen"
      title="编辑题问项"
      :align-center="false"
      fullscreen
    >
      <el-form
        ref="ruleFormEditRef"
        :model="curEditTiwen"
        :rules="rulesEdit"
        status-icon
        label-width="120px"
      >
        <el-row>
          <el-col :span="12">
            <el-form-item
              label="分类名称"
              :label-width="formLabelWidth"
              clearable
            >
              <el-select
                ref="selectEditRef"
                @change="onSelectedEdit"
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
            </el-form-item>
            <el-form-item label="是否生效" :label-width="formLabelWidth">
              <el-radio-group v-model="curEditTiwen.IS_EFFECTIVE" class="ml-4">
                <el-radio label="1" size="large">生效</el-radio>
                <el-radio label="0" size="large">无效</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="是否掌握" :label-width="formLabelWidth">
              <el-radio-group v-model="curEditTiwen.IS_MASTERED" class="ml-4">
                <el-radio label="1" size="large">已掌握</el-radio>
                <el-radio label="0" size="large">未掌握</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item
              label="问题描述"
              :label-width="formLabelWidth"
              prop="QUESTION"
              clearable
            >
              <el-input v-model="curEditTiwen.QUESTION" autocomplete="off" />
            </el-form-item>
            <el-form-item
              label="答案"
              :label-width="formLabelWidth"
              prop="QUESTION"
              clearable
            >
              <el-input
                type="textarea"
                v-model="curEditTiwen.ANSWER"
                autocomplete="off"
                @input="answerChanged"
                rows="10"
              />
            </el-form-item>
            <span class="dialog-footer">
              <el-button @click="showEditTiwen = false">取消</el-button>
              <el-button type="primary" @click="confirmEdit(ruleFormEditRef)">
                确认
              </el-button>
            </span>
          </el-col>
          <el-col :span="12" class="markdown-area">
            <div v-html="markdownToHtml" class="markdown-body"></div>
          </el-col>
        </el-row>
      </el-form>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { addTiWen, queryAllTiWen, deleteTiWen, changeTiWen } from "@/api/tiWen";
import { queryAllCategory } from "@/api/category";
import { onMounted, reactive, ref, shallowRef } from "vue";
import type { FormInstance, FormRules } from "element-plus";
import moment from "moment";
import { marked } from "marked";
import hljs from "highlight.js";
import "highlight.js/styles/foundation.css";
const render = new marked.Renderer();
marked.setOptions({
  renderer: render, // 这是必填项
  gfm: true, // 启动类似于Github样式的Markdown语法
  pedantic: false, // 只解析符合Markdwon定义的，不修正Markdown的错误
  sanitize: false, // 原始输出，忽略HTML标签（关闭后，可直接渲染HTML标签）

  // 高亮的语法规范
  highlight: (code, lang) => hljs.highlight(code, { language: lang }).value,
});

const formLabelWidth = "140px";
const ruleFormRef = ref<FormInstance>();
const ruleFormEditRef = ref<FormInstance>();
const selectRef = ref();
const selectEditRef = ref();
const showAddTiwen = ref(false);
const showDelTiwen = ref(false);
const showEditTiwen = ref(false);

const rules = reactive<FormRules>({
  categoryId: [{ required: true, message: "请选择分类", trigger: "change" }],
  question: [{ required: true, message: "请输入题问项名称", trigger: "blur" }],
  answer: [{ required: true, message: "请输入答案", trigger: "blur" }],
});
const rulesEdit = reactive<FormRules>({
  QUESTION: [{ required: true, message: "请输入题问项名称", trigger: "blur" }],
  ANSWER: [{ required: true, message: "请输入答案", trigger: "blur" }],
});
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
interface Form {
  categoryId: number | undefined;
  question: string;
  answer: string;
}
const form = reactive<Form>({
  categoryId: undefined,
  question: "",
  answer: "",
});
const state = reactive({
  tiwenList: [],
});
const curDeleteTiwen: TiwenModel = reactive({
  ID: 0,
});
const curEditTiwen: TiwenModel = reactive({
  ID: 0,
});
const markdownToHtml = shallowRef("");
markdownToHtml.value = marked(form.answer);

const answerChanged = (value: string) => {
  markdownToHtml.value = marked(value);
};
const onSelected = (val: any) => {
  console.log(selectRef.value.selected);
};
const onSelectedEdit = (val: any) => {
  curEditTiwen.CATEGORY_ID;
  console.log(selectRef.value.selected);
};

const queryTiwen = () => {
  queryAllTiWen()
    .then((res: any) => {
      if (res.errorCode === 1) {
        res.data.forEach((element: TiwenModel) => {
          // element.IS_EFFECTIVE = element.IS_EFFECTIVE === "1" ? "有效" : "失效";
          // element.IS_MASTERED =
          //   element.IS_MASTERED === "1" ? "已掌握" : "尚未掌握";
        });
        state.tiwenList = res.data;
      } else {
        state.tiwenList = [];
      }
    })
    .catch((err) => {
      state.tiwenList = [];
      throw new Error(err);
    });
};
const openEditTiwen = (curEditItemTiwen: TiwenModel) => {
  curEditTiwen.ID = curEditItemTiwen.ID;
  curEditTiwen.CATEGORY_ID = curEditItemTiwen.CATEGORY_ID;
  curEditTiwen.CATEGORY_NAME = curEditItemTiwen.CATEGORY_NAME;
  curEditTiwen.QUESTION = curEditItemTiwen.QUESTION;
  curEditTiwen.ANSWER = curEditItemTiwen.ANSWER;
  curEditTiwen.IS_EFFECTIVE = curEditItemTiwen.IS_EFFECTIVE;
  curEditTiwen.IS_MASTERED = curEditItemTiwen.IS_MASTERED;
  showEditTiwen.value = true;
};
const openDeleteTiwen = (curDelTiwen: TiwenModel) => {
  curDeleteTiwen.ID = curDelTiwen.ID;
  showDelTiwen.value = true;
};
const delTiwenFun = () => {
  const param = {
    id: curDeleteTiwen.ID,
  };
  deleteTiWen(param)
    .then((res: any) => {
      showDelTiwen.value = false;
      if (res.errorCode === 1) {
        queryTiwen();
      } else {
        // queryTiwen();
        // todo
      }
    })
    .catch((err) => {
      showDelTiwen.value = false;
      throw new Error(err);
    });
};
onMounted(() => {
  queryTiwen();
});
interface ListItem {
  value: string;
  label: number;
}

const options = ref<ListItem[]>([]);
const loading = ref(false);
const queryCategory = () => {
  queryAllCategory()
    .then((res: any) => {
      loading.value = false;
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
      loading.value = false;
      options.value = [];
      throw new Error(err);
    });
};
onMounted(() => {
  queryCategory();
});

const confirm = async (formEl: FormInstance | undefined) => {
  console.log("form.categoryId", form.categoryId);
  if (!formEl) return;
  await formEl.validate((valid, fields) => {
    if (valid) {
      showAddTiwen.value = false;
      const param = {
        categoryId: form.categoryId,
        categoryName: selectRef.value.selected.currentLabel,
        question: form.question,
        answer: form.answer,
        createTime: moment().format("YYYY年MM月DD日 hh:mm:ss"),
      };
      addTiWen(param)
        .then((res: any) => {
          if (res.errorCode === 1) {
            queryTiwen();
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
const confirmEdit = async (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  await formEl.validate((valid, fields) => {
    if (valid) {
      showEditTiwen.value = false;
      debugger;
      const param = {
        categoryId: selectEditRef.value.selected.value,
        categoryName: selectEditRef.value.selected.currentLabel,
        // categoryId: curEditTiwen.CATEGORY_ID,
        // categoryName: curEditTiwen.CATEGORY_NAME,
        question: curEditTiwen.QUESTION,
        answer: curEditTiwen.ANSWER,
        isEffective: curEditTiwen.IS_EFFECTIVE,
        isMastered: curEditTiwen.IS_MASTERED,
        id: curEditTiwen.ID,
      };
      changeTiWen(param)
        .then((res: any) => {
          if (res.errorCode === 1) {
            queryTiwen();
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
const openTiwenAddDialog = () => {
  form.question = "";
  form.answer = "";
  form.categoryId = undefined;
  showAddTiwen.value = true;
};
</script>

<style scoped lang="less">
.tiwen-add {
  .operate {
    padding: 8px;
    border-bottom: gray 2px solid;
  }
  .tiwen-list {
    padding: 24px;
  }
  .markdown-area {
    padding: 24px;
    background-color: black;
    overflow: auto;
    height: 680px;
  }
}
</style>

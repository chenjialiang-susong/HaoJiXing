// 导入axios实例

import httpRequest from "@/request/index";

// 新增
export function addCategory(data: any) {
  return httpRequest({
    url: "/api/category/addCategory",
    method: "post",
    data,
  });
}

// 删除
export function deleteCategory(data: any) {
  return httpRequest({
    url: "/api/category/deleteCategory",
    method: "post",
    data,
  });
}

// 修改
export function changeCategory(data: any) {
  return httpRequest({
    url: "/api/category/changeCategory",
    method: "post",
    data,
  });
}

// 查询
export function queryAllCategory() {
  return httpRequest({
    url: "/api/category/queryAllCategory",
    method: "post",
  });
}

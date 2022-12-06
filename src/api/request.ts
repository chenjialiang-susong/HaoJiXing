// 导入axios实例

import httpRequest from "@/request/index";

// 查询test
export function test(data: any) {
  // register是封装好的接口名

  return httpRequest({
    url: "/api/users/tt",
    method: "get",
    data,
  });
}

// 新增
export function addItem(data: any) {
  return httpRequest({
    url: "/api/category/addItem",
    method: "post",
    data,
  });
}

// 删除
export function deleteItem(data: any) {
  return httpRequest({
    url: "/api/category/deleteItem",
    method: "post",
    data,
  });
}

// 修改
export function changeItem(data: any) {
  return httpRequest({
    url: "/api/category/changeItem",
    method: "post",
    data,
  });
}

// 查询
export function queryAll() {
  return httpRequest({
    url: "/api/category/queryAll",
    method: "post",
  });
}

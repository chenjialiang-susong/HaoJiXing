// 导入axios实例

import httpRequest from "@/request/index";

// 新增
export function addTiWen(data: any) {
  return httpRequest({
    url: "/api/tiWen/addTiWen",
    method: "post",
    data,
  });
}

// 删除
export function deleteTiWen(data: any) {
  return httpRequest({
    url: "/api/tiWen/deleteTiWen",
    method: "post",
    data,
  });
}

// 修改
export function changeTiWen(data: any) {
  return httpRequest({
    url: "/api/tiWen/changeTiWen",
    method: "post",
    data,
  });
}

// 查询
export function queryAllTiWen() {
  return httpRequest({
    url: "/api/tiWen/queryAllTiWen",
    method: "post",
  });
}

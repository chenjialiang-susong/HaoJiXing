// 导入axios实例

import httpRequest from "@/request/index";

// 查询test
export function test(data: any) {
  // register是封装好的接口名

  return httpRequest({
    url: "/api/users",
    method: "get",
    data,
  });
}

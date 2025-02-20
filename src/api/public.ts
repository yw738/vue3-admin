import request from "@/utils/request";
/**
 * # 公共文件
 * 定义请求类型
 * 2021-07-09
*/

// get
export const get = (url: string, data: object = {}) =>
  request({
    url: url,
    method: "get",
    params: data
  });

// post
export const post = (url: string, data: object = {}) =>
  request({
    url: url,
    method: "post",
    data
  });
// postFile
export const postFile = (url: string, data: object = {}) =>
  request({
    url: url,
    method: "post",
    responseType: "blob",
    data
  });
// put
export const put = (url: string, data: object = {}) =>
  request({
    url: url,
    method: "put",
    data
  });
// put
export const putFile = (url: string, data: object = {}) =>
  request({
    url: url,
    method: "put",
    responseType: "blob",
    data
  });


// del
export const del = (url: string, data: object = {}) =>
  request({
    url: url,
    method: "delete",
    data
  });

//get 下载文件
export const getFile = (url: string, data: object = {}) =>
  request({
    url: url,
    method: "get",
    params: data,
    responseType: "blob"
  });


// export default {
//   get,
//   post,
//   getFile
// };

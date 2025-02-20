/**
 *  查询自定义列表
 */
import {
  get,
  post,
  getFile,
  put,
  del
} from "@/api/public.js";


export const customListApi = {
  get: (data: any) => get(`/crm-core/customList/queryCustomList`, data),//查询自定义列表
  post: (data: any) => post(`/crm-core/customList/insertOrUpdateCustomList`, data),//新增或者更新自定义列表

};

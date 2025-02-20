import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

/**
 *  订单 api
 */
import {
  get,
  post,
  getFile,
  put,
  del
} from "@/api/public.js";

/* 订单api */
export const orderApi = {
  add: (data: any) => post(`/crm-core/order`, data), //添加 ok
  update: (data: any) => put(`/crm-core/order`, data), //编辑 ok
  del: (id: any) => del(`/crm-core/order/${id}`, {}), //删除  ok
  top: (id: any) => put(`/crm-core/order/top/${id}`, {}), //置顶  ok
  cooperation: (data: any) => post(`/crm-core/order/add-cooperation`, data), //  订单协作 ok
  getDetail: (id: any) => get(`/crm-core/details/client-order-details/${id}`, {}),//详情 ok
  uploadFile: (data: any) => post(`/crm-core/order/upload-order-file`, data), //订单文件上传  不做
  getList: (data: any) => get(`/crm-core/order`, data),//查询  ok

  businessList: () => get(`/crm-core/order/order-business`, {}),//关联客户及商机查询 ok
};

//订单类型
export const queryType = [
  { label: '1', value: 'ALL' },
  { label: '2', value: 'MY' },
  { label: '3', value: 'UNDERLING' },
  { label: '4', value: 'MY_COOPERATION' },
  { label: '5', value: 'SUBORDINATE_COLLABORATION' },
]

// 查询类型
export const getTypeName = (num = '1', arr = queryType) => {
  return arr?.filter(v => v.label == num)[0]?.value || ""
}

// 付款方式
export const payType = [
  { label: '对公账户', value: 0 },
  { label: '对私账户', value: 1 },
  { label: '现金', value: 2 },
]

// 订单状态
export const orderState = [
  { label: '已通过', value: 0 },
  { label: '待审批', value: 1 },
]

// 订单类型
export const orderType = [

]

/**
 * 产品模块
*/
/* 产品api */
export const queryProductApi = {
  getList: (data: any) => get(`/crm-core/product/query-product-profession`, data),//产品查询
  getType: () => get(`/crm-core/product-classify/query-product-classify`, {}),//产品类别

};

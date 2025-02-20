/**
 *  呼叫 api
 */
import {
  get,
  post,
  getFile,
  put,
  del
} from "@/api/public.js";

/* 呼叫中心api */
export const callApi = {
  phoneCallEnd: () => get(`/call-center-core/seatapp/phone-down`, {}), //挂断
  phoneCall: (data: any) => post(`/call-center-core/seatapp/phone-call`, data), //坐席端-呼叫   ok

  callPhone: (data: any) => post(`/crm-core/wechat/dial-number`, data), //拨打号码
};


/* 首页api */
export const indexApi = {
  briefing: (data: any) => get(`/crm-core/index/data-briefing`, data), //数据简报
  targets: (data: any) => get(`/crm-core/index/performance-targets`, data), //业绩目标
  ranking: (data: any) => get(`/crm-core/index/performance-ranking`, data), //业绩排行
  forecast: (data: any) => get(`/crm-core/index/sales-forecast`, data), //销售预测

  funnel: (data: any) => get(`/crm-core/index/sales-funnel`, data), //销售漏斗
  calendar: (data: any) => get(`/crm-core/index/task-calendar`, data), //任务日历


};


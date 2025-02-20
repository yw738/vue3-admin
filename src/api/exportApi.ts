/**
 *  导出api
 */
import { getFile } from "@/api/public.js";

/* 导出 */
export const exportApi = {
  sendDetail: {
    name: '发送记录列表',
    down: (data: any) => getFile(`/sms-core/send-detail/export`, data)
  },

  smsContact: {
    name: '短信记录导出',
    down: (data: any) => getFile(`/crm-core/sms-contact/export`, data)
  },
  // 2022-10-20 新增
  myClient: {
    name: '我的客户列表',
    down: (data: any) => getFile(`/crm-core/export/my-client`, data)
  },
  underClient: {
    name: '下属客户列表',
    down: (data: any) => getFile(`/crm-core/export/query-client-underling`, data)
  },
  cooperClient: {
    name: '我协作的客户列表',
    down: (data: any) => getFile(`/crm-core/export/query-client-cooperate`, data)
  },
  subordClient: {
    name: '下属协作的客户列表',
    down: (data: any) => getFile(`/crm-core/export/query-client-subordinateCollaboration`, data)
  },
  highSeas: {
    name: '公海客户列表',
    down: (data: any) => getFile(`/crm-core/export/query-client-highSeas`, data)
  },
  garbage: {
    name: '垃圾客户列表',
    down: (data: any) => getFile(`/crm-core/export/query-client-garbage`, data)
  },
  clue: {
    name: '我的销售线索列表',
    down: (data: any) => getFile(`/crm-core/export/query-clue-list`, data)
  },
  underClue: {
    name: '下属线索列表',
    down: (data: any) => getFile(`/crm-core/export/query-clue-underling`, data)
  },
  commonClue: {
    name: '公共线索查询列表',
    down: (data: any) => getFile(`/crm-core/export/query-clue-common`, data)
  },

  myBusiness: {
    name: '我的商机列表',
    down: (data: any) => getFile(`/crm-core/export/query-my-business`, data)
  },
  underBusiness: {
    name: '下属商机列表',
    down: (data: any) => getFile(`/crm-core/export/query-business-underling`, data)
  },
  cooperBusiness: {
    name: '我协作商机列表',
    down: (data: any) => getFile(`/crm-core/export/query-business-cooperate`, data)
  },
  cooperUnderBusiness: {
    name: '下属协作商机列表',
    down: (data: any) => getFile(`/crm-core/export/query-business-underling-cooperate`, data)
  },
  myOrder: {
    name: '我的订单列表',
    down: (data: any) => getFile(`/crm-core/export/query-my-order`, data)
  },
  underOrder: {
    name: '下属订单列表',
    down: (data: any) => getFile(`/crm-core/export/query-order-underling`, data)
  },
  cooperOrder: {
    name: '我的协作订单列表',
    down: (data: any) => getFile(`/crm-core/export/query-order-cooperate`, data)
  },
  underCooperOrder: {
    name: '下属协作订单列表',
    down: (data: any) => getFile(`/crm-core/export/query-order-underling-cooperate`, data)
  },
  myContact: {
    name: '我的联系人列表',
    down: (data: any) => getFile(`/crm-core/export/query-contact-my`, data)
  },
  underContact: {
    name: '下属的联系人列表',
    down: (data: any) => getFile(`/crm-core/export/query-contact-underling`, data)
  },
  coopContact: {
    name: '我协作的联系人列表',
    down: (data: any) => getFile(`/crm-core/export/query-contact-cooperate`, data)
  },
  underCoopContact: {
    name: '下属协作的联系人',
    down: (data: any) => getFile(`/crm-core/export/query-contact-underling-cooperate`, data)
  },
  product: {
    name: '产品管理产品查询',
    down: (data: any) => getFile(`/crm-core/export/query-product`, data)
  },
  followList: {
    name: '跟进记录查询',
    down: (data: any) => getFile(`/crm-core/export/query-follow-info`, data)
  },
  taskList: {
    name: '我发起的任务',
    down: (data: any) => getFile(`/crm-core/export/task-info`, data)
  },
  taskBeResponsi: {
    name: '我负责的任务',
    down: (data: any) => getFile(`/crm-core/export/task-info-beResponsibleFor`, data)
  },
  taskJoin: {
    name: '我参与的任务',
    down: (data: any) => getFile(`/crm-core/export/task-info-join`, data)
  },
  taskUnder: {
    name: '下属负责的任务',
    down: (data: any) => getFile(`/crm-core/export/task-info-underling-beResponsibleFor`, data)
  },

  failDownload: {
    name: '失败下载',
    down: (data: any) => getFile(`/crm-core/import/fail-download`, data)
  },
  fileTemplate: {
    name: '模板下载',
    down: (data: any) => getFile(`/crm-core/import/download-template`, data)
  },
  // 2023-03-31 新增导出
  orderPendingTasks: {
    name: '订单审批列表导出',
    down: (data: any) => getFile(`/crm-core/export/order-pending-tasks`, data)
  },
  turnover: {
    name: '业绩完成度-成交金额导出',
    down: (data: any) => getFile(`/crm-core/export/turnover`, data)
  },
  refundAmount: {
    name: '业绩完成度-回款金额导出',
    down: (data: any) => getFile(`/crm-core/export/refund-amount`, data)
  },
  productSummary: {
    name: '产品销量分析-按产品/分类汇总导出',
    down: (data: any) => getFile(`/crm-core/export/product-summary`, data)
  },
  summaryTime: {
    name: '产品销量分析-按时间汇总',
    down: (data: any) => getFile(`/crm-core/export/summary-time`, data)
  },
  refundPage: {
    name: '回款列表导出',
    down: (data: any) => getFile(`/crm-core/export/refund-page`, data)
  },
  invoicePage: {
    name: '发票列表导出',
    down: (data: any) => getFile(`/crm-core/export/invoice-page`, data)
  },
  // ----------------------------------------------------------------------
};

import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

/**
 *  客户/线索模块 api
 */
import {
  get,
  post,
  getFile,
  put,
  del
} from "@/api/public.js";

/* 线索api */
export const clueApi = {
  add: (data: any) => post(`/crm-core/client/addClue`, data), //添加  ok
  update: (data: any) => post(`/crm-core/client/updateClue`, data), //编辑 ok
  del: (id: any) => del(`/crm-core/client/deleteClue/${id}`, {}), //删除   ok
  top: (id: any) => put(`/crm-core/client/topClue/${id}`, {}), //线索置顶  ok
  receiveClue: (id: any) => put(`/crm-core/client/receiveClue/${id}`, {}), //领取线索  ok
  divertClue: (data: any) => post(`/crm-core/client/divert-clue`, data), //转移线索  ok
  assignLeads: (data: any) => post(`/crm-core/client/assign-leads`, data), //分配线索



  convert2customer: (data: any) => post(`/crm-core/client/convert-to-customer`, data), //转为客户  ok
  setfocus: (id: any) => put(`/crm-core/client/focus/${id}`, {}), //关注 ok
  cancelfocus: (id: any) => put(`/crm-core/client/unsubscribe/${id}`, {}), //取消关注  ok

  //销售线索查询  ok
  getList: (data: any) => get(`/crm-core/client/query-clue-list`, data),

  // 公共线索查询  ok
  getList2: (data: any) => get(`/crm-core/client/query-clue-common`, data),

};

/* 客户api */
export const clientApi = {
  add: (data: any) => post(`/crm-core/client/addClient`, data), //添加 ok
  addSea: (data: any) => post(`/crm-core/client/add-high-seas-customers`, data), //添加 ok

  update: (data: any) => post(`/crm-core/client/updateClient`, data), //编辑 ok
  getDetail: (id: any) => get(`/crm-core/details/client-basic-info/${id}`, {}), // ok
  superiorList: () => get(`/crm-core/client/superior-customer`, {}), // 上级客户 ok




  del: (id: any) => del(`/crm-core/client/deleteClient/${id}`, {}), //删除 ok
  top: (id: any) => put(`/crm-core/client/topClient/${id}`, {}), //置顶 ok

  shiftClient: (data: any) => post(`/crm-core/client/shiftClient`, data), //转移客户
  assignClient: (data: any) => post(`/crm-core/client/assign-customers`, data), //分配客户

  move2Seas: (data: any) => post(`/crm-core/client/moveIntoTheHighSeas`, data), //移入公海 ok
  receiveClient: (id: any) => put(`/crm-core/client/receiveClient/${id}`, {}), //领取客户 ok

  //客户列表查询  => 我的客户
  getList: (data: any) => get(`/crm-core/client/query-client-list`, data),
  // 公海客户查询 ok
  getList2: (data: any) => get(`/crm-core/client/query-client-highSeas`, data),
  // 垃圾客户查询 ok
  getList3: (data: any) => get(`/crm-core/client/query-client-garbage`, data),

  // queryEmployee: (data: any = {}) => get(`/crm-core/employee/query-employees`, data),//根据部门ID查询员工  ok
  queryEmployee: (data: any = {}) => {
    return new Promise((resolve, reject) => {
      resolve({
        data:[
          {name:'张三',id:'666'},
          {name:'王飞',id:'66'},
        ]
      })
    })
  },//根据部门ID查询员工  ok
  clientList: (data: any = {}) => get(`/crm-core/order/order-business`, data),//查客户  ok

  cooperation: (data: any) => post(`/crm-core/client/add-client-cooperation`, data), //添加协作


  // 列表接口拆分 2022-10-14
  // 客户列表
  getUnderlingList: (data: any) => get(`/crm-core/client/query-client-underling`, data),//下属客户
  getCooperateList: (data: any) => get(`/crm-core/client/query-client-cooperate`, data),//我协作的客户
  getSubordList: (data: any) => get(`/crm-core/client/query-client-subordinateCollaboration`, data),//下属协作的客户

  // 销售线索
  getClueList: (data: any) => get(`/crm-core/client/query-clue-list`, data),//我的销售线索
  getClueUnderList: (data: any) => get(`/crm-core/client/query-clue-underling`, data),//下属线索查询

  // 联系人
  getContactMyList: (data: any) => get(`/crm-core/contact/query-contact-my`, data),//我的联系人列表
  getContactUnderList: (data: any) => get(`/crm-core/contact/query-contact-underling`, data),//下属的联系人
  getContactCooperList: (data: any) => get(`/crm-core/contact/query-contact-cooperate`, data),//我的联系人列表
  getContactUnderCooperList: (data: any) => get(`/crm-core/contact/query-contact-underling-cooperate`, data),//下属协作的联系人

  // 商机
  getBusiList: (data: any) => get(`/crm-core/business`, data),//我的商机查询
  getBusiUnderList: (data: any) => get(`/crm-core/business/query-business-underling`, data),//下属商机
  getBusiCooperList: (data: any) => get(`/crm-core/business/query-business-cooperate`, data),//我协作商机
  getBusiUnderCooperList: (data: any) => get(`/crm-core/business/query-business-underling-cooperate`, data),//下属协作商机

  // 订单
  getOrderList: (data: any) => get(`/crm-core/order`, data),//我的订单查询
  getOrderUnderList: (data: any) => get(`/crm-core/order/query-order-underling`, data),//下属订单
  getOrderCooperList: (data: any) => get(`/crm-core/order/query-order-underling-cooperate`, data),//下属协作
  getOrderUnderCooperList: (data: any) => get(`/crm-core/order/query-order-cooperate`, data),//我的协作


  move2seasClue: (data: any) => post(`/crm-core/client/move-into-high-seas-leads`, data), //移入公海线索 ok
  recyclePick: (data: any) => post(`/crm-core/client/recycle-pick-up`, data), //回收站领取  ok
  recycleAllocation: (data: any) => post(`/crm-core/client/recycle-bin-allocation`, data), //回收站分配
  recycleDel: (id: any) => del(`/crm-core/client/deleteTrash/${id}`, {}), //回收站删除
  pickCustomer: (data: any) => post(`/crm-core/receive/pick-customer`, data), //领取客户



};

/* 联系人   api */
export const contactApi = {
  add: (data: any) => post(`/crm-core/contact`, data), //添加
  update: (data: any) => put(`/crm-core/contact`, data), //编辑
  getDetail: (id: any) => get(`/crm-core/contact/contact-client-details/${id}`, {}), //
  del: (id: any) => del(`/crm-core/contact/${id}`, {}), //删除
  getList: (data: any) => get(`/crm-core/contact`, data),//查询
};

/* 详情  api */
export const detailApi = {

  getDetail: (id: any) => get(`/crm-core/details/client-contact/${id}`, {}), //   ok
  clientContact: (id: any, data: any) => get(`/crm-core/details/client-contact/${id}`, data), //客户详情-联系人记录 ok
  clientLower: (id: any) => get(`/crm-core/details/client-lower/${id}`, {}), //下级客户 ok

  taskInfo: (data: any) => get(`/crm-core/details/task-info`, data), //任务记录列表，详情调用任务模块中的详情接口 ok
  clientBusiness: (id: any, data: any) => get(`/crm-core/details/client-business/${id}`, data), //客户详情-商机记录 ok
  clientOrder: (id: any, data: any) => get(`/crm-core/details/client-order/${id}`, data), //客户详情-订单记录 ok
  record: (id: any, data: any) => get(`/crm-core/details/attribution-record/${id}`, data), //客户详情-归属记录 ok


  orderDetail: (id: any) => get(`/crm-core/details/client-order-details/${id}`, {}), // 订单详情
  businessDetail: (id: any) => get(`/crm-core/details/client-business-details/${id}`, {}), // 商机详情 ok
  productQuote: (id: any) => get(`/crm-core/details/product-quote/${id}`, {}), // 商机详情-产品报价
  associatedOrder: (id: any) => get(`/crm-core/details/associated-order/${id}`, {}), // 商机详情-关联订单 ok
  orderProDetail: (id: any, data?: any) => get(`/crm-core/details/order-product-details/${id}`, data), // 订单详情-产品记录

  smsDetail: (data?: any) => post(`/crm-core/sms-contact/query-message-details`, data), // 短信记录查询


  // 2022-10-13 新增
  addBusProduct: (data?: any) => post(`/crm-core/business/add-business-product`, data), // 添加商品产品报价
  delBusProduct: (id?: any) => del(`/crm-core/business/delete-product/${id}`, {}), // 删除商机商品报价
  updateBusProduct: (data?: any) => post(`/crm-core/business/update-business-product`, data), // 编辑当前页商品产品报价




  callLog: (data?: any) => get(`/crm-core/details/call-records`, data), // 客户详情-通话记录
  getCallUrl: (data?: any) => get(`/crm-core/wechat/preview`, data), // 获取录音的在线播放地址
  callDownload: (data?: any) => get(`/crm-core/wechat/download`, data), // 获取录音的下载地址

};


// 文件上传之类
export const fileApi = {
  getUploadUrl: (data: any) => post(`/crm-core/file/file-upload`, data), //   获取上传文件链接地址
  download: (md: any, name: any) => get(`/crm-core/file/file-download/${md}/${name}`, {}), //附件下载地址获取
  preview: (md: any) => get(`/crm-core/file/preview-address/${md}`, {}), //附件预览地址获取

  orderFileList: (id: any, data: any) => get(`/crm-core/details/order-attachment/${id}`, data), //订单详情-相关附件
  taskFileList: (id: any) => get(`/crm-core/task/task-details/${id}`, {}), //任务详情-相关附件

  uploadOrderFile: (data: any) => post(`/crm-core/order/upload-order-file`, data), //订单文件上传
  orderDel: (id: any) => del(`/crm-core/order/file/${id}`, {}), //删除订单附件

  uploadTaskFile: (data: any) => post(`/crm-core/task/upload-task-file`, data), //任务上传完成后回调
  taskDel: (id: any) => del(`/crm-core/task/file/${id}`, {}), //删除任务附件

  queryAuthorized: () => get(`/crm-core/file/authorized-access-query`, {}), //获取上传用的授权访问AK/SK
}

/**
 * 生成一个请求
 * @param url {string} 请求地址
 * @param method {string} 请求类型
 * @param data {object} 请求参数
 *
 */
// createAxiosFn({
//   url:'/fixed/asset/export'
// }).then(res=>{
//   this.AnalysisBlobFile(res, "固定资产列表" + new Date().getTime() + ".xlsx");
// })
export const createAxiosFn = ({ url = "", data = {}, headers = {}, }) => {
  return axios({
    url: url,
    method: 'put',
    data: data,
    responseType: "blob",
    headers: headers
  }).then((res) => {
    return res.data
  }).catch((err) => {
    return err
  })
};



// 操作类型
export const ascriptionType = [
  { label: '自己领取', value: 0 },
  { label: '分配客户', value: 1 },
]

export const clientDistinguish = [
  { label: '线索', value: 0 },
  { label: '客户', value: 1 },
]


// 线索来源 || 客户来源
export const clueSource = [
  { label: '电话营销', value: 0 },
  { label: '主动来电', value: 1 },
  { label: '客户介绍', value: 2 },
  { label: '朋友介绍', value: 3 },
  { label: '独立开发', value: 4 },
  { label: '网络搜索', value: 5 },
  { label: '广告杂志', value: 6 },
  { label: '展会促销', value: 7 },
  { label: '其它途径', value: 8 },
]

// 公海客户、公海线索类型
export const clientHighType = [
  { label: '新增', value: 0 },
  { label: '退回', value: 1 },
]


// 线索状态
export const clueState = [
  { label: '初步意向', value: 0 },
  { label: '下次邀约', value: 1 },
  { label: '已转客户', value: 2 },
]
// 线索状态
export const clueState2 = [
  { label: '初步意向', value: 0 },
  { label: '下次邀约', value: 1 },
]

// 线索 查询类型
export const queryType = [
  { label: '1', value: 'ALL' },
  { label: '2', value: 'MY' },
  { label: '3', value: 'UNDERLING' },
  { label: '4', value: 'TRANSFERRED_CUSTOMER' },
]

// 客户 查询类型
export const queryType2 = [
  { label: '1', value: 'ALL' },
  { label: '2', value: 'MY' },
  { label: '3', value: 'UNDERLING' },
  { label: '4', value: 'IMPORTANT_CUSTOMER' },
  { label: '5', value: 'MY_COOPERATION' },
  { label: '6', value: 'SUBORDINATE_COLLABORATION' },
]

// 联系人 查询类型
export const queryType3 = [
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


// 客户类型
export const clientType = [
  { label: '普通客户', value: 0 },
  { label: '意向客户', value: 1 },

]

// 客户星级
export const clientStar = [
  { label: '1星', value: 1 },
  { label: '2星', value: 2 },
  { label: '3星', value: 3 },
  { label: '4星', value: 4 },
  { label: '5星', value: 5 },
]

// 客户状态
export const clientState = [
  { label: '了解产品', value: 0 },
  { label: '正在跟进', value: 1 },
  { label: '正在试用', value: 2 },
  { label: '准备购买', value: 3 },
  { label: '准备付款', value: 4 },
  { label: '已经购买', value: 5 },
]

// 所属行业
export const clientIndustry = [
  { label: '互联网IT', value: 0 },
  { label: '金融保险', value: 1 },
  { label: '房地产建筑', value: 2 },
  { label: '贸易零售', value: 3 },
  { label: '生活服务', value: 4 },
  { label: '商业服务', value: 5 },
  { label: '消费品', value: 6 },
  { label: '教育培训', value: 7 },
  { label: '电子商务', value: 8 },
  { label: '农牧渔业', value: 9 },
  { label: '政府机关', value: 10 },
  { label: '媒体娱乐', value: 11 },
  { label: '其他', value: 12 },
]

// 企业规模
export const enterpriseSize = [
  { label: '10人以内', value: 0 },
  { label: '10-20人', value: 1 },
  { label: '21人-50人', value: 2 },
  { label: '51人-200人', value: 3 },
  { label: '201人-500人', value: 4 },
  { label: '500人以上', value: 5 },
]

/*------------------------------------------------*/

// 尊称
export const honorific = [
  { label: '未知', value: 0 },
  { label: '男', value: 1 },
  { label: '女', value: 2 },
]

// 角色
export const clueRole = [
  { label: '普通人', value: 0 },
  { label: '决策人', value: 1 },
  { label: '分项决策人', value: 2 },
  { label: '商务决策', value: 3 },
  { label: '财务决策', value: 4 },
  { label: '使用人', value: 5 },
  { label: '意见影响人', value: 6 },
]

// 线索类型
export const clueType = [
  { label: '销售线索', value: 0 },
  { label: '公海线索', value: 1 },
]

/**
 * -------------------------------------------------------
*/


// 跟进状态
export const followUpStatus = [
  { label: '待跟进', value: 0 },
  { label: '跟进中', value: 1 },
  // { label: '有意向', value: 2 },
  // { label: '无意向', value: 3 },
]


// 联系人生日
export const birthdayQuery = [
  { label: '今天', value: 'TODAY' },
  { label: '明天', value: 'TOMORROW' },
  { label: '本周', value: 'THIS_WEEK' },
  { label: '下周', value: 'NEXT_WEEK' },
  { label: '本月', value: 'THIS_MONTH' },
  { label: '下月', value: 'NEXT_MONTH' },
]

/**
 * -------------------------------------------------------
*/

// 关联对象
export const relatedBusiness = [
  { label: '客户', value: 0, valueT: 'CLIENT' },
  { label: '线索', value: 1, valueT: 'CLUE' },
  { label: '商机', value: 2, valueT: 'BUSINESS' },
  { label: '订单', value: 3, valueT: 'ORDER' },
  { label: '联系人', value: 4, valueT: 'CONTACT_PERSON' }
]


// 关联对象
export const callType = [
  { label: '本机呼叫', value: 'DIRECT' },
  { label: '云呼叫', value: 'SOFT_JUNYU' },
]

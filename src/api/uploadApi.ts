/**
 *  导入api
 */
import { getFile, postFile, post } from '@/api/public.js';

/* 导入 */
export const uploadApi = {
  // 数据入库
  warehousing: (data: any) =>
    post(`/crm-core/import/import-data-warehousing`, data),
  client: (data: any) => postFile(`/crm-core/import/client-import`, data), //客户导入

  highSeas: (data: any) =>
    postFile(`/crm-core/import/client-import-highSeas`, data), //'公海客户导入',

  garbage: (data: any) =>
    postFile(`/crm-core/import/client-import-garbage`, data), //'垃圾客户导入',

  clue: (data: any) => postFile(`/crm-core/import/clue-import`, data), //'销售线索导入',

  cluePublic: (data: any) =>
    postFile(`/crm-core/import/clue-import-public`, data), //公共线索导入',

  contact: (data: any) => postFile(`/crm-core/import/contact-import`, data), // '联系人导入',

  product: (data: any) => postFile(`/crm-core/import/product-import`, data), // '产品导入',

  business: (data: any) => postFile(`/crm-core/import/business-import`, data), // '商机导入',
  order: (data: any) => postFile(`/crm-core/import/order-import`, data) // '订单导入',
};

/**
 * 表格集合
*/
import {

  clientIndustry,
  clientState,
  clueSource,
} from '@/api/client/index';
// 客户
const client = [
  { label: '客户名称', value: 'clientName' },
  { label: '客户状态', value: 'clientState', formatter: (v: any) => findLabel(clientState, v.clientState) },
  { label: '所属行业', value: 'clientIndustry', formatter: (v: any) => findLabel(clientIndustry, v.clientIndustry) },
  { label: '客户来源', value: 'clientSource', formatter: (v: any) => findLabel(clueSource, v.clientSource) },
  // { label: '星级', value: 'clientStar', type: '1' },
]
// 销售线索导入
const clue = client

// 公海客户
const highSeas = client

// 垃圾客户
const garbage = client


// 公海线索导入
const cluePublic = client

// 联系人导入
const contact = client

// 产品导入
const product = [
  { label: '产品名称', value: 'productName' },
  { label: '所属分类', value: 'productClassifyName' },
  { label: '产品编号', value: 'productNumber' },
  { label: '标准单价', value: 'standardPrice' },
  { label: '产品规格', value: 'productSpecification' },
]
// 商机
const business = [
  { label: '商机标题', value: 'businessTitle' },
  { label: '关联客户编号', value: 'clientName' },
  { label: '预计销售金额', value: 'salesAmount' },
  { label: '销售阶段', value: 'salesStage' },
  { label: '成交几率', value: 'clinchRate' },
  { label: '预计签单日期', value: 'dateSign' },
]
// 订单
const order = [
  { label: '订单标题', value: 'orderTitile' },
  { label: '关联客户系统编号', value: 'clientName' },
  { label: '关联商机', value: 'businessName' },
  { label: '签单日期', value: 'signTime' },
  { label: '订单总金额', value: 'orderTotalMoney' },
  {
    label: '产品信息', value: 'dateSign',
    children: [{
      label: "产品名称",
      value: "productName"
    },
    {
      label: "产品编号",
      value: "productNumber"
    },
    {
      label: "产品规格",
      value: "productSpecification"
    },
    {
      label: "折扣率",
      value: "discount"
    },
    {
      label: "销售单价",
      value: "salePrice"
    },
    {
      label: "总价",
      value: "totalPrice"
    },
    {
      label: "数量",
      value: "saleNumber"
    }
    ]
  },
]
export default {
  client,
  highSeas,
  garbage,
  clue,
  cluePublic,
  contact,
  product,
  business,
  order

}

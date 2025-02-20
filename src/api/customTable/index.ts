// 公海客户查询 * 已更新 *
const highSeasCals = [
  { prop: 'contactName', label: '姓名', default: true }, //
  { prop: 'cluePhone', label: '手机', default: true }, //
  { prop: 'notFollowedUp', label: '未跟进天数' }, //
  { prop: 'address', label: '地址' }, //
  { prop: 'birthday', label: '生日' }, //
  { prop: 'wechatNumber', label: '微信' }, //
  { prop: 'qqNumber', label: 'QQ' }, //
  { prop: 'clueEmail', label: '邮箱' }, //
  { prop: 'appendRemarks', label: '备注信息' }, //

  { prop: 'clientId', label: '系统编号' }, //
  { prop: 'creatorName', label: '创建人员' }, //
  // { prop: "cooperationUserName", label: '协作人' },//
  { prop: 'followTime', label: '最后跟进' } //
];

export default {
  'crm:client:query:highSeas': highSeasCals, //公海 || //垃圾客户
  'crm:client:recycle': highSeasCals //垃圾客户
};

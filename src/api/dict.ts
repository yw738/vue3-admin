enum paymentWay {
  ONLINE_PAYMENT = "在线缴费",
  CONTACT_CUSTOMER_SERVICE = "联系客服"
}
enum state {
  DEACTIVATE = "停用",
  ENABLE = "启用"
}

// 审核状态
enum approval {
  WAIT = "待审核",
  PASS = "审核通过",
  REFUSE = "审核驳回",
}

// 审核状态
/**
  * 管理员状态
  * 0: 管理端超级管理员
  * 1：管理端普通管理员
  * 2：客户端管理员
  * 3：客户端普通用户
  */

export const paymentWayList = enum2Arr(paymentWay)
export const stateList = enum2Arr(state)
export const approvalStatus = enum2Arr(approval)
export const sendType = [{
  label: '未知',
  value: 'UNKNOWN',
}, {
  label: '发送成功',
  value: 'SUCCESS',
  color: '#66CC66'
}, {
  label: '发送失败',
  value: 'FAIL',
  color: '#FF3300'
}, {
  label: '驳回',
  color: '#FF3300',
  value: 'REFUSE',
},]




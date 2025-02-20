import router from '@/router/index.ts';
import { ElMessage } from 'element-plus';

// import { useRouter } from 'vue-router';
// const router = useRouter();

/**
 * 管理打开的链接
*/
// sms
export const openSms = (isReg = false, arr: string = '') => {
  if (isReg && !arr.length) {
    ElMessage.error('至少需选择1条数据');
    return;
  }
  if (isReg) {
    sessionStorage.setItem('smsData', JSON.stringify(arr));
  } else {
    sessionStorage.removeItem('smsData');
  }
  router.push({
    path: `/detailManage/addSms`
  });
};

// 客户列表详情
export const openLink = (row: any, isSea = 'false') => {
  router.push({
    path: `/detailManage/customerDetail`,
    query: {
      clientId: row.clientId,
      isSea: isSea
    }
  });
};
// 线索列表详情
export const openLink1 = (row: any, isSea = 'false') => {
  router.push({
    path: `/detailManage/clueDetail`,
    query: {
      clientId: row.clientId,
      isSea: isSea
    }
  });
  // router.go(0);
};
// 联系人
export const openLink2 = (row: any) => {
  router.push({
    path: `/detailManage/contacts`,
    query: {
      contactUserId: row.contactUserId
    }
  });
};
// 联系人客户
export const openLink3 = (row: any) => {
  router.push({
    path: `/detailManage/customer`,
    query: {
      clientId: row.clientId
    }
  });

};

// 商机标题
export const openLink4 = (row: any) => {
  router.push({
    path: `/detailManage/business`,
    query: {
      businessId: row.businessId
    }
  });
};

// 订单标题
export const openLink5 = (row: any) => {
  router.push({
    path: `/detailManage/order`,
    query: {
      orderId: row.orderId
    }
  });
};

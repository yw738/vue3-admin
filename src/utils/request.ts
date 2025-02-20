import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { ElMessage, ElMessageBox, ElLoading } from 'element-plus';
import { localStorage, jsCookie } from '@/utils/storage';
import useStore from '@/store';
import router from '@/router';

let needLoadingRequestCount = 0;

export function showFullScreenLoading() {
  if (needLoadingRequestCount === 0) {
    startLoading();
  }
  needLoadingRequestCount++;
}

export function tryHideFullScreenLoading() {
  if (needLoadingRequestCount <= 0) return;
  needLoadingRequestCount--;
  if (needLoadingRequestCount === 0) endLoading();
}

let loading: any;

function startLoading() {
  loading = ElLoading.service({
    lock: true,
    text: '加载中……',
    background: 'rgba(0, 0, 0, 0.7)'
  });
}

function endLoading() {
  loading.close();
}

// 是否正在刷新的标记 -- 防止重复发出刷新token接口--节流阀
let isRefreshing = false;
// 失效后同时发送请求的容器 -- 缓存接口
let subscribers: any[] = [];
function onAccessTokenFetched(newToken: any) {
  subscribers.forEach(callback => {
    callback(newToken);
  });
  // 清空缓存接口
  subscribers = [];
}
// 添加缓存接口
function addSubscriber(callback: any) {
  subscribers.push(callback);
}
// 跳转登录页
const toLogin = () => {
  const { app } = useStore();
  // ElMessage({
  //   message: "请重新登录",
  //   type: 'error'
  // });
  subscribers = [];
  window.location.href = `${app.sassApi}/#/login`;
};

const getRefreshToken = () => {
  return new Promise((resolve, reject) => {
    const refreshToken = jsCookie.get('refreshToken');
    axios({
      url: '/auth/sso/refresh-token',
      method: 'get',
      data: {},
      baseURL: import.meta.env.VITE_APP_BASE_API,
      headers: {
        refreshToken: refreshToken
      }
    })
      .then(res => {
        if (res.data.code == 1) {
          const { user } = useStore();
          const { token, refreshToken, expiresIn } = res.data.data;
          const date = new Date();
          const time = expiresIn * 1000;
          date.setTime(date.getTime() + time);
          jsCookie.set('token', token, date.toUTCString());
          jsCookie.set('refreshToken', refreshToken);
          user.token = token;
          user.refreshToken = refreshToken;
          resolve(token);
        } else {
          reject();
        }
      })
      .catch(() => {
        reject();
      });
  });
};



// 创建 axios 实例
const service = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_API,
  // timeout: 50000,//毫秒
  // timeout: 50000,
  headers: { 'Content-Type': 'application/json;charset=utf-8' }
});

/**
 * 判断token 是否过期 逻辑，
 *          - token过期：请求 refreshToken
 *                  refreshToken未过期： 获取最新的token 和 refreshToken 更新
 *                                      进行后续的接口调取
 *                  refreshToken过期：   退出登录
 *          - token未过期： 继续执行请求
 *                  请求token过期（1001：无效token）：请求 refreshToken
 *                                                refreshToken未过期： 获取最新的token 和 refreshToken 更新
 *                                                                    （此时接口调取已完成，但是没有数据）需要重新调取接口
 *                                                refreshToken过期：   退出登录
 *                  请求token未过期：正常获取数据
 *
 */

// 请求拦截器
service.interceptors.request.use(
  async (config: any) => {
    return config;
    // showFullScreenLoading()
    if (!config.headers) {
      throw new Error(
        `Expected 'config' and 'config.headers' not to be undefined`
      );
    }
    /**
     * 开发环境专用
     * 替换前缀
     */
    if (config.baseURL == '/dev-api' && config.url.includes('/system/')) {
      config.baseURL = '/systemApi';
    }
    if (config.baseURL == '/dev-api' && config.url.includes('/sms-core/')) {
      config.baseURL = '/smsCoreApi';
    }

    // 全局处理参数 空字符串处理为null 或 删除
    if (config.data && Object.entries(config.data)?.length) {
      // Object.entries(config.data)
      for (let [label, value] of Object.entries(config.data)) {
        if (value === '') {
          config.data[label] = null;
        }
      }
    }
    /**
     * Content-Type 替换
     */
    //  if(config.url=='/crm-core/order'){
    //   config.headers['Content-Type'] = 'multipart/form-data'
    //  }
    // config.isgetArray
    // 针对列表排序的 全局方法
    /**
     * 全局排序
     * 置顶>重要程度>时间
     * 先默认时间排序
     */
    //  不排序的接口
    let filterUrl = [
      `/crm-core/sms-contact/client-contact`,
      '/crm-core/sms-contact/lead-contact',
      '/crm-core/sms-contact/opportunity-contact'
    ];
    // if (config.method == 'get' && config.params.size && !filterUrl.includes(config.url)) {
    //   config.paramsSerializer = function (params: any) {
    //     let sortJson = {}
    //     if (params.isTopSort) {
    //       // sortJson = {
    //       //   orders: [{
    //       //     asc: 'false',
    //       //     column: 'a.tops'
    //       //   }]
    //       // }
    //     } else {
    //       sortJson = {
    //         orders: [{
    //           asc: 'false',
    //           column: 'create_time'
    //         }]
    //       }
    //     }
    //     return Qs.stringify({ ...params, ...sortJson }, { allowDots: true, arrayFormat: 'indices' })
    //     // 4种不同形式
    //     //1.qs.stringify({ids: [1, 2, 3]}, { indices: false }) --形式： ids=1&ids=2&ids=3
    //     //2.qs.stringify({ids: [1, 2, 3]}, {arrayFormat: ‘indices‘}) --形式：      ids[0]=1&ids[1]=2&ids[2]=3
    //     //3.qs.stringify({ids: [1, 2, 3]}, {arrayFormat: ‘brackets‘})  --形式：ids[]=1&ids[]=2&ids[]=3
    //     //4.qs.stringify({ids: [1, 2, 3]}, {arrayFormat: ‘repeat‘})  --形式： ids=1&ids=2&ids=3
    //   }
    // }
    // config.headers.Authorization = `Bearer 415b6a44-c132-46de-b42d-713dc7532ec2`;

    // // Yapi联调 ，打开注释
    return config;

    // || config.url == '/system/user/logout'
    // 登录接口不拦截
    if (config.url == '/system/user/login') return config;
    const token = jsCookie.get('token');
    const refreshToken = jsCookie.get('refreshToken');
    if (token) {
      config.headers.Authorization = `Bearer ${jsCookie.get('token')}`;
    }
    if (token && refreshToken) {
      return config;
    } else if (!token && refreshToken) {
      if (!isRefreshing) {
        isRefreshing = true;
        getRefreshToken()
          .then(newToken => {
            isRefreshing = false;
            onAccessTokenFetched(newToken);
          })
          .catch(() => {
            toLogin(); // 失败就跳转登陆
            isRefreshing = false;
          });
      }
      // 请求拦截，等待 RefreshToken 请求结束，再执行
      // 将其他接口缓存起来 -- 这个Promise函数很关键
      const retryRequest = new Promise(resolve => {
        // 这里是将其他接口缓存起来的关键, 返回Promise并且让其状态一直为等待状态,
        // 只有当token刷新成功后, 就会调用通过addSubscriber函数添加的缓存接口,
        // 此时, Promise的状态就会变成resolve
        addSubscriber((newToken: any) => {
          // 表示用新的token去替换掉原来的token
          config.headers.Authorization = `Bearer ${newToken}`;
          // 替换掉url -- 因为baseURL会扩展请求url
          // config.url = config.url.replace(config.baseURL, '')
          // 返回重新封装的config, 就会将新配置去发送请求
          resolve(config);
        });
      });
      return retryRequest;
    } else {
      // token和refreshToken过期 跳出登录
      toLogin();
      return false;
    }
    // return config;
  },
  error => {
    // tryHideFullScreenLoading();
    return Promise.reject(error);
  }
);

// 响应拦截器
service.interceptors.response.use(
  async (response: any) => {
    return response;
    const { code, msg } = response.data;
    tryHideFullScreenLoading();
    //
    // return response.data;
    /**
     * code = 1 正常；
     * code = 1001 无效token；
     * code = 其他 需要重新登录
     */
    if (code == '1') {
      return response.data;
    } else if (code == '1001') {
      if (!isRefreshing) {
        isRefreshing = true;
        getRefreshToken()
          .then(newToken => {
            isRefreshing = false;
            onAccessTokenFetched(newToken);
          })
          .catch(() => {
            toLogin(); // 失败就跳转登陆
            isRefreshing = false;
          });
      }
      // 将其他接口缓存起来
      const retryRequest = new Promise(resolve => {
        // 返回Promise并且让其状态一直为等待状态,
        // 只有当token刷新成功后, 就会调用通过addSubscriber函数添加的缓存接口,
        // 此时, Promise的状态就会变成resolve
        addSubscriber((newToken: any) => {
          // 表示用新的token去替换掉原来的token
          response.config.headers.Authorization = 'Bearer ' + newToken;
          // 替换掉url -- 因为baseURL会扩展请求url
          // response.config.url = response.config.url.replace(response.config.baseURL, '')
          // 用重新封装的config去请求, 就会将重新请求后的返回
          resolve(service(response.config));
        });
      });
      return retryRequest;
    } else {
      // 响应数据为二进制流处理(Excel导出)
      if (response.config.responseType == 'blob') {
        return response;
      }
      // 响应数据为二进制流处理(Excel导出) 且 是导入接口
      // const str = response.headers['content-disposition']
      // if (str.includes('xls') || str.includes('xlsx')) {
      //   return response;
      // }
      if (msg) {
        ElMessage({
          message: msg,
          type: 'error'
        });
      }
      return Promise.reject(new Error(msg || 'Error'));
    }
  },
  error => {
    return Promise.reject(new Error('Error'));
    tryHideFullScreenLoading();
    const { code, msg } = error?.response?.data || {};
    // if (code === 'A0230') {
    //   // token 过期
    //   localStorage.clear(); // 清除浏览器全部缓存
    //   window.location.href = '/'; // 跳转登录页
    //   ElMessageBox.alert('当前页面已失效，请重新登录', '提示', {});
    // } else {
    //   ElMessage({
    //     message: msg || '系统出错',
    //     type: 'error'
    //   });
    // }

    msg &&
      ElMessage({
        message: msg || '系统出错',
        type: 'error'
      });

    return Promise.reject(new Error(msg || 'Error'));
  }
);

let moniGet = ()=>{
  return new Promise((resolve, reject) => {
    resolve({
      data:{
        turnoverVOS:[{}],
        histogramTurnoverVOS:[],
        records:[{}]
      },
      total:10
    })
 // state.tableData =
// res?.data.records?.map((v: any) => ({
//   ...v,
//   clientState: findLabel(clientState, v.clientState)
//   // clientState: findLabel(clientState, v.clientState),
//   // sendTime: v.sendTime ? dateFormat(v.sendTime, true, false) : '',
//   // sendStatus: v.sendStatus
//   //   ? sendType.find(item => item.value == v.sendStatus)?.label
//   //   : ''
// })) || [];
// state.pagination.total = res?.data.total || 0;
  });
}


// 导出 axios 实例
export default moniGet;
// export default service;

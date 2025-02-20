import router from '@/router';
import { ElMessage } from 'element-plus';
import useStore from '@/store';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
NProgress.configure({ showSpinner: false }); // 进度环显示/隐藏
// 跳转登录页
const toLogin = () => {
  const { app } = useStore();
  // ElMessage({
  //   message: "请重新登录",
  //   type: 'error'
  // });
  window.location.href = `${app.sassApi}/#/login`;
};

// await permission.setRoutes([])
// // await user.getUserInfo();
// return
let isOk = false;
// 白名单路由
const whiteList = ['/login'];
router.beforeEach(async (to, from, next) => {
  // NProgress.start();
  const { user, permission } = useStore();
  const hasToken = user.token;
  if (!permission.routes.length) {
    const accessRoutes: any = await permission.generateRoutes([]);
  }

  next();
  return;
  if (hasToken) {
    // 登录成功，跳转到首页
    if (to.path === '/login') {
      next({ path: '/' });
      NProgress.done();
    } else {
      const hasGetUserInfo = user.userInfo?.id;
      if (hasGetUserInfo) {
        if (to?.meta?.roleId) {
          /**
           * 开始鉴权
           * 有权限 为 true。   无权限 为 false
           * 跳转              重定向到当前页
           */
          let bFlog = user.roles.some(v => v == to.meta.roleId); //
          if (bFlog) {
            next();
          } else {
            next(`/dashboard`);
          }
        } else {
          if (to.matched.length === 0) {
            from.name ? next({ name: from.name }) : next('/dashboard');
          } else {
            next();
          }
        }
      } else {
        try {
          await user.getUserInfo();
          const roles = user.roles;
          // 加载路由
          const openType = user.userInfo.type;
          const accessRoutes: any = await permission.generateRoutes(roles);
          next({ ...to, replace: true });
        } catch (error) {
          // 移除 token 并跳转登录页
          await user.resetToken();
          ElMessage.error((error as any) || 'Has Error');
          toLogin();
          NProgress.done();
        }
      }
    }
  } else {
    // 未登录可以访问白名单页面(登录页面)
    if (whiteList.indexOf(to.path) !== -1) {
      next();
    } else {
      await user.resetToken();
      toLogin();
      NProgress.done();
    }
  }
});

router.afterEach(() => {
  // NProgress.done();
});

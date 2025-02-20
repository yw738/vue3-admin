import { RouteRecordRaw } from 'vue-router';
import { defineStore } from 'pinia';
import { constantRoutes } from '@/router';
import useStore from '@/store';
const modules = import.meta.glob('../../views/**/**.vue');
export const Layout = () => import('@/layout/index.vue');

// 动态路由用的 匹配路径
export const filterAsyncRoutes = (
  routes: RouteRecordRaw[],
  roles: string[]
) => {
  const res: RouteRecordRaw[] = [];

  routes.forEach(route => {
    const item = { ...route } as any;
    if (item.component == 'Layout') {
      item.component = Layout;
    } else {
      const component = modules[`../../views/${item.component}.vue`] as any;
      if (component) {
        item.component = modules[`../../views/${item.component}.vue`];
      } else {
        item.component = modules[`../../views/error-page/404.vue`];
      }
    }
    res.push(item);
    if (item.children) {
      item.children = filterAsyncRoutes(item.children, roles);
    }
    // }
  });
  return res;
};

/**
 * 生产左侧菜单
 */
const usePermissionStore = defineStore({
  id: 'permission',
  state: (): any => ({
    routes: [],
    addRoutes: [],
    roleIds: []
  }),
  actions: {
    // 设置左侧菜单的
    setRoutes(routes: RouteRecordRaw[]) {
      this.addRoutes = routes;
      this.routes = routes;
      // this.routes = [];
    },
    /**
     * 通过权限处理路由
     */
    generateRoutes(roles: string[]) {
      return new Promise((resolve, reject) => {
        this.roleIds = roles;
        let arr = constantRoutes;
        // let list = this.setTree(arr); // 拿到的新tree
        // this.setRoutes(list);
        this.setRoutes(arr);

        resolve(arr);
      });
    },
    setTree(list: any) {
      for (let i = 0; i < list.length; i++) {
        if (list[i].roleId) {
          let bFlog = this.roleIds.some((v: any) => v == list[i].roleId);
          if (!list[i].meta) list[i].meta = {}; //分配默认值
          // 有权限 hidden== false 。没权限 hidden== true
          list[i].meta.hidden = !bFlog;
          list[i].meta.roleId = list[i].roleId;
        }
        if (list[i].children) {
          this.setTree(list[i].children);
        }
      }
      return list;
    }
  }
});

export default usePermissionStore;

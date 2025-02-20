import { RouteRecordRaw, RouteLocationNormalized } from 'vue-router';
/**
 * 用户状态类型声明
 */
export interface AppState {
  device: string;
  sidebar: {
    opened: boolean;
    withoutAnimation: boolean;
  };
  language: string;
  size: string;
}

/**
 * 权限类型声明
 */
export interface PermissionState {
  routes: RouteRecordRaw[];
  addRoutes: RouteRecordRaw[];
}

/**
 * 设置状态类型声明
 */
export interface SettingState {
  theme: string;
  tagsView: boolean;
  fixedHeader: boolean;
  showSettings: boolean;
  sidebarLogo: boolean;
}

/**
 * 标签状态类型声明
 */
export interface TagView extends Partial<RouteLocationNormalized> {
  title?: string;
}

export interface TagsViewState {
  visitedViews: TagView[];
  cachedViews: string[];
}

/**
 * 用户状态类型声明
 */
export interface UserState {
  token: string;
  refreshToken: string;
  nickname: string;
  userId: string | number;
  avatar: string;
  roles: string[];
  perms: string[];
  userInfo: any;
}

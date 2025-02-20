import { Captcha, LoginFormData, LoginResponseData } from '@/types';
import request from '@/utils/request';
import { AxiosPromise } from 'axios';
/**
 *  用户模块
 */
import { get, post, getFile } from '@/api/public';

/* 登录相关api */
export const loginApi = {
  login: (data: any) => post(`/auth/sso/login`, data), //登录,
  logout: (data?: any) => post(`/auth/sso/logout`, data), //登出, 2023-04-06 登录接口更改 接口修改如下
  // refreshToken: (data?: any) => get(`/system/user/refresh-token`, data), //通过refreshToken对token进行续期
  userInfo: (data?: any) => get(`/system/user/user-info`, data) //通过token获取用户信息,需要传token
};

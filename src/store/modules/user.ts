import { defineStore } from 'pinia';
import { LoginFormData, UserState } from '@/types';
import { localStorage, jsCookie } from '@/utils/storage';
import { login, logout, loginApi } from '@/api/login';
import { getUserInfo } from '@/api/system/user';
import { resetRouter } from '@/router';
import { ElMessage } from 'element-plus';

const useUserStore = defineStore({
  id: 'user',
  state: (): any => ({
    token: jsCookie.get('token') || '',
    refreshToken: jsCookie.get('refreshToken') || '',
    nickname: '',
    userId: '',
    avatar: '',
    roles: [],
    perms: [],
    userInfo: {},//用户信息
    // userLevel: null as any,//crm 的用户级别 1 => 个人 ， 2=> 所属部门及其他
    userLevel: 2,//crm 的用户级别 1 => 个人 ， 2=> 所属部门及其他
  }),
  actions: {
    async RESET_STATE() {
      this.$reset();
    },
    /**
     * 用户登录请求
     * @param userInfo 登录用户信息
     *  username: 用户名
     *  password: 密码
    //  *  code: 验证码
    //  *  uuid: 匹配正确验证码的 key
     */
    login(userInfo: any = {}) {
      const { username, password } = userInfo;
      return new Promise((resolve, reject) => {
        loginApi.login({
          username: username.trim(),
          password: password.trim(),
        })
          .then(response => {
            const { refreshToken, token, expiresIn } = response.data;
            // jsCookie.set('token', token, expiresIn);
            const date = new Date();
            const time = (expiresIn * 1000);
            date.setTime(date.getTime() + time);
            jsCookie.set('token', token, date.toUTCString());
            jsCookie.set('refreshToken', refreshToken);
            this.token = token;
            this.refreshToken = refreshToken;
            ElMessage.success('登录成功');
            resolve("");
          })
          .catch(error => {
            reject(error);
          });
      });
    },
    /**
     *  用refreshToken 去换取新的 token
     *  然后更新
     */
    getRefreshToken() {
      return new Promise((resolve, reject) => {
        loginApi.refreshToken().then(({ data }) => {
          const { token, refreshToken, expiresIn } = data;
          jsCookie.set('token', token, expiresIn);
          jsCookie.set('refreshToken', refreshToken);
          this.token = token;
          this.refreshToken = refreshToken;
          resolve(data);
        })
          .catch(error => {
            reject(error);
          });
      });
    },
    /**
     *  获取用户信息（昵称、头像、角色集合、权限集合）
     */
    getUserInfo() {
      return new Promise((resolve, reject) => {
        loginApi.userInfo().then(({ data }) => {
          console.log(data)
          if (!data) {
            return reject('please Login again.');
          }
          const { id, username, authorities = [] } = data;
          const params = JSON.parse(JSON.stringify(data))
          delete params.authorities
          delete params.password
          this.userInfo = params;
          this.nickname = username;
          this.userId = id;
          // this.avatar = avatar;
          this.roles = authorities;
          // 判断用户是什么那种级别的权限
          /**
           *  个人	crm:data:person		可以看：我的、我协作的
              所属部门	crm:data:belong:department		可以看：我的、我协作的、我下属的、我下属协作的
              所属部门及下属部门	crm:data:belong:department:underling		同上
              全公司	crm:data:all:company		同上
              原则：可以看，就可以操作
          */
          let bFlog = authorities.some((v: string) => v == 'crm:data:belong:department' || v == 'crm:data:belong:department:underling' || v == 'crm:data:all:company')
          this.userLevel = bFlog ? 2 : 1;
          this.userLevel = 2;
          // this.userLevel = 1;
          // console.log(this.userId, this.nickname)
          resolve(data);
        })
          .catch(error => {
            reject(error);
          });
      });
    },

    /**
     *  注销
     */
    logout() {
      return new Promise((resolve, reject) => {
        loginApi.logout()
          .then(() => {
            jsCookie.clear();
            this.token = "";
            this.refreshToken = "";
            this.userInfo = {};
            resetRouter();
            resolve(null);
          })
          .catch(error => {
            reject(error);
          });
      });
    },

    /**
     * 清除 Token
     */
    resetToken() {
      return new Promise(resolve => {
        jsCookie.clear();
        this.token = "";
        this.refreshToken = "";
        this.userInfo = {};
        // this.RESET_STATE();
        resolve(null);
      });
    }
  }
});

export default useUserStore;

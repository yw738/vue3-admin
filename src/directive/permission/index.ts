import useStore from '@/store';
import { Directive, DirectiveBinding } from 'vue';

/**
 * 按钮权限校验
 */
export const hasPerm: Directive = {
  mounted(el: HTMLElement, binding: DirectiveBinding) {
    // return true;
    // 「超级管理员」拥有所有的按钮权限
    const { user } = useStore();
    const roles = user.roles;
    // 「其他角色」按钮权限校验
    const { value } = binding;
    if (value) {
      const requiredPerms = value; // DOM绑定需要的按钮权限标识
      /**
       * 当 value=='noAuthentication' 时候，不鉴权。
       * 一般按钮模板默认值的时候使用
      */
      if (value == 'noAuthentication') return true;
      const hasPerm = roles?.some(perm => perm == requiredPerms);
      if (!hasPerm) {
        el.parentNode && el.parentNode.removeChild(el);
      }

    } else {
      throw new Error(
        "need perms! Like v-has-perm=\"['sys:user:add','sys:user:edit']\""
      );
    }
  }
};

/**
 * 角色权限校验
 */
export const hasRole: Directive = {
  mounted(el: HTMLElement, binding: DirectiveBinding) {
    const { value } = binding;

    if (value) {
      const requiredRoles = value; // DOM绑定需要的角色编码
      const { user } = useStore();
      const hasRole = user.roles.some(perm => {
        return requiredRoles.includes(perm);
      });

      if (!hasRole) {
        el.parentNode && el.parentNode.removeChild(el);
      }
    } else {
      throw new Error("need roles! Like v-has-role=\"['admin','test']\"");
    }
  }
};

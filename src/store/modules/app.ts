import { AppState } from '@/types';
import { localStorage } from '@/utils/storage';
import { defineStore } from 'pinia';

const useAppStore = defineStore({
  id: 'app',
  state: (): any => ({
    device: 'desktop',
    sidebar: {
      opened: localStorage.get('sidebarStatus')
        ? !!+localStorage.get('sidebarStatus')
        : true,
      withoutAnimation: false
    },
    language: '',
    size: localStorage.get('size') || 'default',

    // 系统配置 api
    /**
     * 本机环境
     *
     */
    // sassApi: 'http://192.168.1.208:3000',
    // smsApi: 'http://192.168.1.208:3001',
    // crmApi: 'http://192.168.1.208:3003',
    /**
     * 测试环境
     */
    sassApi: window.location.origin,
    smsApi: window.location.origin + import.meta.env.VITE_APP_SMS_BASE_URL,
    crmApi: window.location.origin + import.meta.env.VITE_APP_CRM_BASE_URL,
    callApi: window.location.origin + import.meta.env.VITE_APP_CALL_BASE_URL,
    obtainApi: window.location.origin + import.meta.env.VITE_APP_OBTAIN_BASE_URL
  }),
  actions: {
    toggleSidebar() {
      this.sidebar.opened = !this.sidebar.opened;
      this.sidebar.withoutAnimation = false;
      if (this.sidebar.opened) {
        localStorage.set('sidebarStatus', 1);
      } else {
        localStorage.set('sidebarStatus', 0);
      }
    },
    closeSideBar(withoutAnimation: any) {
      localStorage.set('sidebarStatus', 0);
      this.sidebar.opened = false;
      this.sidebar.withoutAnimation = withoutAnimation;
    },
    toggleDevice(device: string) {
      this.device = device;
    },
    setSize(size: string) {
      this.size = size;
      localStorage.set('size', size);
    },
    setLanguage(language: string) {
      this.language = language;
      localStorage.set('language', language);
    }
  }
});

export default useAppStore;

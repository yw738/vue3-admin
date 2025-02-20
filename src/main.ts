import { createApp, Directive } from 'vue';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';
import { createPinia } from 'pinia';
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';

import App from './App.vue';
import router from '@/router';
import '@/utils/customFn';
// import '@/assets/js/qs.min.js';
// import '@/assets/js/sdkFn.js';

import '@/permission';
import 'default-passive-events';

const app = createApp(App);

// 引入svg注册脚本
import 'virtual:svg-icons-register';

// 自定义样式
import '@/styles/index.scss';
// @element-plus/icons-vue 中导入所有图标并进行全局注册。
import * as ElementPlusIconsVue from '@element-plus/icons-vue';

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}

// 挂载的全局组件
import Pagination from '@/components/Pagination/index.vue';
import DateRangeCom from '@/components/publicModule/DateRangeCom.vue';
import TableTemp from '@/components/publicModule/Table.vue';
import SearchForm from '@/components/publicModule/From.vue';

// 自定义指令
import * as directive from '@/directive';

Object.keys(directive).forEach(key => {
  app.directive(key, (directive as { [key: string]: Directive })[key]);
});

const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);

// 注册全局组件
app
  .component('Pagination', Pagination)
  .component('DateRangeCom', DateRangeCom)
  .component('TableTemp', TableTemp)
  .component('SearchForm', SearchForm)
  .use(pinia)
  .use(router)
  .use(ElementPlus)
  .mount('#app');

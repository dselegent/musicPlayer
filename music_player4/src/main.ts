import { createApp } from 'vue';
import App from './App.vue';

// 引入pinia
import { createPinia } from 'pinia';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';
const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);

// 引入路由
import router from './router';

import 'uno.css';
import 'virtual:svg-icons-register';

import VueEnhance from './plugins/VueEnhance';

/* 阻止警告 
Added non-passive event listener to a scroll-blocking 'touchstart' event. Consider marking event handler as 'passive' to make the page more responsive.
*/
import 'default-passive-events';

// 创建实例
const app = createApp(App);

// vue注册
app.use(pinia).use(router).use(VueEnhance).mount('#app');

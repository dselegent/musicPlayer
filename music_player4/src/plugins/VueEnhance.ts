import { App } from 'vue';
import SvgIcon from '@c/SvgIcon/index.vue';
// 全局事件总线

export default {
  install: function (app: App<Element>, options: any): void {
    app.component(SvgIcon.name, SvgIcon);
    const properties = app.config.globalProperties;
    // 全局事件总线
    properties.$bus = bus;
  },
};

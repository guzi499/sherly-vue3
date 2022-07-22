/*
 * @Author: lihaoyu
 * @Date: 2022-03-28 23:41:35
 * @LastEditTime: 2022-05-07 00:59:36
 * @LastEditors: lihaoyu
 * @Description: 入口文件
 * @FilePath: /sherly-vue3/src/main.js
 */
import { createApp } from "vue";
import App from "./App.vue";
import store from "@/store/index";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import * as ElIcons from "@element-plus/icons-vue";
import router from "./router/router";
import permission from "@/utils/permission";
import "./router/index"; // permission control

import "@/assets/style/sherly.scss";
import "@/assets/style/index.scss";

// 自定义树形下拉框组件
import TreeSelect from "@/components/TreeSelect.vue";
// 自定义分页组件
import Pagination from "@/components/PaginationEl.vue";
// 自定义穿梭框组件
import TransferName from '@/pages/system/email/email_config/components/TransferName.vue'

// 引入矢量图标
import '@/assets/style/font-icon/iconfont.css'
const app = createApp(App);

app.use(store);

// 全局注册组件
app.component("TreeSelect", TreeSelect);

// eslint-disable-next-line vue/multi-word-component-names
app.component("Pagination", Pagination);
app.component("TransferName", TransferName);

app.use(ElementPlus);
for (const name in ElIcons) {
  app.component(name, ElIcons[name]);
}

app.use(router);

// 自定义权限指令
app.directive("permission", {
  mounted(el, binding) {
    permission(el, binding);
  },
});

app.mount("#app");

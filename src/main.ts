import { createApp } from "vue";
import App from "./App";
import { setupEle } from "@plugins/element";
import { setupStore } from "@store/index";
import "@styles/reset.scss";
import "@styles/element.scss";
import "@assets/iconfont/iconfont.css";
import { setupVxe } from "@plugins/vxe-table";
import setupRouter, { router } from "@router/index";
import "@config/router.permission";
import "@assets/css/style.css";
import { setupDirective } from "./directive";
import { asyncComponent } from "./components";
import { setupI18n } from "@plugins/i18n";
import { useVisibility } from "./hooks";
import echarts from "@plugins/echarts";
import { createHead } from "@vueuse/head"; // <--
import "github-markdown-css/github-markdown.css";
import "vite-plugin-svg-icons/register";
const app = createApp(App);
setupDirective(app); //指令
setupI18n(app); //国际化
setupEle(app); //安装elemet plus
setupStore(app); //安装store
setupVxe(app); //vxe
setupRouter(app); //router
asyncComponent(app); //异步组件
useVisibility.init(); //趣味功能
app.use(echarts); //echarts
app.use(createHead());
if (router.isReady()) {
  app.mount("#app");
}

import { createApp } from "vue";
import App from "./App";
import "@styles/reset.scss";
import "@styles/element.scss";
import "@assets/iconfont/iconfont.css";
import setupRouter, { router } from "@router/index";
import "@config/router.permission";
import "@assets/css/style.css";
import { setupDirective } from "./directive";
import { asyncComponent } from "./components";
import { useVisibility } from "./hooks";
import { createHead } from "@vueuse/head"; // <--
import "github-markdown-css/github-markdown.css";
import "vite-plugin-svg-icons/register";
import Use_DB from "./hooks/useDB";
import { baseConfig } from "@config/base.config";
import { useSysStore } from "@store/sys";
import { errorHander } from "@utils/errorHander";
import { setupPlugins } from "./plugins";
const app = createApp(App);
setupDirective(app); //指令
setupPlugins(app)
setupRouter(app); //router
asyncComponent(app); //异步组件
errorHander(app)
useVisibility.init(); //趣味功能
app.use(createHead());
const db= new Use_DB({
  name:baseConfig.sqlName || "baseSource",
  version:baseConfig.sqlVersion || 1,
  storeName:"base"
})
const sys = useSysStore()
sys.$patch({
  baseSql:db
})
router.isReady().then(()=>{
    app.mount("#app");
}).finally(()=>{
  try{
    app.config.compilerOptions.isCustomElement = tag => tag.startsWith('css-')
  } catch(e){
    console.log(e)
  }
})


import { setupEle } from "./element";
import { setupI18n } from "./i18n";
import { setupVxe } from "./vxe-table";
import echarts from "./echarts"
import { App } from "@vue/runtime-core";

export const setupPlugins= (app:App)=>{
  setupEle(app)
  setupEle(app)
  setupVxe(app)
  app.use(echarts)
}
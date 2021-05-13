import { App } from "@vue/runtime-core";
import Eloading from "./el-loading/index";
import "./el-loading/index.scss";
/* 批量注册指令 */
export const setupDirective = (app: App) => {
  Eloading.install(app);
  let modules = import.meta.glob("./modules/*.ts");
  for (let path in modules) {
    modules[path]().then(mod => {
      Object.keys(mod).forEach(v => {
        mod[v](app);
      });
    });
  }
};

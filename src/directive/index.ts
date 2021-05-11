import { App } from "@vue/runtime-core";
import "@directive/loading/css/index.scss";
import loading from "./loading/index";
/* 批量注册指令 */
export const setupDirective = (app: App) => {
  loading.install(app);
  let modules = import.meta.glob("./modules/*.ts");
  for (let path in modules) {
    modules[path]().then(mod => {
      Object.keys(mod).forEach(v => {
        mod[v](app);
      });
    });
  }
};

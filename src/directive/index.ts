import { App } from "@vue/runtime-core";
/* 批量注册指令 */
export const setupDirective = (app: App) => {
  let modules = import.meta.glob("./modules/*.ts");
  for (let path in modules) {
    modules[path]().then(mod => {
      Object.keys(mod).forEach(v => {
        mod[v](app);
      });
    });
  }
};

// $vxe-button-height-default / 2; -> math.did($vxe-button-height-default, 2)

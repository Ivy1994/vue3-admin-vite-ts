import { defineAsyncComponent, App, Slots } from "vue";
import "./styles.scss";
function getModules() {
  const components = import.meta.glob("./modules/**/*.tsx");
  return components;
}
function getComponents() {
  const components = import.meta.globEager("./modules/**/*.tsx");
  return components;
}
// 自动注册组件
export const asyncComponent = function(app: App<Element>): void {
  const modules = getModules();
  const components = getComponents();
  Object.keys(modules).forEach(async (v: string) => {
    const viewSrc = components[v] as Slots;
    const file = viewSrc.default;
    const AsyncComponent = await defineAsyncComponent(modules[v]); // 异步组件
    app.component(file?.name || "", AsyncComponent);
  });
};

export const toComponetName = (name: string) => {
  return `${name.slice(0, 1)}${name
    .slice(1, 2)
    .toLocaleUpperCase()}${name.slice(2, name.length)}`;
};

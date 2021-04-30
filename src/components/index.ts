import { defineAsyncComponent, App } from "vue";
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
  Object.keys(modules).forEach((v: string) => {
    Object.keys(modules).forEach(async (key: string) => {
      const viewSrc = components[key];
      const file = viewSrc.default;
      const AsyncComponent = await defineAsyncComponent(modules[key]);
      app.component(toComponetName(file.name), AsyncComponent);
    });
  });
};

export const toComponetName = (name: string) => {
  return `${name.slice(0, 1)}${name
    .slice(1, 2)
    .toLocaleUpperCase()}${name.slice(2, name.length)}`;
};

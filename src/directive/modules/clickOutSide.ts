import { App } from "@vue/runtime-core";

export const clickOutSide = (app: App) => {
  app.directive("clickOutSide", {
    mounted(el: Element, binding) {
      document.body.addEventListener(
        "rightClick",
        target => {
          console.log(target);
        },
        false
      );
    },
    unmounted(el, binding) {},
  });
};

//[绑定监听事件]
export function addMethod(node: any, type: string, method: Function) {
  if (node.addEventListener) {
    // IE9以下不兼容
    node.addEventListener(type, method, false);
  } else if (node.attachEvent) {
    // IE独有
    node.attachEvent(`on${type}`, method);
  } else {
    node[`on${type}`] = method; // 一个元素只能绑定一个处理程序
  }
}

//[移除监听事件]
export function removeMethod(node: any, type: string, method: Function) {
  if (node.removeEventListener) {
    // IE9以下不兼容
    node.removeEventListener(type, method, false);
  } else if (node.detachEvent) {
    // IE独有
    node.detachEvent(`on${type}`, method);
  } else {
    node[`on${type}`] = null;
  }
}

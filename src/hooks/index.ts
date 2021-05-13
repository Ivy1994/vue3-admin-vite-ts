import { baseConfig } from "@config/base.config";
import { App, ref } from "@vue/runtime-core";
let pageStatus: string = "";
let orginTitle: string = baseConfig.sysName;
export const useVisibility = {
  init: () => {
    window.addEventListener(
      "visibilitychange",
      () => {
        if (document.visibilityState === "hidden") {
          orginTitle = document.title;
          document.title = "别看我别看我别...看我呀";
          changeIco("./miss_favicon.ico");
          pageStatus = "hidden";
        } else {
          document.title = orginTitle;
          changeIco("./favicon.ico");
          pageStatus = "visible";
        }
      },
      false
    );
  },
  remove: () => {
    window.removeEventListener("visibilitychange", () => {
      console.log("已移除页面监听");
      pageStatus = "";
    });
  },
  get: () => {
    if (pageStatus === "") {
      return "未初始化，请先调用init初始化";
    }
    return pageStatus;
  },
};
export const changeIco = (dir: string) => {
  var link: Element =
    document.querySelector("link[rel*='icon']") ||
    document.createElement("link");
  //@ts-ignore
  link.type = "image/x-icon";
  //@ts-ignore
  link.rel = "shortcut icon";
  //@ts-ignore
  link.href = dir;
  document.getElementsByTagName("head")[0].appendChild(link);
};

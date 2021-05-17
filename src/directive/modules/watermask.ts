//@ts-nocheck
import { App, Directive, nextTick } from "vue";
import dayjs from "dayjs";
console.log();

let MutationObserver = window.MutationObserver || window.WebKitMutationObserver;
let mo: any = null;
const setWatermark = (str1, str2, el) => {
  let id = "waterMask";
  if (document.getElementById(id)) {
    el.removeChild(document.getElementById(id));
  }
  let can = document.createElement("canvas");
  // 设置canvas画布大小
  can.width = 300;
  can.height = 150;
  let cans = can.getContext("2d");
  cans.rotate((-20 * Math.PI) / 180); // 水印旋转角度
  cans.font = "15px Vedana";
  cans.fillStyle = "#666666";
  cans.textAlign = "center";
  cans.textBaseline = "Middle";
  cans.fillText(str1, can.width / 2, can.height); // 水印在画布的位置x，y轴
  cans.fillText(str2, can.width / 2, can.height + 22);
  let div = document.createElement("div");
  div.id = id;
  div.style.pointerEvents = "none";
  div.style.top = "0px";
  div.style.right = "0px";
  div.style.opacity = "0.3";
  div.style.position = "absolute";
  div.style.zIndex = "99999";
  nextTick();
  div.style.width = el.offsetWidth + "px";
  div.style.height = "100%";
  div.style.background =
    "url(" + can.toDataURL("image/png") + ") left top repeat";
  el.appendChild(div);
  MutationObserver = window.MutationObserver || window.WebKitMutationObserver;
  if (MutationObserver) {
    mo = new MutationObserver(function() {
      const __wm = document.querySelector("#waterMask");
      // 只在__wm元素变动才重新调用 __canvasWM
      if (!__wm) {
        // 避免一直触发
        mo.disconnect();
        mo = null;
        setWatermark(str1, str2, el);
      }
    });

    mo.observe(el, {
      attributes: true,
      subtree: true,
      childList: true,
    });
  }
};
import watermask from "../waterMask";
import { useUserStore } from "@store/user";
export const setWaterMask: Directive = (app: App) => {
  app.directive("watermask", {
    mounted(el) {
      const user = useUserStore();
      const day = dayjs().format("YYYY-MM-DD");
      setWatermark(user.username, day, el);
    },
    unmounted(el) {
      mo && mo.disconnect();
      mo = null;
    },
  });
};

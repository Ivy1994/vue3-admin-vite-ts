// 菜单国际化配置
// vxe-table组件国际化
import zhVxeTable from "vxe-table/lib/locale/lang/zh-CN";
import enVxeTable from "vxe-table/lib/locale/lang/en-US";

//@ts-ignore
import zh from "@locales/zh";
//@ts-ignore
import en from "@locales/en";
export function changeLocaleEle(bind: string): void {}

export const localesConfigs = {
  zh: {
    ...zh,
    ...zhVxeTable,
  },
  en: {
    ...en,
    ...enVxeTable,
  },
};

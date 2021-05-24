import { defineStore } from "pinia";
import { AppRouteRecordRawT } from "@router/types";
import { router } from "@router/index";
import { changeTheme } from "@utils/theme";
const tags: AppRouteRecordRawT[] = []; /* 动态增加的tags */
const fixedTags: AppRouteRecordRawT[] = []; /* 固定tags */
export enum Theme{
  dark="dark",
  light="light"
}
const keepRoutes: string[] = [];
export const useSysStore = defineStore({
  id: "sys",
  state() {
    return {
      collapse: false,
      tags,
      fixedTags,
      acitveName: "",
      keepRoutes,
      theme:""
    };
  },
  actions: {
    addTages(item: AppRouteRecordRawT) {
      //@ts-ignore
      /* 添加item，判断当前的路由是否存在，如果存在进入 */
      const isExist: boolean = this.tags.some(
        v =>
          /* 存在于当前tags */
          v.name === item.name
      );
      const isExistInFixed: boolean = this.fixedTags.some(
        v =>
          /* 存在于固定tags中 */
          v.name === item.name
      );
      const isRoot: boolean = ["404", "403", "login"].includes(item.name);
      !isExist && !isExistInFixed && !isRoot ? this.tags.push(item) : "";
    },
    changeThemeStore(name?:string){
      this.theme = name || "light"
    },
    addKeep(name: string) {
      const isExt = this.keepRoutes.includes(name);
      !isExt && this.keepRoutes.push(name);
    },
    removeKeep(name: string) {
      const isExt = this.keepRoutes.indexOf(name);
      isExt !== -1 && this.keepRoutes.splice(isExt, 1);
    },
    removeItem(item) {
      /* 删除动态的tags */
      let index: number = this.tags.findIndex(v => v?.name === item.name);
      this.tags.splice(index, 1);
      this.removeKeep(item.name);
      this.toRePath(index, item.name);
    },
    deletByName(name: string) {
      const item = this.findItemByName(name);
      this.removeItem(item);
    },
    findItemByName(name: string) {
      return this.tags.find(v => {
        return v.name === name;
      });
    },
    toRePath(index: number, name: string): void {
      /* 删除固定项的处理 */
      if (this.acitveName === name) {
        if (this.tags.length) {
          if (index > 0) {
            router.push({
              name: this.tags[index - 1].name,
            });
          } else {
            router.push({
              name: this.tags[0].name,
            });
          }
        } else {
          router.push({
            name: "index",
          });
        }
      }
    },
    refreshTags() {
      /* 清空所有的tags */
      this.tags = [];
      router.push("/");
    },
  },
});

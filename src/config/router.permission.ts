import { getToken, removeToken } from "@utils/access.token";
import { RouteRecordRaw } from "vue-router";
import { router } from "@router/index";
import { useUserStore } from "@store/user";
import { useRouteStore } from "@store/routes";
import { filterRoutes, hasKeep } from "@router/utils";
import { AppRouteRecordRawT } from "@router/types";
import { baseConfig } from "./base.config";
import { ElNotification } from "element-plus";
//@ts-ignore
import { NoPermissionMsg } from "@types/config.types";
import { useSysStore } from "@store/sys";
export const addRoute = (routers: AppRouteRecordRawT[]) => {
  const routeStore = useRouteStore();
  const sysStore = useSysStore();
  const hasRoles = filterRoutes(routers);
  routeStore.setAsyncRoutes(hasRoles);
  if (hasRoles.length) {
    /* 将首页添加进fixed */
    //@ts-ignore
    sysStore.fixedTags.push(hasRoles[0].children[0]);
    hasRoles.forEach(v => {
      router.addRoute(v as RouteRecordRaw);
    });
  } else {
    ElNotification({
      title: "警告",
      message: NoPermissionMsg.HAS,
      type: "error",
    });
    removeToken();
  }
};
router.onError(err => {
  console.error(err);
});
// })
router.beforeEach(async (to, from, next) => {
  const store = useUserStore();
  const name = to.name as string;
  let hasUserInfo = store.permissions.length;
  let isNotFound = name ? !router.hasRoute(name) : true;
  let routerTitle = to?.meta?.title ?? "";
  document.title = baseConfig.sysName + "-" + routerTitle;
  const hasToken = !!getToken();
  if (hasToken) {
    if (hasUserInfo) {
      name === "login" ? next("/") : isNotFound ? next("/404") : next();
    } else {
      await store.userInfo();
      next(to.fullPath);
    }
  } else {
    if (to.path === "/" || to.path === "/login") {
      next();
    }
    next("/login");
  }
});
router.afterEach(to => {
  const sysStore = useSysStore();
  sysStore.$patch({
    acitveName: to.name as string,
  });
  sysStore.addTages(to as AppRouteRecordRawT);
  to.meta?.keep && sysStore.addKeep(to.name as string);
});

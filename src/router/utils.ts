import { baseConfig } from "@config/base.config";
import { useSysStore } from "@store/sys";
import { useUserStore } from "@store/user";
import { AppRouteRecordRawT } from "./types";
export const filterRoutes = (routes: AppRouteRecordRawT[]) => {
  const store = useUserStore();
  const finallyRoutes: AppRouteRecordRawT[] = [];
  routes.forEach((v: AppRouteRecordRawT) => {
    let item = { ...v };
    hasKeep(item);
    if (hasPermission(item)) {
      if (item.children && item.children.length) {
        item.children = filterRoutes(item.children);
      }
      finallyRoutes.push(item);
    }
  });
  if (store.permissions.includes("admin")) return routes;
  if (!baseConfig.skipToken) return routes;
  return finallyRoutes;
};

export const hasPermission = (route: AppRouteRecordRawT) => {
  const store = useUserStore();
  if (route.meta?.permissions) {
    return route.meta.permissions.some(i => store.permissions.includes(i));
  }
  return true;
};
export const hasKeep = (route: AppRouteRecordRawT) => {
  const store = useSysStore();
  if (route.meta?.keep) {
    store.addKeep(route.name);
  }
};

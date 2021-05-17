import { RouteRecordRaw } from "vue-router";

interface RouteMeta {
  title?: string;
  icon?: string;
  isHidden?: boolean;
  eachInMenu?: boolean;
  permissions?: string[];
  keep?: boolean;
}
//@ts-ignore
export interface AppRouteRecordRaw extends Omit<RouteRecordRaw, "meta"> {
  name: string;
  meta: RouteMeta;
  children?: AppRouteRecordRaw[];
  fullPath?: string;
}
export type AppRouteRecordRawT = AppRouteRecordRaw;

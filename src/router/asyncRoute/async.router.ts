import { AppRouteRecordRawT } from "@router/types";
import { h } from "vue";
const layout = () => import(/* webpackTrunkName: "layout" */ "@layouts/Layout");
const index = () => import(/* webpackTrunkName: "index" */ "@views/index");
const i18n = () => import(/* webpackTrunkName:"i18n" */ "@views/i18n/i18n");
const base_table = () =>
  import(/* webpackTrunkName:"baseTable" */ "@views/table/baseTable");
const gridTable = () =>
  import(/* webpackTrunkName:"gridTable" */ "@views/table/gridTable");
import indexMd from "@views/index.md";

const asyncRouter: AppRouteRecordRawT[] = [
  {
    path: "/",
    name: "index",
    redirect: "/dashBord",
    component: layout,
    meta: {
      title: "首页",
      permissions: ["edit"],
      icon: "iconfont iconshouye",
    },
    children: [
      {
        path: "dashBord",
        name: "dashBord",
        component: indexMd,
        meta: {
          title: "控制台",
          permissions: ["author"],
          icon: "iconfont iconkongzhitai_",
        },
      },
    ],
  },
  {
    path: "/i18n",
    name: "i18n",
    redirect: "/i18n/index",
    component: layout,
    meta: {
      title: "i18n",
      permissions: ["edit"],
      icon: "iconfont iconicon-test",
    },
    children: [
      {
        path: "index",
        name: "i18nIndex",
        component: i18n,
        meta: {
          title: "i18n",
          icon: "iconfont iconin",
        },
      },
    ],
  },
  {
    path: "/table",
    name: "table",
    redirect: "/table/baseTable",
    component: layout,
    meta: {
      title: "表格",
      icon: "iconfont iconbiaoge",
    },
    children: [
      {
        path: "baseTable",
        name: "baseTable",
        component: base_table,
        meta: {
          title: "基础表格",
          icon: "iconfont icon3jichubiaoge",
        },
      },
      {
        path: "gridTable",
        name: "gridTable",
        component: gridTable,
        meta: {
          title: "grid表格",
          icon: "iconfont iconGridView",
        },
      },
    ],
  },
];
export default asyncRouter;

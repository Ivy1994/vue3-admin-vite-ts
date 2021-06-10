import { AppRouteRecordRawT } from "@router/types";
const layout = () => import(/* webpackTrunkName: "layout" */ "@layouts/Layout");
const i18n = () => import(/* webpackTrunkName:"i18n" */ "@views/i18n/i18n");
const echarst = () =>
  import(/* webpackTrunkName:"i18n" */ "@views/charts/echarts");
const antv = () => import(/* webpackTrunkName:"i18n" */ "@views/charts/antv");
const big = () => import("@views/bigScreen/bigScreen");

const base_table = () =>
  import(/* webpackTrunkName:"baseTable" */ "@views/table/baseTable");
const gridTable = () =>
  import(/* webpackTrunkName:"gridTable" */ "@views/table/gridTable");
//@ts-ignore
import indexMd from "@views/index.md";

const asyncRouter: AppRouteRecordRawT[] = [
  {
    path: "/",
    name: "index",
    redirect: "/dashBord",
    component: layout,
    meta: {
      title: "首页",
      icon: "index",
    },
    children: [
      {
        path: "dashBord",
        name: "dashBord",
        component: indexMd,
        meta: {
          title: "控制台",
          icon: "index",
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
      icon: "i18n-index",
    },
    children: [
      {
        path: "index",
        name: "i18nIndex",
        component: i18n,
        meta: {
          title: "i18n",
          icon: "i18n",
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
      icon: "table-index",
    },
    children: [
      {
        path: "baseTable",
        name: "baseTable",
        component: base_table,
        meta: {
          title: "基础表格",
          icon: "base-table",
          keep: true,
        },
      },
      {
        path: "https://xuliangzhan_admin.gitee.io/vxe-table/v4/table/start/install",
        name: "gridTable",
        component: gridTable,
        meta: {
          title: "表格文档",
          icon: "grid",
          isExt:true
        },
      },
    ],
  },
  {
    path: "/charts",
    name: "charts",
    redirect: "/charts/echarts",
    component: layout,
    meta: {
      title: "ANT & ECHARTS",
      icon: "arts-index",
    },
    children: [
      {
        path: "echarts",
        name: "echarts",
        component: echarst,
        meta: {
          title: "ECHARTS",
          icon: "echarts",
        },
      },
      {
        path: "antv",
        name: "antv",
        component: antv,
        meta: {
          title: "ANT",
          icon: "ant",
        },
      },
    ],
  },
  {
    path: "/clound-path",
    name: "clound-path",
    component: big,
    meta: {
      title: "大屏可视化",
      eachInMenu:false,
    },
  },
];
export default asyncRouter;

export interface BaseConfig {
  baseURL: any;
  tokenName: string;
  httpTimeOut: number;
  errorCode: ErrorResCode[] | number;
  successCode: number[] | number;
  storeLocation: StoreLocal;
  duration: number;
  tokenExpireTIme?: number; //token过期时间
  routerPreDir: string; //路由前缀
  sysName: string; //系统前缀
  skipToken: boolean; //路由是否需要权限认证
  componetTrans?: TransName;
}
export enum TransName {
  Top = "top", //登录失效
  Left = "left", //无权限
  Right = "right", //登录失效
  Scale = "scale", //无权限
  Fade = "fade",
}
export enum ErrorResCode {
  LOGOUT = 401, //登录失效
  NO_PERMISSION = 403, //无权限
}
export enum StoreLocal {
  LOCAL = "local",
  // COOKIE = "cookie",
  SESSION = "session",
}
export enum NoPermissionMsg {
  HAS = "不具有此系统相关模块权限",
  NOT = "不具有此系统登录权限",
}

// @ts-expect-error
import { BaseConfig, StoreLocal, TransName } from "@types/config.types";
export const baseConfig: BaseConfig = {
  /* 过期时间，仅当存储位置未local时生效 */
  baseURL: import.meta.env.VITE_APP_SERVICE_URL,
  httpTimeOut: 10000,
  storeLocation: StoreLocal.LOCAL,
  errorCode: [401, 403],
  successCode: [200, 0],
  tokenName: "access_token",
  duration: 3000,
  tokenExpireTIme: 72, //单位小时
  routerPreDir: "./", //如果项目时放在网站的某一级目录下，一定要填写这个
  sysName: "小裁缝",
  skipToken: false,
  componetTrans: TransName.Scale,
};

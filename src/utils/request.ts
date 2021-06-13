import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { baseConfig } from "@config/base.config";
import { getToken, removeToken } from "./access.token";
/* responseData */
export interface ResponseData {
  code: number;
  message?: string;
  data?: any;
}
const serve = axios.create({
  baseURL: baseConfig.baseURL,
  timeout: baseConfig.httpTimeOut,
  withCredentials: true,
});
/* 错误处理 */
const errorHander = (code: number, err, message?: string): void => {
  let msg: string;
  switch (code) {
    case 400:
      msg = "客户端请求的语法错误，服务器无法理解";
      break;
    case 401:
      msg = "登录鉴权过期,请重新登录";
      removeToken();
      break;
    case 403:
      msg = "暂无权限！";
      break;
    case 404:
      msg = `请求地址出错:${err.response.config.url}`;
      break;
    case 405:
      msg = "请求方式被禁止";
      break;
    case 408:
      msg = "请求超时";
      break;
    case 500:
      msg = "服务器内部错误，无法完成请求";
      break;
    case 501:
      msg = "服务器不支持请求的功能，无法完成请求";
      break;
    case 502:
      msg =
        "作为网关或者代理工作的服务器尝试执行请求时，从远程服务器接收到了一个无效的响应";
      break;
    case 503:
      msg =
        "由于超载或系统维护，服务器暂时的无法处理客户端的请求。延时的长度可包含在服务器的Retry";
      break;
    case 504:
      msg = "充当网关或代理的服务器，未及时从远端服务器获取请求";
      break;
    case 505:
      msg = "服务器不支持请求的HTTP协议的版本";
      break;
    default:
      msg = `请求出错:${err.message}`;
  }
  msg = message || msg;
  // ElNotification({
  //   title: "提示",
  //   message: msg,
  //   duration: baseConfig.duration,
  //   type: "error",
  // });
};
/* config配置 */
serve.interceptors.request.use((config: AxiosRequestConfig) => {
  if (!!getToken()) {
    config.headers[baseConfig.tokenName] = getToken();
  }
  return config;
});
/* 请求response拦截 */
serve.interceptors.response.use(
  (_response: AxiosResponse<ResponseData>) => {
    const { data: respones } = _response; //重命名data，避免冲突
    const { code, message, data } = respones;
    const isSuccess = Array.isArray(baseConfig.successCode)
      ? baseConfig.successCode.includes(code)
      : code === baseConfig.successCode;
    if (isSuccess) {
      return Promise.resolve(data as any);
    } else {
      errorHander(code, respones, message);
      return Promise.reject(respones as any);
    }
  },
  err => {
    if (err && err.response) {
      const { status } = err.response;
      errorHander(status, err);
    }
    return Promise.reject(err?.response as any);
  }
);
export default serve;

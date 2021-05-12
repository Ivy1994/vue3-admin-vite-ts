declare type Recordable<T = any> = Record<string, T>;
import * as axios from "axios";

declare module "axios" {
  interface AxiosInstance {
    (config: AxiosRequestConfig): Promise<any>;
  }
}

interface AppGolbalConfig {
  $t: Function;
  $echarts: Function;
  $alert: Function;
  $confirm: Function;
  $messageBox: Function;
  $message: Function;
  $msgbox: Function;
  $notify: Function;
  $msgbox: Function;
}

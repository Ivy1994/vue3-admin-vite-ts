declare type Recordable<T = any> = Record<string, T>;
import { ECOption } from "@plugins/echarts";
import * as axios from "axios";
import { EChartsType } from "echarts";
import { ECharts } from "echarts/core";

declare module "axios" {
  interface AxiosInstance {
    (config: AxiosRequestConfig): Promise<any>;
  }
}

interface AppGolbalConfig {
  $t: Function;
  $echarts: EChartsType;
  $alert: Function;
  $confirm: Function;
  $messageBox: Function;
  $message: Function;
  $msgbox: Function;
  $notify: Function;
  $msgbox: Function;
}

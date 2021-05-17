declare type Recordable<T = any> = Record<string, T>;
import { ECOption } from "@plugins/echarts";
import * as axios from "axios";
import { EChartsType } from "echarts";
import { ECharts } from "echarts/core";
import { ElMessageBox } from "element-plus/lib/el-message-box/src/message-box.type";

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
  $message: ElMessageBox;
  $msgbox: ElMessageBox;
  $notify: Function;
  $msgbox: Function;
}

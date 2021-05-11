import { App } from "@vue/runtime-core";
import loading from "../loading/index";

export const setupLoading = (app: App) => {
  loading.install(app);
};

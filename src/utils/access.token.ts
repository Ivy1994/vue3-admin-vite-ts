import useLocal from "@store/localStore";
import { baseConfig } from "@config/base.config";
import { useRouter } from "vue-router";
//@ts-ignore
import { StoreLocal } from "@types/config.types";

export const getToken = (): string => {
  const store = useLocal();

  if (
    baseConfig.tokenExpireTIme &&
    baseConfig.storeLocation === StoreLocal.LOCAL
  ) {
    return store.getExpire(baseConfig.tokenName, baseConfig.tokenExpireTIme);
  } else {
    return store.get(baseConfig.tokenName);
  }
};
export const setToken = (val: string): string => {
  const store = useLocal();

  if (
    baseConfig.tokenExpireTIme &&
    baseConfig.storeLocation === StoreLocal.LOCAL
  ) {
    return store.setExpire(
      baseConfig.tokenName,
      val,
      baseConfig.tokenExpireTIme
    );
  } else {
    return store.set(baseConfig.tokenName, val);
  }
};
export const removeToken = (): void => {
  const store = useLocal();
  store.remove(baseConfig.tokenName);
  // ElNotification({
  //   title: "提示",
  //   message: "登录注销成功，正在清理数据ing...",
  //   type: "success",
  //   duration: 3000,
  // });
  setTimeout(() => {
    window.location.reload();
  }, 1000);
};

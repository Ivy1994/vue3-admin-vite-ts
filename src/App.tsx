import { localStoreApi } from "@store/localStore/local";
import { changeTheme } from "@utils/theme";
import { AppGolbalConfig } from "types";
import { defineComponent, getCurrentInstance, inject, provide } from "vue";
const App = defineComponent({
  name: "app",
  setup(prop, ctx) {
    const global = getCurrentInstance()?.appContext.config.globalProperties;
    provide("_app", global as AppGolbalConfig);
    const local = new localStoreApi()
    const theme = local.get("z-theme")
    changeTheme(theme)
    return () => (
      <div>
        <router-view></router-view>
      </div>
    );
  },
});
export default App;

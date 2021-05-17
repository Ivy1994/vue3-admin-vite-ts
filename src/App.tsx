import { AppGolbalConfig } from "types";
import { defineComponent, getCurrentInstance, inject, provide } from "vue";
const App = defineComponent({
  name: "app",
  setup(prop, ctx) {
    const global = getCurrentInstance()?.appContext.config.globalProperties;
    provide("_app", global as AppGolbalConfig);
    return () => (
      <div>
        <router-view></router-view>
      </div>
    );
  },
});
export default App;

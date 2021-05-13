import { AppGolbalConfig } from "types";
import { defineComponent, getCurrentInstance, inject, provide } from "vue";
const App = defineComponent({
  name: "app",
  setup(prop, ctx) {
    const golbal = getCurrentInstance()?.appContext.config.globalProperties;
    provide("_app", golbal as AppGolbalConfig);
    return () => (
      <div>
        <router-view></router-view>
      </div>
    );
  },
});
export default App;

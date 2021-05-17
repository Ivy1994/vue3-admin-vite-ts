import { defineComponent, inject } from "@vue/runtime-core";
import { AppGolbalConfig } from "types";

const antvDemo = defineComponent({
  name: "antvDemo",
  setup() {
    const { $echarts } = inject("_app") as AppGolbalConfig;
    console.log($echarts);
    return () => (
      <div>
        <div>
          <div>配置项</div>
        </div>
        <div></div>
      </div>
    );
  },
});
export default antvDemo;

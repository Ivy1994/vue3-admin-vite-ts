import {
  defineComponent,
  inject,
  onMounted,
  reactive,
} from "@vue/runtime-core";
import { AppGolbalConfig } from "types";

const echartsDemo = defineComponent({
  name: "echartsDemo",
  setup() {
    const { $echarts } = inject("_app") as AppGolbalConfig;
    const basePosition = reactive({
      pageX: 0,
      pageY: 1,
    });
    const hnadleMouseDown = (evt: MouseEvent) => {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
    };
    const handleMouseMove = evt => {
      console.log(evt);
    };
    const handleMouseUp = evt => {
      console.log(evt);
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
    return () => (
      <div class="w-full flex">
        <div class=" w-96 flex flex-col right-border-shadow">
          <div class="w-full text-center py-4 text-xl text-gray-600 h-20">
            配置项
          </div>
          <div class="flex-1">
            <el-form></el-form>
          </div>
        </div>
        <div
          id="line"
          class="w-2 cursor-move"
          onMousedown={hnadleMouseDown}
        ></div>
        <div class="flex-1"></div>
      </div>
    );
  },
});
export default echartsDemo;

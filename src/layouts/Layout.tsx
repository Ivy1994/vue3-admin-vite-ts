import { useSysStore } from "@store/sys";
import { defineComponent, onMounted } from "vue";

const layout = defineComponent({
  setup() {
    return () => (
      <div class=" w-screen flex flex-col">
        <div class="flex">
          <div class="w-auto">
            <z-slider></z-slider>
          </div>
          <div class="flex-1 main-content h-screen">
            <z-header />
            <z-tags class="hidden md4:flex"></z-tags>
            <router-view class="p-2 flex-1 h-auto overflow-y-scroll relative"></router-view>
          </div>
        </div>
      </div>
    );
  },
});
export default layout;

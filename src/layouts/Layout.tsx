import { baseConfig } from "@config/base.config";
import { useSysStore } from "@store/sys";
import { defineComponent, KeepAlive, Transition} from "vue";

const layout = defineComponent({
  components: { KeepAlive, Transition },
  setup() {
    const sysStore = useSysStore();
    return () => (
      <div class=" w-screen flex flex-col">
        <div class="flex">
          <div class="w-auto">
            <z-slider></z-slider>
          </div>
          <div class="flex-1 main-content h-screen">
            <z-header />
            <z-tags class="hidden md4:flex"></z-tags>
            <router-view
              class="p-2 flex-1 h-auto overflow-y-scroll relative"
              v-slots={{
                default: ({ Component, route }) => {
                  const sys = useSysStore();
                  const name = baseConfig.componetTrans || "fade";
                  return (
                    <Transition name={name} mode="out-in">
                      <KeepAlive  include={sys.keepRoutes}>
                        <Component is={route.name} key={route.name}></Component>
                      </KeepAlive>
                    </Transition>
                  );
                },
              }}
            ></router-view>
          </div>
        </div>
      </div>
    );
  },
});
export default layout;

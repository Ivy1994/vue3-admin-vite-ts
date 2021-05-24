import { useRouteStore } from "@store/routes";
import { useSysStore } from "@store/sys";
import { computed, defineComponent, TransitionGroup } from "vue";
import { useRoute, useRouter } from "vue-router";
import { AppRouteRecordRawT } from "@router/types";
import { changeTheme } from "@utils/theme";
import { isDateSame } from "xe-utils";
const zSlider = defineComponent({
  name: "zSlider",
  components: { TransitionGroup },

  setup(prop, ctx) {
    const sysStore = useSysStore();
    const isCollapse = computed(() => {
      return sysStore.collapse;
    });
    const route = useRoute();
    // setTimeout(()=>{
    //   changeTheme("dark")
    // },2000)
    const router = useRouter();
    const activePAth = computed(() => {
      return route.name;
    });
    const isDark = computed(()=>{
      return sysStore.theme === "dark"
    })
    const routeStore = useRouteStore();
    const handleSelect = name => {
      router.push({ name });
    };
    const slot = (route: AppRouteRecordRawT[]): Array<any> => {
      return route.map(v => {
        if (v.children && v.children.length) {
          return (
            <el-submenu
              index={v.name}
              v-slots={{
                title: () => (
                  <div>
                    <svg-icon
                      size={20}
                      class="inline-block w-auto px-2"
                      name={v.meta.icon}
                    ></svg-icon>
                    <span>{v.meta.title}</span>
                  </div>
                ),
              }}
            >
              {slot(v.children as AppRouteRecordRawT[])}
            </el-submenu>
          );
        } else {
          return (
            <el-menu-item
              index={v.name}
              v-slots={{
                title: () => <span>{v.meta.title}</span>,
              }}
            >
              <svg-icon
                size={20}
                class="inline-block w-auto px-2"
                name={v.meta.icon}
              ></svg-icon>
            </el-menu-item>
          );
        }
      });
    };
    const beforeClose = () => {
      sysStore.$patch({
        collapse: !isCollapse.value,
      });
    };
    return () => (
      <>
        <div
          class={
            "h-screen max-w-xl hidden mmd:block delay-300	 ease-in-out transition-all" +
            (isCollapse.value ? " w-20" : "  w-40 md:w-64")
          }
          style={isDark.value?"border-right:1px solid #999":"box-shadow:5px 0 10px #999"}
        >
          <z-logo></z-logo>
          <el-menu
            size="mini"
            default-active={activePAth.value}
            onSelect={handleSelect}
            menu-trigger="click"
            background-color={isDark.value?"#000":"#fff"}
            text-color={isDark.value?"#fff":"#303133"}
            active-text-color="#F87171"
            collapse={isCollapse.value}
            class="w-full slider-bar"
            unique-opened={true}
          >
            {slot(routeStore.asyncRouts)}
          </el-menu>
        </div>
        <div class="mmd:hidden h-screen">
          <el-drawer
            modelValue={isCollapse.value}
            direction="ltr"
            destroy-on-close
            with-header={false}
            size="60%"
            before-close={beforeClose}
          >
            <div>
              <z-logo></z-logo>
              <el-menu
                default-active={activePAth.value}
                onSelect={handleSelect}
                menu-trigger="click"
                active-text-color="#F87171"
                class="w-full h-auto slider-bar"
                background-color={isDark.value?"#000":"#fff"}
                text-color={isDark.value?"#fff":"#303133"}
              >
                {slot(routeStore.asyncRouts)}
              </el-menu>
            </div>
          </el-drawer>
        </div>
      </>
    );
  },
});
export default zSlider;

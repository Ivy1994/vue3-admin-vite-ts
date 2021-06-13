import { useRouteStore } from "@store/routes";
import { useSysStore } from "@store/sys";
import {
  computed,
  createVNode,
  defineComponent,
  TransitionGroup,
  h,
  VNodeChild,
} from "vue";
import { useRoute, useRouter } from "vue-router";
import { AppRouteRecordRawT } from "@router/types";
import { changeTheme } from "@utils/theme";
import { getRouteByName } from "@router/utils";
import { MenuOption, NIcon, NMenu } from "naive-ui";
const zSlider = defineComponent({
  name: "zSlider",
  components: { TransitionGroup },

  setup(prop, ctx) {
    const sysStore = useSysStore();
    const isCollapse = computed(() => {
      return sysStore.collapse;
    });
    const mbTheme = () => {
      const sysTheme = sysStore.theme === "dark" ? "light" : "dark";
      sysStore.$patch({
        theme: sysTheme,
      });
      changeTheme(sysTheme);
    };
    const iconItem = (v: AppRouteRecordRawT) => {
      if (v?.meta?.icon) {
        if (
          v.meta.icon.includes("el-icon") ||
          v.meta.icon.includes("iconfont")
        ) {
          return () => h("i", null, { class: v.meta.icon });
        } else {
          return () =>
            h(NIcon, { size: 24 }, h(<svg-icon name={v.meta.icon}></svg-icon>));
        }
      } else {
        return "";
      }
    };
    const sertMenuOption = (list: AppRouteRecordRawT[]) => {
      const finallyRoutes: MenuOption[] = [];
      list.forEach(v => {
        let item = { ...v };
        const tempItem: MenuOption = {
          label: item.meta.title || "",
          key: item.name,
          path: item.path,
          icon: iconItem(v) as unknown,
        };
        if (item.children && item.children.length) {
          Object.assign(tempItem, { children: sertMenuOption(item.children) });
        }
        v.meta.eachInMenu === false ? "" : finallyRoutes.push(tempItem);
      });
      return finallyRoutes;
    };
    const route = useRoute();
    const router = useRouter();
    const activePAth = computed(() => {
      return route.name;
    });
    const isDark = computed(() => {
      return sysStore.theme === "dark";
    });
    const routeStore = useRouteStore();
    const menudata = sertMenuOption(routeStore.asyncRouts);
    const handleSelect = (value, item) => {
      if (isExt(item.path)) {
        window.location.href = item.path as any;
      } else {
        router.push({ name: value });
      }
    };
    const isExt = (value: string) => {
      if (value.startsWith("http://") || value.startsWith("https://"))
        return true;
      return false;
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
          style={
            isDark.value
              ? "border-right:1px solid #999"
              : "box-shadow:5px 0 10px #999"
          }
        >
          <z-logo></z-logo>
          <NMenu
            onUpdateValue={handleSelect}
            defaultValue={activePAth.value as any}
            options={menudata}
          ></NMenu>
        </div>
        <div class="mmd:hidden h-screen">
          {/* <el-drawer
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
                background-color={isDark.value ? "#000" : "#fff"}
                text-color={isDark.value ? "#aaa" : "#303133"}
                unique-opened={true}
              >
                {slot(routeStore.asyncRouts)}
              </el-menu>
              <div class="w-full h-20 absolute bottom-3 text-center">
                {isDark.value ? (
                  <svg-icon
                    size={20}
                    onClick={mbTheme}
                    class="inline-block w-auto px-2"
                    name="light"
                  ></svg-icon>
                ) : (
                  <svg-icon
                    size={20}
                    onClick={mbTheme}
                    class="inline-block w-auto px-2"
                    name="dark"
                  ></svg-icon>
                )}
              </div>
            </div>
          </el-drawer> */}
        </div>
      </>
    );
  },
});
export default zSlider;

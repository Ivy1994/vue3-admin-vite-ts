import { defineComponent, withModifiers, reactive, ref, computed } from "vue";
import { NBreadcrumb, NBreadcrumbItem, NIcon } from "naive-ui";
import { useSysStore } from "@store/sys";
import { useRoute, useRouter } from "vue-router";
import { AppRouteRecordRawT } from "@router/types";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@vicons/antd";
const zBreadcrumb = defineComponent({
  name: "zBreadcrumb",
  components: {
    NBreadcrumb,
    NBreadcrumbItem,
  },
  setup(prop, ctx) {
    const useStore = useSysStore();
    const isExp = computed(() => {
      return useStore.collapse;
    });
    const isDark = computed(() => {
      return useStore.theme === "dark";
    });
    const route = useRoute();
    const routre = useRouter();
    const to = route => {
      if (!isActiveValue(route.name)) {
        routre.push({
          name: route.name,
        });
      }
    };
    const isActiveValue = (name): boolean => {
      return name === route.name;
    };
    const exp = () => {
      /* 改变全局状态 */
      useStore.$patch({
        collapse: !isExp.value,
      });
    };
    return () => (
      <div class="h-full pl-4 flex items-center truncate">
        <NIcon size={20} onClick={exp} style="cursor:pointer">
          {isExp.value ? <MenuFoldOutlined /> : <MenuUnfoldOutlined />}
        </NIcon>
        <NBreadcrumb
          class={
            "px-4 w-max text-base " +
            (isDark.value ? " text-gray-100" : " text-gray-600")
          }
        >
          {route.matched.map(v => {
            return (
              <NBreadcrumbItem
                class={isDark.value ? " text-gray-100" : " text-gray-600"}
              >
                <span style="cursor:pointer" onClick={to.bind(this, v)}>
                  {v.meta.title}
                </span>
              </NBreadcrumbItem>
            );
          })}
        </NBreadcrumb>
      </div>
    );
  },
});
export default zBreadcrumb;

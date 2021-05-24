import { defineComponent, reactive, ref } from "@vue/runtime-core";
import { useSysStore } from "@store/sys";
import { useRoute } from "vue-router";
import { computed } from "vue";
const zBreadcrumb = defineComponent({
  name: "zBreadcrumb",
  setup(prop, ctx) {
    const useStore = useSysStore();
    const isExp = computed(() => {
      return useStore.collapse;
    });
    const isDark = computed(() => {
      return useStore.theme === "dark";
    });
    const route = useRoute();
    const exp = () => {
      /* 改变全局状态 */
      useStore.$patch({
        collapse: !isExp.value,
      });
    };
    return () => (
      <div class="h-full pl-4 flex items-center truncate">
        <i
          onClick={exp}
          class={
            "el-icon-s-unfold font-light  text-xl cursor-pointer transform hover:scale-110 duration-500" +
            (isExp.value ? " rotate-180" : "")+(isDark.value?" text-gray-100":" text-gray-600")
          }
        ></i>
        <el-breadcrumb
          separator-class="el-icon-arrow-right text-red-300 "
          class={"px-4 w-max text-base "+(isDark.value?" text-gray-100":" text-gray-600")}
        >
          {route.matched.map(v => {
            return (
              <el-breadcrumb-item class={isDark.value?" text-gray-100":" text-gray-600"} to={v.path}>
                {v.meta.title}
              </el-breadcrumb-item>
            );
          })}
        </el-breadcrumb>
      </div>
    );
  },
});
export default zBreadcrumb;

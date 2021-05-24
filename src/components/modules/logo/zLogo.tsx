import { baseConfig } from "@config/base.config";
import { useSysStore } from "@store/sys";
import { useUserStore } from "@store/user";
import {
  defineComponent,
  computed,
  ref,
  watch,
} from "vue";

const zLogo = defineComponent({
  name: "zLogo",
  setup(prop, ctx) {
    const { sysName } = baseConfig;
    const sysStore = useSysStore();
    const user = useUserStore();
    const isCollapse = computed(() => {
      return sysStore.collapse;
    });
    const isDark = computed(() => {
      return sysStore.theme === "dark";
    });
    const isShowName = ref(true);
    watch(isCollapse, val => {
      setTimeout(() => {
        isShowName.value = !val;
      }, 500);
    });
    const methodHandle = {
      logout: () => {
        user.logout();
      },
    };
    return () => (
      <div class=" py-10 flex flex-col items-center w-full justify-center cursor-pointer overflow-hidden">
        {
          isShowName.value ?<el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"></el-avatar>:        <el-popover show-arrow={false} popper-class={isDark.value?"dark-pop":""} placement="right"  width={200} trigger="hover" v-Slots={
            {
              reference:()=><el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"></el-avatar>
            }
          }>
            <div class="w-full h-full flex flex-col">
              <div class={"px-4  w-full text-center truncate font-sans tracking-wide  antialiased"+(isDark.value?" text-gray-600":" text-gray-800")}>
              {user.username}
              </div>
            </div>
            <div class="flex space-x-4 pt-4 justify-center" >
               <div>
                 <el-tooltip content="消息" placement="bottom" effect={isDark.value?"dark":"light"}>
                    <el-badge class="transform hover:scale-125 duration-100">
                      <svg-icon size={18} name="message" class=""></svg-icon>
                      </el-badge>
                       </el-tooltip>
                        </div>
                          <div>
                             <el-tooltip content="待办" placement="bottom" effect={isDark.value?"dark":"light"}>
                                <el-badge class="transform hover:scale-125 duration-100">
                                   <svg-icon size={18} name="todo"></svg-icon>
                                 </el-badge>
                               </el-tooltip>
                           </div>
          <div>
            <el-tooltip content="登出" placement="bottom" effect={isDark.value?"dark":"light"}>
              <el-badge class="transform hover:scale-125 duration-100">
                <svg-icon
                  onClick={methodHandle.logout}
                  size={18}
                  name="logout"
                ></svg-icon>
              </el-badge>
            </el-tooltip>
          </div>
        </div>
          </el-popover>
        }
        <div
          class={
            "px-4  md:px-2 truncate  font-sans transition-all delay-100 tracking-wide  antialiased" +
            (isShowName.value ? "" : " hidden")+(isDark.value?" text-gray-300":" text-gray-800")
          }
        >
          {user.username}
        </div>
        <div
          class={"flex space-x-4 pt-4" + (isShowName.value ? "" : " hidden")}
        >
          <div>
            <el-tooltip content="消息" placement="bottom" effect={isDark.value?"dark":"light"}>
              <el-badge class="transform hover:scale-125 duration-100">
                <svg-icon size={18} name="message" class=""></svg-icon>
              </el-badge>
            </el-tooltip>
          </div>
          <div>
            <el-tooltip content="待办" placement="bottom" effect={isDark.value?"dark":"light"}>
              <el-badge class="transform hover:scale-125 duration-100">
                <svg-icon size={18} name="todo"></svg-icon>
              </el-badge>
            </el-tooltip>
          </div>
          <div>
            <el-tooltip content="登出" placement="bottom" effect={isDark.value?"dark":"light"}>
              <el-badge class="transform hover:scale-125 duration-100">
                <svg-icon
                  onClick={methodHandle.logout}
                  size={18}
                  name="logout"
                ></svg-icon>
              </el-badge>
            </el-tooltip>
          </div>
        </div>
      </div>
    );
  },
});
export default zLogo;

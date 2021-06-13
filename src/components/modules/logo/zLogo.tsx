import { baseConfig } from "@config/base.config";
import { useSysStore } from "@store/sys";
import { useUserStore } from "@store/user";
import { NTooltip, NAvatar, NPopover } from "naive-ui";
import { defineComponent, computed, ref, watch } from "vue";

const zLogo = defineComponent({
  name: "zLogo",
  setup(prop, ctx) {
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
        {isShowName.value ? (
          <NAvatar
            round
            src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
          ></NAvatar>
        ) : (
          <NPopover
            showArrow={false}
            placement="right"
            width={200}
            trigger="hover"
            v-slots={{
              trigger: () => (
                <NAvatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"></NAvatar>
              ),
              default: () => (
                <div>
                  <div class="w-full h-full flex flex-col">
                    <div
                      class={
                        "px-4  w-full text-center truncate font-sans tracking-wide  antialiased" +
                        (isDark.value ? " text-gray-600" : " text-gray-800")
                      }
                    >
                      {user.username}
                    </div>
                  </div>
                  <div class="flex space-x-4 pt-4 justify-center">
                    <div>
                      <NTooltip
                        v-slots={{
                          default: () => <span>消息</span>,
                          trigger: () => (
                            <svg-icon
                              size={18}
                              name="message"
                              class=""
                            ></svg-icon>
                          ),
                        }}
                      ></NTooltip>
                    </div>
                    <div>
                      <NTooltip
                        v-slots={{
                          default: () => <span>待办</span>,
                          trigger: () => (
                            <svg-icon size={18} name="todo"></svg-icon>
                          ),
                        }}
                      ></NTooltip>
                    </div>
                    <div>
                      <NTooltip
                        v-slots={{
                          default: () => <span>登出</span>,
                          trigger: () => (
                            <svg-icon
                              onClick={methodHandle.logout}
                              size={18}
                              name="logout"
                            ></svg-icon>
                          ),
                        }}
                      ></NTooltip>
                    </div>
                  </div>
                </div>
              ),
            }}
          ></NPopover>
        )}
        <div
          class={
            "px-4  md:px-2 truncate  font-sans transition-all delay-100 tracking-wide  antialiased" +
            (isShowName.value ? "" : " hidden") +
            (isDark.value ? " text-gray-300" : " text-gray-800")
          }
        >
          {user.username}
        </div>
        <div
          class={"flex space-x-4 pt-4" + (isShowName.value ? "" : " hidden")}
        >
          <div>
            <NTooltip
              placement="bottom"
              v-slots={{
                default: () => <span>消息</span>,
                trigger: () => (
                  <svg-icon size={18} name="message" class=""></svg-icon>
                ),
              }}
            ></NTooltip>
          </div>
          <div>
            <NTooltip
              placement="bottom"
              v-slots={{
                default: () => <span>待办</span>,
                trigger: () => <svg-icon size={18} name="todo"></svg-icon>,
              }}
            ></NTooltip>
          </div>
          <div>
            <NTooltip
              placement="bottom"
              v-slots={{
                default: () => <span>登出</span>,
                trigger: () => (
                  <svg-icon
                    onClick={methodHandle.logout}
                    size={18}
                    name="logout"
                  ></svg-icon>
                ),
              }}
            ></NTooltip>
          </div>
        </div>
      </div>
    );
  },
});
export default zLogo;

import { changeLocaleEle } from "@plugins/config/i18n.config";
import { localStoreApi } from "@store/localStore/local";
import { useSysStore } from "@store/sys";
import { useUserStore } from "@store/user";
import { changeTheme } from "@utils/theme";
import { defineComponent, nextTick, reactive, ref } from "vue";
import { useI18n } from "vue-i18n";
import { useRoute, useRouter } from "vue-router";

const zUserMenu = defineComponent({
  name: "zUsermenu",
  setup() {
    const store = useUserStore();
    const sys = useSysStore();
    const isFull = ref(false);
    const localStore = new localStoreApi();
    const handleClick = {
      reload: () => {
        window.location.reload();
      },
      full: () => {
        // alternative standard method
        if (!document.fullscreenElement) {
          isFull.value = true;
          // current working methods
          if (document.documentElement.requestFullscreen) {
            document.documentElement.requestFullscreen();
          }
        } else {
          isFull.value = false;
          if (document.exitFullscreen) {
            document.exitFullscreen();
          }
        }
      },
      theme: () => {
        const sysTheme = sys.theme === "dark" ? "light" : "dark";
        sys.$patch({
          theme: sysTheme,
        });
        changeTheme(sysTheme);
      },
    };
    const { locale } = useI18n();
    const handChangeLang = command => {
      locale.value = command;
      localStore.set("la", command);
      changeLocaleEle(command);
    };
    const proxyClick = e => {
      let id = e.target.id;
      id && handleClick[id]();
    };
    return () => (
      <div class="w-full flex  justify-end items-center pr-10 h-full">
        <div
          class=" flex-1 hidden sm:flex justify-end space-x-10 cursor-pointer"
          onClick={proxyClick}
        >
          <div class="  w-4 text-center transform hover:scale-125 duration-100 border-b-2 border-solid border-opacity-50 border-red-400">
            <i id="reload" class="iconshuaxin iconfont text-base"></i>
          </div>
          <div
            id="lang "
            class=" w-4 text-center transform hover:scale-125 duration-100 border-b-2 border-solid border-opacity-50 border-red-400"
          >
            <el-dropdown
              size="mini"
              onCommand={handChangeLang}
              v-slots={{
                dropdown: () => (
                  <el-dropdown-menu>
                    <el-dropdown-item command="zh">Chinese</el-dropdown-item>
                    <el-dropdown-item command="en">English</el-dropdown-item>
                  </el-dropdown-menu>
                ),
              }}
            >
              {}
              <i
                class={
                  "iconfont text-base " +
                  (locale.value === "zh"
                    ? " iconzhongyingwen2zhongwen"
                    : " iconzhongyingwenyingwen02-01")
                }
              ></i>
            </el-dropdown>
          </div>
          <div class=" w-4 text-center transform hover:scale-125 duration-100 border-b-2 border-solid border-opacity-50 border-red-400">
            <i id="search" class="iconfont iconsousuo text-base"></i>
          </div>
          <div class="w-4 text-center transform hover:scale-125 duration-100 border-b-2 border-solid border-opacity-50 border-red-400">
            <i
              id="full"
              class={
                isFull.value
                  ? "iconfont iconsuofangsuoxiao text-base"
                  : "text-xl iconfont iconquanping"
              }
            ></i>
          </div>
          <div class="w-auto text-center text-xs transform hover:scale-125 duration-100 border-b-2 border-solid border-opacity-50 border-red-400">
            {sys.theme == "dark" ? (
              <svg-icon
                size={20}
                onClick={handleClick.theme}
                class="inline-block w-auto px-2"
                name="light"
              ></svg-icon>
            ) : (
              <svg-icon
                size={20}
                onClick={handleClick.theme}
                class="inline-block w-auto px-2"
                name="dark"
              ></svg-icon>
            )}
          </div>
        </div>
      </div>
    );
  },
});
export default zUserMenu;

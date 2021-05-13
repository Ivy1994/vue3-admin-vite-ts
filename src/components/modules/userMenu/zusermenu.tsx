import { changeLocaleEle } from "@plugins/config/i18n.config";
import { localStoreApi } from "@store/localStore/local";
import { useUserStore } from "@store/user";
import { defineComponent, nextTick, reactive, ref } from "vue";
import { useI18n } from "vue-i18n";
import { useRoute, useRouter } from "vue-router";

const zUserMenu = defineComponent({
  name: "zUsermenu",
  setup() {
    const store = useUserStore();
    const isFull = ref(false);
    const localStore = new localStoreApi();
    const handleClick = reactive({
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
    });
    const { locale } = useI18n();
    const handleCommand = commad => {
      switch (commad) {
        case "c":
          store.logout();
          break;
      }
    };
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
          <div class=" text-gray-700 w-4 text-center transform hover:scale-125 duration-100 border-b-2 border-solid border-opacity-50 border-red-400">
            <i id="reload" class="iconshuaxin iconfont text-xl"></i>
          </div>
          <div
            id="lang "
            class="text-gray-700 w-4 text-center transform hover:scale-125 duration-100 border-b-2 border-solid border-opacity-50 border-red-400"
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
                  "iconfont text-xl " +
                  (locale.value === "zh"
                    ? " iconzhongyingwen2zhongwen"
                    : " iconzhongyingwenyingwen02-01")
                }
              ></i>
            </el-dropdown>
          </div>
          <div class="text-gray-700 w-4 text-center transform hover:scale-125 duration-100 border-b-2 border-solid border-opacity-50 border-red-400">
            <i id="search" class="iconfont iconsousuo text-xl"></i>
          </div>
          <div class="text-gray-700 w-4 text-center transform hover:scale-125 duration-100 border-b-2 border-solid border-opacity-50 border-red-400">
            <i
              id="full"
              class={
                isFull.value
                  ? "iconfont iconsuofangsuoxiao text-xl"
                  : "text-xl iconfont iconquanping"
              }
            ></i>
          </div>
        </div>
        {/*  <div class="flex items-center w-24 pr-10 text-center">
          <el-dropdown
            onCommand={handleCommand}
            size="mini"
            class="outline-none"
            vSlots={{
              dropdown: () => {
                return (
                  <el-dropdown-menu>
                    <el-dropdown-item command="a">个人中心</el-dropdown-item>
                    <el-dropdown-item command="b">我的待办</el-dropdown-item>
                    <el-dropdown-item command="c">注销登录</el-dropdown-item>
                  </el-dropdown-menu>
                );
              },
            }}
          >
            <div class="whitespace-normal truncate align-middle word-inline sm:block">
              个人中心
            </div>
          </el-dropdown>
        </div> */}
      </div>
    );
  },
});
export default zUserMenu;

//@ts-nocheck
import { useSysStore } from "@store/sys";
import { computed, defineComponent, reactive, ref } from "@vue/runtime-core";
import { render, Teleport, createVNode, withModifiers, Transition } from "vue";
import { useRoute, useRouter } from "vue-router";
interface MenuItem {
  icon?: string;
  text: string;
  click: any;
}
const zTagItem = defineComponent({
  name: "zTagitem",
  components: { Transition },
  props: {
    item: {
      type: Object,
      required: true,
    },
    closeAbled: {
      type: Boolean,
    },
  },
  setup(prop, ctx) {
    const route = useRoute();
    const router = useRouter();
    const sysStore = useSysStore();
    const targetName = ref("");
    const isDark = computed(()=>{
      return sysStore.theme ==="dark"
    })
    /* 点击close */
    const handClick = evt => {
      switch (evt.target.id) {
        case "close":
          sysStore.removeItem(prop.item);
          break;
        default:
          router.push({ name: prop.item.name });
          break;
      }
    };
    /* 删除tags */
    const deleteItem = () => {
      sysStore.deletByName(targetName.value);
    };
    /* 点击事件回掉 */
    const callBack = (item, event) => {
      !canClick() && item.click();
      !canClick() && clickOutSide();
    };
    /* 菜单label */
    const createMenuLabel = (): MenuItem[] => {
      return [
        {
          icon: "el-icon-delete",
          text: "删除",
          click: deleteItem,
        },
      ];
    };
    /* 菜单节点 */
    const createMenuNode = (x: number, y: number) => {
      const Menu = {
        setup() {
          return () => (
            <Teleport to="body">
              <div
                class="rigth-menu bg-white shadow-lg w-44"
                id="right-menu"
                style={`top:${y + 5}px;left:${x + 10}px;z-index:9999`}
                onContextmenu={e => {
                  e.preventDefault();
                  e.stopPropagation;
                }}
              >
                {createMenuLabel().map((v, i) => {
                  return createMenuItem(v, i);
                })}
              </div>
            </Teleport>
          );
        },
      };
      return Menu;
    };
    /* 判断是否可点击 */
    const canClick = () => {
      return sysStore.fixedTags.some(v => v.name === targetName.value);
    };
    /* 菜单子项 */
    const createMenuItem = (item: MenuItem, i: number) => {
      return (
        <div
          id={"right-menu_" + i}
          class={
            "w-full  grid h-8 align-middle grid-cols-7 px-6 text-gray-500 hover:text-blue-400 hover:bg-gray-100 " +
            (canClick() ? "cursor-not-allowed" : "cursor-pointer ")
          }
        >
          <div
            onClick={withModifiers(callBack.bind(this, item), ["self"])}
            class="col-span-2 leading-8"
            id={"right-menu___" + i}
          >
            <i id={"right-menu____" + i} class={item.icon}></i>
          </div>
          <div
            onClick={withModifiers(callBack.bind(this, item), ["self"])}
            class=" col-span-4 h-full leading-8	"
            id={"right-menu__" + i}
          >
            {item.text}
          </div>
        </div>
      );
    };
    /* 右键点击事件 */
    const MenuClick = (evt: MouseEvent) => {
      evt.preventDefault();
      document.querySelector("#right-menu")
        ? document.body.removeChild(
            document.querySelector("#right-menu") as Element
          )
        : "";
      targetName.value = evt.target.getAttribute("route") as string;
      const { x, y } = evt;
      const _Node = createMenuNode(x, y);
      render(createVNode(_Node), document.createElement("div"));
      const el = document.querySelector("#right-menu");
      document.body.addEventListener("click", listenDom);
    };
    /* event监听事件 */
    const listenDom = (evt: MouseEvent) => {
      const { target } = evt;
      //@ts-ignore
      if (target && target.id && target.id.includes("right-menu")) {
      } else {
        clickOutSide();
      }
    };
    /* 点击外部 */
    const clickOutSide = () => {
      const el = document.querySelector("#right-menu");
      document.body.removeEventListener("click", listenDom);
      el && document.body.removeChild(el);
    };
    return () => (
      <transition name="fade" appear mode="out-in">
        <div
          onClick={handClick}
          onContextmenu={MenuClick}
          route={prop.item.name}
          class={
            " w-auto  text-base  align-middle  border-solid	border-2 h-8  justify-center cursor-pointer transform  transition-all delay-50  flex hover:bg-opacity-80 hover:text-gray-900 " +
            (route.name === prop.item.name
              ? "bg-blue-500 text-gray-200 border-blue-300"
              : "bg-white 	 text-black border-gray-200")
          }
        >
          <div
            id="title"
            route={prop.item.name}
            class="text-center px-2 align-middle flex-1 flex items-center justify-center"
          >
            <span route={prop.item.name}>{prop.item.meta.title}</span>
            <div
              route={prop.item.name}
              class={
                "w-4 pl-1 text-center align-middle flex items-center justify-center" +
                (prop.closeAbled ? " hidden" : "") +
                (route.name === prop.item.name ? "" : " hidden")
              }
            >
              <i
                id="close"
                class={
                  (route.name === prop.item.name
                    ? "text-gray-200 "
                    : "text-black") + " el-icon-circle-close"
                }
              ></i>
            </div>
          </div>
        </div>
      </transition>
    );
  },
});
export default zTagItem;

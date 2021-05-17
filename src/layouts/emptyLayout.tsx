import { defineComponent } from "@vue/runtime-core";

const emptyLayout = defineComponent({
  setup() {
    return ()=>
    <router-view/>;
  }
})
export default emptyLayout
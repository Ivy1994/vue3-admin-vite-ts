import { defineComponent, ref, watch } from "@vue/runtime-core";
const loading = defineComponent({
  name: "loading",
  setup(prop, ctx) {
    const isShow = ref(true);
    return () => (
      <div class={"center-bar w-full h-full" + (isShow.value ? "" : "hidden")}>
        <div class="bar"></div>
        <div class="bar"></div>
        <div class="bar"></div>
        <div class="bar"></div>
        <div class="bar"></div>
        <div class="bar"></div>
        <div class="bar"></div>
        <div class="bar"></div>
      </div>
    );
  },
});
export default loading;

import { defineComponent } from "@vue/runtime-core";
const bigScreen = defineComponent({
  setup() {
    return () => (
      <div class="screen-big">
        <div class="head">
          <div class="title">
            <div class="text">小裁缝可视化chart图</div>
            <div class="bg"></div>
          </div>
        </div>
      </div>
    );
  },
});
export default bigScreen;

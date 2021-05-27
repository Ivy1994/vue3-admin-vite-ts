import { defineComponent } from "@vue/runtime-core";

const pageNotFound = defineComponent({
  setup() {
    return () => (
      <div class="w-screen h-screen flex items-center justify-center flex-col bg-gray-800">
        <div class="w-full not-found-content">
          <div class="text-center not-found-title">404</div>
          <div class="text-center not-found-tip">PAGE NOT FOUND</div>
        </div>
        <div class="flash-btn mt-8 cursor-pointer">
          返回首页
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    );
  },
});
export default pageNotFound;

import {
  defineComponent,
  ref,
  watch,
  toRefs,
  onMounted,
  nextTick,
  computed,
} from "vue";

const zInput = defineComponent({
  name: "zInput",
  props: {
    modelValue: {
      type: String,
      default: "",
    },
  },
  inheritAttrs: false,
  emits: ["update:value", "change", "input"],
  setup(prop, ctx) {
    const nativeValue = ref("");
    onMounted(() => {
      nativeValue.value = prop.modelValue;
    });
    watch(
      () => prop.modelValue,
      val => {
        nativeValue.value = val;
      }
    );
    watch(
      () => nativeValue.value,
      val => {
        console.log(1231);

        ctx.emit("update:value", val);
      }
    );
    const changeInput = event => {
      ctx.emit("change", event.target.value);
    };
    const input = ref<any>(null);
    const inputOrTextarea = computed(() => input.value);
    const setNativeInputValue = () => {
      const input = inputOrTextarea.value;
      if (!input || input.value === nativeValue.value) return;
      input.value = nativeValue.value;
    };
    const handleInput = event => {
      const { value } = event.target;
      console.log(value);

      if (value === nativeValue.value) return;

      ctx.emit("update:value", value);
      ctx.emit("input", value);

      // ensure native input value is controlled
      // see: https://github.com/ElemeFE/element/issues/12850
      nextTick(setNativeInputValue);
    };
    return () => (
      <div>
        <input
          onInput={handleInput}
          ref={input.value}
          onChange={changeInput}
          value={nativeValue.value}
          type="text"
        />
      </div>
    );
  },
});
export default zInput;

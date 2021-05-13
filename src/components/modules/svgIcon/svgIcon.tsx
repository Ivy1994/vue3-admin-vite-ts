import { defineComponent, computed } from "vue";

const svgIcon = defineComponent({
  name: "svgIcon",
  props: {
    prefix: {
      type: String,
      default: "icon",
    },
    name: {
      type: String,
      required: true,
    },
    color: {
      type: String,
      default: "#333",
    },
    size: {
      type: Number,
      required: false,
      default: 24,
    },
  },
  setup(prop) {
    const symbolId = computed(() => `#${prop.prefix}-${prop.name}`);
    return () => (
      <svg aria-hidden="true" height={prop.size} width={prop.size}>
        <use xlinkHref={symbolId.value} fill={prop.color} />
      </svg>
    );
  },
});
export default svgIcon;

import { defineComponent, ref } from "vue";

const index = defineComponent({
  setup(props) {
    console.log(props);
    return () => <article></article>;
  },
});
export default index;
/* come bb  */

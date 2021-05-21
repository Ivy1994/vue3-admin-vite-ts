import { defineComponent, ref } from "vue";
import testTree from "./test/tree";
const gridTable = defineComponent({
  name: "gridTable",
  components: {
    testTree,
  },
  setup() {
    const activeName = ref("first_1");
    const active = ref(1)
    const changeActive = (index:number):void=>{
       active.value=index
    }
    return () => (
      <div>
        <div class="w-full h-24  flex items-end " style="background-color:#3c00ca">
          <span class="inline-block bander-item"></span>
          <span onClick={changeActive.bind(this,1)} class={"inline-block w-1/6 h-1/2  bander-item"+(active.value===1?" is-active":"")}>子项</span>
          <span onClick={changeActive.bind(this,2)}  class={"inline-block w-1/6 h-1/2  bander-item"+(active.value===2?" is-active":"")}>子项</span>
          <span onClick={changeActive.bind(this,3)} class={"inline-block w-1/6 h-1/2  bander-item"+(active.value===3?" is-active":"")}>子项</span>
          <span onClick={changeActive.bind(this,4)} class={"inline-block w-1/6 h-1/2  bander-item"+(active.value===4?" is-active":"")} >子项</span>
          <span onClick={changeActive.bind(this,5)} class={"inline-block w-1/6 h-1/2  bander-item"+(active.value===5?" is-active":"")}>子项</span>
          <span class="inline-block bander-item "></span>
        </div>
      </div>
    );
  },
});
export default gridTable;

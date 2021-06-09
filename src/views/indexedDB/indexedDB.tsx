import { defineComponent } from "@vue/runtime-core";
import Use_DB, { DBoptions } from "src/hooks/useDB";

const indexedDB = defineComponent({
  name:"indexedBD",
  setup (){
    const option:DBoptions = {
      name:"test",
      version:1
    }
    const db = new Use_DB(option)    
    return ()=>(
      <div>indexedBD</div>
    )
  }
})
export default indexedDB
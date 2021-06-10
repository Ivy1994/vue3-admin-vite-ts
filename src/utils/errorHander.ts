import { useSysStore } from "@store/sys";
import { App } from "@vue/runtime-core";
import Use_DB from "src/hooks/useDB";


export const errorHander = (app:App) =>{
  app.config.errorHandler = (err,vm,info)=>{
    const listItem = {
      time:new Date().toString(),
      desc: {
        err,info,vm:vm?.$.type.name
      }
    }
    console.log("[Error-Hander]:已存储到本地，可查看或选择上报");
    console.log(err);
    const sys = useSysStore()
    const db = (sys.baseSql as Use_DB)
    db.addSource("vue-hander")
    db.updateArrayData("vue-hander",[listItem],"error","i")
  }
}
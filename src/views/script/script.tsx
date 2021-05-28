import { defineComponent, reactive, ref } from "@vue/runtime-core";
import type {AxiosRequestConfig } from "axios"
import { ElFormContext, ElFormItemContext } from "element-plus/lib/el-form";
interface taskItem {
  doTime: string,
  script: string,
  tools: "axios" | "fetch",
  url: string,
  headers?: any,
  method:"GET" | "POST" |"DELETE" |"PUT"
}
const scriptIndex = defineComponent({
  setup() {
    const task = reactive<taskItem>({
      doTime: "",
      script: "",
      tools: "axios",
      url: "",
      method: "GET",
      headers:""
    })
    const taskList = ref<Array<taskItem>>([])
    const formContent = ref<ElFormItemContext>()
    const timerList = ref<Array<any>>([])
    const addTask = () => {
      taskList.value = [...taskList.value, task]
    }
    const clearTaskText = () => {
      task.doTime = ""
      task.method = "GET"
      task.headers = ""
      task.url = ""
      task.tools = "axios"
      task.script = ""
    }
  }
})
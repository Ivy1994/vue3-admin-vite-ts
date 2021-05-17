import { defineComponent,nextTick,onMounted,reactive } from "vue";

const splitPane= defineComponent({
  name:"splitPane",
  props:{
    maxWidth:Number,
    minWidth:Number,
    leftTitle:String,
    rightTitle:String
  },
  emits:["drug","drugend","load"],
  setup(props,ctx) {
    const basePosition = reactive({
      pageX: 0,
      pageY: 0,
    });
    onMounted(()=>{     
      nextTick(()=>{
        ctx.emit("load",ctx)
      }) 
    })
    const hnadleMouseDown = (evt: MouseEvent) => {
      let {pageX,pageY} = evt
      basePosition.pageX = pageX
      basePosition.pageY = pageY
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
    };
    const handleMouseMove = evt => {
      evt.//阻止默认事件
      //preventDefault()[dom标准写法(ie678不兼容)]
      //ie678用returnValue
      //或者利用return false也能阻止默认行为,没有兼容问题(只限传统注册方式)
      preventDefault()
      let {pageX} = evt
      const baseDiv = document.querySelector(".right-border-shadow")
      let baseWidth:Number | undefined = 374+pageX-basePosition.pageX
      baseWidth = (baseWidth > Number(props?.maxWidth)) ? props.maxWidth :baseWidth
      baseWidth = (Number(baseWidth) < Number(props?.minWidth)) ? props.minWidth :baseWidth
      baseDiv?.setAttribute("style",`width:${baseWidth}px`)
    };
    const handleMouseUp = evt => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
      ctx.emit("drugend")
    };
    return () => (
      <div class="w-full h-full flex">
        <div class={"flex flex-col right-border-shadow transition-all duration-150"} style={`width:${props.minWidth?props.minWidth:384}px`}>
          <div class="w-full text-center py-4 text-xl text-gray-600 h-20">
            {props.leftTitle?props.leftTitle:"左标题"}
          </div>
          <div class="flex-1">
            {
              ctx.slots.leftContet && ctx.slots.leftContet()
            }
          </div>
        </div>
        <div
          id="line"
          class="w-2 cursor-move"
          onMousedown={hnadleMouseDown}
        ></div>
        <div class="flex-1 h-full overflow-hidden">
          {
             ctx.slots.rightContent && ctx.slots.rightContent()
          }
        </div>
      </div>
    );
  }
})
export default splitPane
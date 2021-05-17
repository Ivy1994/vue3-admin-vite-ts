import splitPane from "@components/modules/splitPane/splitPane";
import { ECOption } from "@plugins/echarts";
import {
  defineComponent,
  inject,
  nextTick,
  onMounted,
  ref,
  reactive,
} from "@vue/runtime-core";
import { AppGolbalConfig } from "types";

const echartsDemo = defineComponent({
  name: "echartsDemo",
  setup() {
    const  {$echarts} = inject("_app") as AppGolbalConfig
    const split = ref(null)
    let charts:any;
    const onSplitMounted = (e)=>{
      nextTick(()=>{
        !!charts && charts.dispose()
      })
      setTimeout(()=>{
      //@ts-ignore
      charts = $echarts.init(document.querySelector("#charts"))
      charts.setOption(chartsOption)
      },100)
      console.log(split.value);
      
    }
    window.onresize = ()=>{
      /* charts自适应 */
      !!charts && charts.resize()
    }
    const onResize = ()=>{
      !!charts && charts.resize()

    }
    const onDrug = ()=>{
      charts.resize()
    }
    const chartsOption:ECOption = {
      xAxis: {
        type: 'category',
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    },
    yAxis: {
        type: 'value'
    },
    series: [{
        data: [150, 230, 224, 218, 135, 147, 260],
        type: 'line'
    }]
  };
    return () => (
      <div class="w-full h-full">
        {/* 自组件slots方式加载会低于父组件，可能导致获取不到dom对象，所以使用onload触发渲染完成事件 */}
        <splitPane ref={split} sotoreage={true} onDrugend={onDrug} onResize={onResize} onLoad={onSplitMounted} leftTitle="配置项" minWidth={384} maxWidth={648} v-Slots={{
          leftContet:()=><div>1231231</div>,
          rightContent:()=><div id="charts" style="height:100%;width:100%"></div>
        }}></splitPane>
      </div>
    );
  },
});
export default echartsDemo;

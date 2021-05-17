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
import { ElFormContext } from "element-plus/lib/el-form";
import { AppGolbalConfig } from "types";

const echartsDemo = defineComponent({
  name: "echartsDemo",
  setup() {
    const { $echarts } = inject("_app") as AppGolbalConfig;
    const split = ref(null);
    let charts: any;
    const onSplitMounted = e => {
      nextTick(() => {
        !!charts && charts.dispose();
      });
      setTimeout(() => {
        //@ts-ignore
        charts = $echarts.init(document.querySelector("#charts"));
        charts.setOption(chartsOption);
      }, 100);
    };
    const onResize = () => {
      !!charts && charts.resize();
    };
    const onDrug = () => {
      charts.resize();
    };
    const chartsOption: ECOption = {
      xAxis: {
        type: "category",
        data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      },
      yAxis: {
        type: "value",
      },
      series: [
        {
          data: [150, 230, 224, 218, 135, 147, 260],
          type: "line",
        },
      ],
    };
    const form = reactive({
      type: "",
      dataOrgin: "",
      remoteApi: "",
    });
    const formRef = ref({} as ElFormContext);
    const slotsSplit = {
      leftContet: () => (
        <div>
          <el-form
            ref={formRef}
            model={form}
            label-width="80px"
            label-position="right"
            size="mini"
          >
            <el-form-item label="类型">
              <el-radio-group v-model={form.type}>
                <el-radio label="bar">柱状图</el-radio>
                <el-radio label="line">折线图</el-radio>
                <el-radio label="pie">饼图</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="数据来源">
              <el-select v-model={form.dataOrgin}>
                <el-option label="远端数据" value="remote"></el-option>
                <el-option label="本地数据" value="location"></el-option>
              </el-select>
            </el-form-item>
            {form.dataOrgin === "remote" && (
              <el-form-item label="接口配置">
                <el-select v-model={form.remoteApi}>
                  <el-option label="charts接口1" value="remote"></el-option>
                  <el-option label="charts接口2" value="location1"></el-option>
                  <el-option label="charts接口3" value="location2"></el-option>
                  <el-option label="charts接口4" value="location3"></el-option>
                  <el-option label="charts接口5" value="location4"></el-option>
                  <el-option label="charts接口6" value="location5"></el-option>
                  <el-option label="charts接口7" value="location6"></el-option>
                </el-select>
              </el-form-item>
            )}
          </el-form>
        </div>
      ),
      rightContent: () => (
        <div id="charts" style="height:100%;width:100%"></div>
      ),
    };
    return () => (
      <div class="w-full h-full">
        {/* 自组件slots方式加载会低于父组件，可能导致获取不到dom对象，所以使用onload触发渲染完成事件 */}
        <splitPane
          ref={split}
          sotoreage={true}
          onDrugend={onDrug}
          onResize={onResize}
          onLoad={onSplitMounted}
          leftTitle="配置项"
          minWidth={384}
          maxWidth={800}
          v-Slots={slotsSplit}
        ></splitPane>
      </div>
    );
  },
});
export default echartsDemo;

import { defineComponent, inject, ref,reactive } from "@vue/runtime-core";
import {Chart} from "@antv/g2"
import { ElFormContext } from "element-plus/lib/el-form";
const antvDemo = defineComponent({
  name: "antvDemo",
  setup() {
    let chart:Chart;
    const data = ref([
      { year: '1951 年', sales: 38 },
      { year: '1952 年', sales: 52 },
      { year: '1956 年', sales: 61 },
      { year: '1957 年', sales: 145 },
      { year: '1958 年', sales: 48 },
      { year: '1959 年', sales: 38 },
      { year: '1960 年', sales: 38 },
      { year: '1962 年', sales: 38 },
    ])
    const onSplitMounted = ()=>{
      setTimeout(()=>{
               chart = new Chart({
        container: 'c1',
        autoFit: true,
        renderer: 'canvas',
        padding: [20, 20, 95, 80], // 上，右，下，左
      });
      chart.data(data.value)
      chart.scale('sales', {
        nice: true,
      });
      
      chart.tooltip({
        showMarkers: false
      });
      chart.interaction('active-region');
      
      chart.interval().position('year*sales');
      
      chart.render();
      },100)
    }
    const changeSize = ()=>{
      chart && chart.forceFit()
    }

    const form = reactive({
      type: "",
      dataOrgin: "",
      remoteApi: "",
    });
    const formRef = ref({} as ElFormContext);
    const slotsSplit={
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
      rightContent:()=><div class=" w-full h-full overflow-hidden" id="c1"></div>
    }
    return () => (
      <div class="w-full h-full">
        {/* 自组件slots方式加载会低于父组件，可能导致获取不到dom对象，所以使用onload触发渲染完成事件 */}
        <splitPane
          sotoreage={true}
          onLoad={onSplitMounted}
          onDrugend={changeSize}
          leftTitle="配置项"
          minWidth={384}
          maxWidth={800}
          v-Slots={slotsSplit}
        ></splitPane>
      </div>
    );
  },
});
export default antvDemo;

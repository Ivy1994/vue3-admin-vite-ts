import { defineComponent, inject, ref, reactive } from "@vue/runtime-core";
import { Chart } from "@antv/g2";
const antvDemo = defineComponent({
  name: "antvDemo",
  setup() {
    let chart: Chart;
    const data = ref([
      { year: "1951 年", sales: 38 },
      { year: "1952 年", sales: 52 },
      { year: "1956 年", sales: 61 },
      { year: "1957 年", sales: 145 },
      { year: "1958 年", sales: 48 },
      { year: "1959 年", sales: 38 },
      { year: "1960 年", sales: 38 },
      { year: "1962 年", sales: 38 },
    ]);
    const onSplitMounted = () => {
      setTimeout(() => {
        chart = new Chart({
          container: "c1",
          autoFit: true,
          renderer: "canvas",
          padding: [20, 20, 95, 80], // 上，右，下，左
        });
        chart.data(data.value);
        chart.scale("sales", {
          nice: true,
        });

        chart.tooltip({
          showMarkers: false,
        });
        chart.interaction("active-region");

        chart.interval().position("year*sales");

        chart.render();
      }, 100);
    };
    const changeSize = () => {
      chart && chart.forceFit();
    };

    const form = reactive({
      type: "",
      dataOrgin: "",
      remoteApi: "",
    });
    const slotsSplit = {
      leftContet: () => <div></div>,
      rightContent: () => (
        <div class=" w-full h-full overflow-hidden" id="c1"></div>
      ),
    };
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

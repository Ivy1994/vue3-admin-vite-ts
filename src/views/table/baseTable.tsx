import tableModel from "@apis/table/table";
import { AppGolbalConfig } from "types";
import {
  defineComponent,
  inject,
  onMounted,
  reactive,
  ref,
  withModifiers,
} from "vue";
import { VxeTableInstance } from "vxe-table";
const baseTable = defineComponent({
  name: "baseTable",
  setup() {
    const baseTableRef = ref({} as VxeTableInstance);
    const _app = inject("_app") as AppGolbalConfig;
    const { $echarts } = _app;
    const loading = ref(false);
    const pageConf = reactive({
      pageSize: 20,
      currentPage: 1,
      total: 0,
    });
    onMounted(() => {
      getTableData();
    });
    const getTableData = () => {
      loading.value = true;
      tableModel
        .base({
          pageSize: pageConf.pageSize,
          currentPage: pageConf.currentPage,
        })
        .then(res => {
          baseTableRef.value.loadData(res.list);
          pageConf.total = res.total;
          loading.value = false;
        })
        .catch(err => {
          console.log(err);
          loading.value = false;
        });
    };
    const inputSlot = {
      default: ({ row }) => (
        <el-input size="mini" v-model={row.name}></el-input>
      ),
    };
    const searchMethod = e => {
      let { pageSize, currentPage, type } = e;
      if (type === "size") {
        pageConf.currentPage = 1;
        getTableData();
      } else {
        getTableData();
      }
    };
    const handINput = row => {
      const rows = Object.assign(row, { name: "1111" });
      baseTableRef.value.reloadRow([rows]);
    };
    return () => (
      <div>
        <vxe-table
          v-loading={loading.value}
          header-row-class-name="table-header"
          border="full"
          align="center"
          auto-resize
          height="400px"
          ref={baseTableRef}
        >
          <vxe-table-column type="seq" title="#"></vxe-table-column>
          <vxe-table-column field="name" title="姓名"></vxe-table-column>
          <vxe-table-column field="date" title="出生日期"></vxe-table-column>
          <vxe-table-column field="sex" title="性别"></vxe-table-column>
          <vxe-table-column field="positon" title="岗位"></vxe-table-column>
          <vxe-table-column field="ins" title="简介"></vxe-table-column>
          <vxe-table-column field="email" title="邮箱"></vxe-table-column>
          <vxe-table-column
            field=""
            title="test"
            v-slots={{
              default: ({ row }) => {
                return (
                  <el-button
                    size="mini"
                    type="success"
                    onClick={handINput.bind(this, row)}
                  >
                    update
                  </el-button>
                );
              },
            }}
          ></vxe-table-column>
          <vxe-table-column
            field=""
            title="input"
            v-Slots={inputSlot}
          ></vxe-table-column>
          <vxe-table-column
            field="domain"
            title="域名"
            sortable
            filters={[
              {
                data: {
                  vals: [],
                  sVal: "",
                  fMenu: "",
                  f1Type: "",
                  f1Val: "",
                  fMode: "and",
                  f2Type: "",
                  f2Val: "",
                },
              },
            ]}
            filter-render={{ name: "FilterExcel" }}
          ></vxe-table-column>
        </vxe-table>
        <vxe-pager
          v-models={[
            [pageConf.currentPage, "currentPage"],
            [pageConf.pageSize, "pageSize"],
          ]}
          onPageChange={searchMethod}
          total={pageConf.total}
          layouts={[
            "PrevJump",
            "PrevPage",
            "JumpNumber",
            "NextPage",
            "NextJump",
            "Sizes",
            "Total",
          ]}
        ></vxe-pager>
      </div>
    );
  },
});
export default baseTable;

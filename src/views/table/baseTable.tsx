import tableModel from "@apis/table/table";
import { defineComponent, onMounted, reactive, ref } from "vue";
import { VxeTableInstance } from "vxe-table";
import _ from "loadsh";
import { getAnyKey } from "@utils/utils";
const baseTable = defineComponent({
  name: "baseTable",
  setup() {
    const baseTableRef = ref({} as VxeTableInstance);
    const tableData = ref([]);
    const loading = ref(false);
    const aa = {
      a: {
        s: {
          c: 222,
        },
      },
    };
    console.log(getAnyKey(aa, "a.c", 100));

    const pageConf = reactive({
      pageSize: 20,
      currentPage: 1,
      total: 0,
    });
    onMounted(() => {
      getTableData();
    });
    const getTableData = () => {
      baseTableRef.value.clearScroll();
      loading.value = true;
      tableModel
        .base({
          pageSize: pageConf.pageSize,
          currentPage: pageConf.currentPage,
        })
        .then(res => {
          // baseTableRef.value.loadData(res.list);
          tableData.value = res.list;
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
          cell-class-name="table-cell"
          border="full"
          align="center"
          height="400px"
          round
          autoResize={true}
          ref={baseTableRef}
          data={tableData.value}
        >
          <vxe-table-column width="80" type="seq" title="#"></vxe-table-column>
          <vxe-table-column
            width="200"
            field="name"
            title="姓名"
          ></vxe-table-column>
          <vxe-table-column
            width="200"
            field="date"
            title="出生日期"
          ></vxe-table-column>
          <vxe-table-column
            width="200"
            field="sex"
            title="性别"
          ></vxe-table-column>
          <vxe-table-column
            width="200"
            field="positon"
            title="岗位"
          ></vxe-table-column>
          <vxe-table-column
            width="200"
            field="ins"
            title="简介"
          ></vxe-table-column>
          <vxe-table-column
            width="200"
            field="email"
            title="邮箱"
          ></vxe-table-column>
          <vxe-table-column
            width="200"
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
            width="200"
            v-Slots={inputSlot}
          ></vxe-table-column>
          <vxe-table-column
            field="domain"
            width="200"
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
          class-name="pager-style"
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

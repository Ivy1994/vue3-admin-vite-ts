import tableModel from "@apis/table/table";
import { defineComponent, onMounted, reactive, ref } from "vue"; 
import { VxeTableInstance } from "vxe-table";
const baseTable = defineComponent({
  name:"baseTable",
  setup(){
    const baseTableRef = ref({} as VxeTableInstance)
    const pageConf = reactive({
      pageSize:20,
      currentPage:1,
      total:0
    })
    onMounted(()=>{
      getTableData()
    })
    const getTableData=()=>{
      tableModel.base({pageSize:pageConf.pageSize,currentPage:pageConf.currentPage}).then(res=>{
        baseTableRef.value.loadData(res.list)
        pageConf.total=res.total
      })
    }
    const searchMethod =(e)=>{
      let {pageSize,currentPage,type} = e;
      if(type==="size") {
        pageConf.currentPage = 1
        getTableData()
      } else {
        getTableData()
      }
    }
    return () =>(
      <div>
      <div class="h-2/3">
      <vxe-table header-row-class-name="table-header" border="full" align="center" auto-resize height="auto" ref={baseTableRef}>
      <vxe-table-column type="seq" title="#"></vxe-table-column>
          <vxe-table-column field="name" title="姓名"></vxe-table-column>
          <vxe-table-column field="date" title="出生日期"></vxe-table-column>
          <vxe-table-column field="sex" title="性别"></vxe-table-column>
          <vxe-table-column field="positon" title="岗位"></vxe-table-column>
          <vxe-table-column field="ins" title="简介"></vxe-table-column>
          <vxe-table-column field="email" title="邮箱"></vxe-table-column>
          <vxe-table-column field="domain" title="域名" sortable filters={[{data: {vals: [], sVal: '', fMenu: '', f1Type:'', f1Val: '', fMode: 'and', f2Type: '', f2Val: ''}}]} filter-render={{name: 'FilterExcel'}}></vxe-table-column>
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
      </div>
    );
  }
})
export default baseTable
<template>
  <div class="operate_container">
    <SherlyTable
        :tableData="tableData.result"
        :loading="loading"
        style="width: 100%"
        showPagination
        @handleCurrentChange="handleCurrentChange"
        @handleSizeChange="handleSizeChange"
        :pagination-total="tableData.total"
        :pagination-current="tableData.current"
        :pagination-size="tableData.size"
    >
      <template #header>
        <el-popconfirm
            confirm-button-text="是"
            cancel-button-text="否"
            :icon="InfoFilled"
            icon-color="#626AEF"
            title="确认清空所有日志?"
            @confirm="handleEmpty"
        >
          <template #reference>
            <el-button type="danger" size="small"> 清空日志</el-button>
          </template>
        </el-popconfirm>
      </template>
      <template #table>
        <el-table-column prop="logId" label="日志id" width="100" align="center" />
        <el-table-column prop="type" label="日志类型" width="180" align="center" show-overflow-tooltip/>
        <el-table-column prop="description" label="描述" align="center" show-overflow-tooltip/>
        <el-table-column prop="requestMethod" label="请求方式" align="center"/>
        <el-table-column prop="uri" label="请求uri" align="center" show-overflow-tooltip width="180px"/>
        <el-table-column prop="ip" label="请求ip" align="center" show-overflow-tooltip/>
        <el-table-column prop="os" label="请求设备" align="center" show-overflow-tooltip width="180px"/>
        <el-table-column prop="address" label="请求地址" align="center" show-overflow-tooltip/>
        <el-table-column prop="browser" label="请求浏览器" align="center" show-overflow-tooltip/>
        <el-table-column prop="duration" label="耗时" align="center"/>
        <el-table-column prop="createTime" label="操作时间" align="center" width="180"/>
        <el-table-column prop="createTime" label="操作" align="center" width="100" fixed="right">
          <template #default="scope">
            <a class="link_style"  @click="handleLogId(scope.row.logId)">详情</a>
          </template>
        </el-table-column>
      </template>
    </SherlyTable>
    <!--查看日志详情-->
    <el-dialog
        v-model="dialogVisible"
        title="日志详情"
        width="30%"
        center
    >
      <el-row>
        <el-col>
          <label>日志id：</label>
          <input type="text" :value="formInfo.logId"/>
        </el-col>
<!--        <el-col>-->
<!--          <label>日志类型：</label>-->
<!--          <input type="text" :value="formInfo.type"/>-->
<!--        </el-col>-->
        <el-col>
          <label>描述：</label>
          <input type="text" :value="formInfo.description"/>
        </el-col>
        <el-col>
          <label>请求方式：</label>
          <input type="text" :value="formInfo.requestMethod"/>
        </el-col>
        <el-col>
          <label>请求uri：</label>
          <input type="text" :value="formInfo.uri" :title="formInfo.uri"/>
        </el-col>
        <el-col>
          <label>请求参数：</label>
          <input type="text" :value="formInfo.requestParams" :title="formInfo.requestParams"/>
        </el-col>
        <el-col>
          <label>请求ip：</label>
          <input type="text" :value="formInfo.ip"/>
        </el-col>
        <el-col>
          <label>请求地址：</label>
          <input type="text" :value="formInfo.address"/>
        </el-col>
        <el-col>
          <label>请求浏览器：</label>
          <input type="text" :value="formInfo.browser"/>
        </el-col>
        <el-col>
          <label>耗时：</label>
          <input type="text" :value="formInfo.duration"/>
        </el-col>
        <el-col>
          <label style="height: 100%">	异常详情：</label>
          <textarea type="text" :value="formInfo.exception"/>
        </el-col>
      </el-row>
    </el-dialog>
  </div>
</template>

<script>
import {reactive, ref, onMounted} from "vue";
import {getOperationList, delLog, getOperationOne} from '@/api/system/operate.js'
import SherlyTable from "@/components/SherlyTable";
import {ElMessage} from "element-plus";
import {InfoFilled} from '@element-plus/icons-vue'

export default {
  components: {SherlyTable},
  setup() {
    const loading = ref(false)
    const tableData = reactive({});
    const queryParams = reactive({
      current: 1,
      size: 10,
    })
    /* 查看日志详情数据 */
    const dialogVisible = ref(false)
    const formInfo = ref({})

    onMounted(() => {
      getList()
    });

    /* 获取操作日志分页数据 */
    const getList = async () => {
      const data = await getOperationList(queryParams)
      Object.keys(data).forEach((key) => {
        tableData[key] = data[key];
        setTimeout(() => {
          loading.value = false
        }, 100)
      });
    }

    /* 清空日志 */
    const handleEmpty = () => {
      formInfo.value = {}
      delLog().then(() => {
        ElMessage({
          message: "清除成功",
          type: "success",
        });
        queryParams.current = 1
        getList()
      })
    }

    /* 查看日志详情 */
    const handleLogId = async (logId) => {
      const data = await getOperationOne(logId)
      formInfo.value = data
      dialogVisible.value = true
    }

    /* 修改当前分页页码 */
    const handleCurrentChange = (e) => {
      tableData.current = e;
      queryParams.current = e;
      getList();
    };

    /* 修改当前每页数量 */
    const handleSizeChange = (e) => {
      tableData.size = e;
      queryParams.size = e;
      getList();
    };

    return {
      loading,
      tableData,
      handleCurrentChange,
      handleSizeChange,
      handleEmpty,
      InfoFilled,
      handleLogId,
      dialogVisible,
      formInfo
    }
  }
}
</script>

<style lang="scss" scoped>
.operate_container {
  padding: 16px;
}
label {
  display: inline-block;
  width: 100px;
  padding: 0 4px;
  text-align: right;
}
input {
  border: none;
  outline: none;
  padding: 0 4px;
}
textarea {
  width: 70%;
  height: 100px;
  vertical-align:top;
  outline: none;
}

:deep(.el-col)  {
  margin: 12px 0;
}
</style>

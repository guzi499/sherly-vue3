<template>
  <div class="sherly-page-wrapper">
    <!-- 搜索条件 -->
    <el-form ref="resetFormData" :model="queryParams" :inline="true" label-width="80px">
      <el-form-item label="用户id">
        <el-input style="width: 215px" v-model="queryParams.userId" clearable/>
      </el-form-item>
      <el-form-item label="耗时">
        <el-input style="width: 94px" v-model="queryParams.beginDuration" placeholder="请输入" clearable/>
        <span style="width: 28px; text-align: center; user-select: none">~</span>
        <el-input style="width: 94px" v-model="queryParams.endDuration" placeholder="请输入" clearable/>
      </el-form-item>
      <el-form-item label="请求方式">
        <el-select v-model="queryParams.requestMethod" placeholder="请选择请求方式" clearable style="width: 215px">
          <el-option v-for="item in requestType" :key="item.value" :label="item.label" :value="item.label"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="	日志类型">
        <el-select v-model="queryParams.type" placeholder="请选择日志类型" clearable style="width: 215px">
          <el-option label="正常" :value="0"></el-option>
          <el-option label="异常" :value="1"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="请求uri">
        <el-input style="width: 215px" v-model="queryParams.uri" clearable/>
      </el-form-item>
      <el-form-item label="操作时间">
        <el-date-picker
            clearable
            style="width: 355px"
            v-model="datetimerange"
            type="datetimerange"
            range-separator="至"
            format="YYYY-MM-DD HH:mm:ss"
            value-format="YYYY-MM-DD HH:mm:ss"
            start-placeholder="开始日期"
            end-placeholder="结束日期">
        </el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="handleSearch" icon="Search">搜索</el-button>
        <el-button icon="Refresh" @click="handleReset">重置</el-button>
      </el-form-item>
    </el-form>
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
            <el-button type="danger" size="small" v-permission="['operation_log:remove_all']"> 清空日志</el-button>
          </template>
        </el-popconfirm>
      </template>
      <template #table>
        <el-table-column prop="logId" label="日志id" width="100" align="center"/>
        <el-table-column prop="type" label="日志类型" width="80" align="center" show-overflow-tooltip>
          <template #default="scope">
            <el-tag>{{ scope.row.type === 1 ? '异常' : '正常' }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="description" label="描述" align="center" show-overflow-tooltip/>
        <el-table-column prop="requestMethod" label="请求方式" align="center"/>
        <el-table-column prop="uri" label="请求uri" align="center" show-overflow-tooltip width="180px"/>
        <el-table-column prop="ip" label="请求ip" align="center" show-overflow-tooltip/>
        <el-table-column prop="os" label="请求设备" align="center" show-overflow-tooltip width="180px"/>
        <el-table-column prop="address" label="请求地址" align="center" show-overflow-tooltip/>
        <el-table-column prop="browser" label="请求浏览器" align="center" show-overflow-tooltip width="120px"/>
        <el-table-column prop="duration" label="耗时" align="center">
          <template #default="scope">
            <span>{{scope.row.duration + 'ms'}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="createTime" label="操作时间" align="center" width="180"/>
        <el-table-column prop="createTime" label="操作" align="center" width="100" fixed="right">
          <template #default="scope">
            <el-link type="primary" @click="handleLogId(scope.row.logId)" v-permission="['operation_log:get_one']">详情</el-link>
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
      <el-descriptions class="margin-top" :column="1">
        <el-descriptions-item label="日志id:">{{ formInfo.logId }}</el-descriptions-item>
        <el-descriptions-item label="日志类型:">
          <el-tag size="small">{{ formInfo.type === 1 ? '异常' : '正常' }}</el-tag>
        </el-descriptions-item>
        <el-descriptions-item label="描述:">{{ formInfo.description }}</el-descriptions-item>
        <el-descriptions-item label="请求方式:">{{ formInfo.requestMethod }}</el-descriptions-item>
        <el-descriptions-item label="请求uri:">{{ formInfo.uri }}</el-descriptions-item>
        <el-descriptions-item label="请求参数:">{{ formInfo.requestParams }}</el-descriptions-item>
        <el-descriptions-item label="请求ip:">{{ formInfo.ip }}</el-descriptions-item>
        <el-descriptions-item label="请求地址:">{{ formInfo.address }}</el-descriptions-item>
        <el-descriptions-item label="请求浏览器:">{{ formInfo.browser }}</el-descriptions-item>
        <el-descriptions-item label="耗时:">{{ formInfo.duration + 'ms' }}</el-descriptions-item>
        <el-descriptions-item label="异常详情:">{{ formInfo.exception }}</el-descriptions-item>
      </el-descriptions>
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
    const datetimerange = ref([])
    const queryParams = reactive({
      current: 1,
      size: 10,
    })
    /* 请求方式枚举 */
    const requestType = reactive([
      {
        value: 0,
        label: 'GET'
      }, {
        value: 1,
        label: 'POST'
      }, {
        value: 2,
        label: 'PUT'
      }, {
        value: 3,
        label: 'DELETE'
      }
    ])
    /* 查看日志详情数据 */
    const dialogVisible = ref(false)
    const formInfo = ref({})

    onMounted(() => {
      getList()
    });

    // 搜索
    const handleSearch = () => {
      if (datetimerange.value.length > 0) {
        queryParams.beginTime = datetimerange.value[0]
        queryParams.endTime = datetimerange.value[1]
      }
      getList()
    }

    // 重置
    const handleReset = () => {
      datetimerange.value = []
      for (let key in queryParams) {
        delete queryParams[key]
      }
      queryParams.current = 1
      queryParams.size = 10
      getList()
    }

    /* 获取操作日志分页数据 */
    const getList = async () => {
      loading.value = true;
      const data = await getOperationList(queryParams)
      Object.keys(data).forEach((key) => {
        tableData[key] = data[key];
      });
      setTimeout(() => {
        loading.value = false
      }, 100)
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
      formInfo,
      queryParams,
      handleSearch,
      handleReset,
      datetimerange,
      requestType
    }
  }
}
</script>

<style lang="scss" scoped>
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

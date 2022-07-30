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
      <template #table>
        <el-table-column prop="logId" label="日志id" width="100" align="center"/>
        <el-table-column prop="type" label="日志类型" width="80" align="center" show-overflow-tooltip>
          <template #default="scope">
            <span>{{ scope.row.type === 1 ? '异常' : '正常' }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="description" label="描述" align="center" show-overflow-tooltip/>
        <el-table-column prop="os" label="请求设备" align="center" show-overflow-tooltip/>
        <el-table-column prop="address" label="请求地址" align="center" show-overflow-tooltip/>
        <el-table-column prop="browser" label="请求浏览器" align="center" show-overflow-tooltip/>
        <el-table-column prop="duration" label="耗时" align="center"/>
        <el-table-column prop="createTime" label="操作时间" align="center" width="180"/>
      </template>
    </SherlyTable>
  </div>
</template>

<script>
import {reactive, ref, onMounted} from "vue";
import {useRoute} from "vue-router";
import {getOperationList} from '@/api/system/operate.js'
import SherlyTable from "@/components/SherlyTable";
import {InfoFilled} from '@element-plus/icons-vue'

export default {
  components: {SherlyTable},
  setup() {
    const loading = ref(false)
    const tableData = reactive({});
    const route = useRoute()
    const queryParams = reactive({
      current: 1,
      size: 10,
      userId: parseInt(route.query.userId)
    })

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
      InfoFilled,
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
  vertical-align: top;
  outline: none;
}

:deep(.el-col) {
  margin: 12px 0;
}
</style>

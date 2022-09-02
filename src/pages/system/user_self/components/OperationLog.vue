<template>
  <div class="sherly-page-wrapper">
    <SherlyTable
        :tableData="tableData.result"
        :loading="loading"
        style="width: 100%"
        showPagination
        @handleCurrentChange="handleCurrentChange"
        @handleSizeChange="handleSizeChange"
        :pagination-total="tableData.total"
        :pagination-current="queryForm.current"
        :pagination-size="queryForm.size"
    >
      <template #table>
        <el-table-column prop="logId" label="日志id" width="100" align="center"/>
        <el-table-column prop="type" label="日志类型" width="80" align="center" show-overflow-tooltip>
          <template #default="scope">
            <el-tag v-for="item in logType" :key="item.value" v-show="scope.row.type === item.value" :type="item.color">
              {{ scope.row.type === item.value ? item.label : '' }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="description" label="描述" align="center" show-overflow-tooltip/>
        <el-table-column prop="os" label="请求设备" align="center" show-overflow-tooltip/>
        <el-table-column prop="address" label="请求地址" align="center" show-overflow-tooltip/>
        <el-table-column prop="browser" label="请求浏览器" align="center" show-overflow-tooltip/>
        <el-table-column prop="duration" label="耗时" align="center">
          <template #default="scope">
            <span>{{ scope.row.duration + 'ms' }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="createTime" label="操作时间" align="center" width="180"/>
      </template>
    </SherlyTable>
  </div>
</template>

<script>
import {reactive, ref, onMounted} from "vue";
import {useRoute} from "vue-router";
import {userSelfOperationLogListPage} from '@/api/system/user_self.js'
import {InfoFilled} from '@element-plus/icons-vue'

export default {
  setup() {
    onMounted(() => {
      getList()
    });
    const route = useRoute()
    const loading = ref(false)
    // 表格数据
    const tableData = reactive({});
    // 查询条件
    const queryForm = reactive({
      current: 1,
      size: 10,
      userId: parseInt(route.query.userId)
    })
    // 日志类型枚举
    const logType = reactive([
      {
        value: 0,
        label: '正常',
        color: 'primary'
      }, {
        value: 1,
        label: '异常',
        color: 'danger'
      }
    ])

    // 获取操作日志分页数据
    const getList = async () => {
      const data = await userSelfOperationLogListPage(queryForm)
      Object.keys(data).forEach((key) => {
        tableData[key] = data[key];
        setTimeout(() => {
          loading.value = false
        }, 100)
      });
    }

    // 修改当前分页页码
    const handleCurrentChange = (e) => {
      queryForm.current = e;
      getList();
    };

    // 修改当前每页数量
    const handleSizeChange = (e) => {
      queryForm.size = e;
      getList();
    };

    return {
      loading,
      tableData,
      logType,
      InfoFilled,
      queryForm,
      handleCurrentChange,
      handleSizeChange,
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
  vertical-align: top;
  outline: none;
}

:deep(.el-col) {
  margin: 12px 0;
}
</style>

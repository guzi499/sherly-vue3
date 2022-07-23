<template>
  <div class="login_container">
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
        <el-table-column prop="logId" label="日志id" width="100" align="center"></el-table-column>
        <el-table-column prop="username" label="登录账号" width="180" align="center" show-overflow-tooltip/>
        <el-table-column prop="type" label="登录方式" align="center" show-overflow-tooltip/>
        <el-table-column prop="browser" label="浏览器" align="center"/>
        <el-table-column prop="os" label="登陆设备" align="center" show-overflow-tooltip width="180px"/>
        <el-table-column prop="ip" label="登录ip" align="center" show-overflow-tooltip/>
        <el-table-column prop="address" label="登录地址" align="center" show-overflow-tooltip/>
        <el-table-column prop="result" label="登录结果" align="center" show-overflow-tooltip/>
        <el-table-column prop="createTime" label="登录时间" align="center" width="180"/>
      </template>
    </SherlyTable>
  </div>
</template>

<script>
import {reactive, ref, onMounted} from "vue";
import {deleteLoginLogRemoveAll, getLoginLogList} from '@/api/system/login_log.js'
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

    onMounted(() => {
      getList()
    });

    /* 获取登录日志分页数据 */
    const getList = async () => {
      const data = await getLoginLogList(queryParams)
      Object.keys(data).forEach((key) => {
        tableData[key] = data[key];
        setTimeout(() => {
          loading.value = false
        }, 100)
      });
    }

    /* 清空日志 */
    const handleEmpty = () => {
      deleteLoginLogRemoveAll().then(() => {
        ElMessage({
          message: "清除成功",
          type: "success",
        });
        queryParams.current = 1
        getList()
      })
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
      InfoFilled
    }
  }
}
</script>

<style lang="scss" scoped>
.login_container {
  padding: 16px;
}
input {
  border: none;
  border-bottom: 1px solid #000;
  outline: none; // 聚焦时去掉边框
  padding: 0 4px;
}

::v-deep .el-col {
  margin: 10px 0;
}

label {
  display: inline-block;
  width: 100px;
  padding: 0 4px;
  text-align: right;
}
</style>

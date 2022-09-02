<template>
  <div class="sherly-page-wrapper">
    <!-- 搜索条件 -->
    <el-form ref="resetFormData" :model="queryForm" :inline="true" label-width="80px">
      <el-form-item label="登录账号">
        <el-input style="width: 215px" v-model="queryForm.username" clearable/>
      </el-form-item>
      <el-form-item label="	登录方式">
        <el-select v-model="queryForm.type" placeholder="请选择登录方式" clearable style="width: 215px">
          <el-option v-for="item in loginType" :key="item.value" :label="item.label" :value="item.value"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="登录结果">
        <el-select v-model="queryForm.result" placeholder="请选择登录结果" clearable style="width: 215px">
          <el-option v-for="item in loginResults" :key="item.value" :label="item.label" :value="item.value"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="登录时间">
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
        :pagination-current="queryForm.current"
        :pagination-size="queryForm.size"
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
            <el-button type="danger" size="small" v-permission="['login_log:remove_all']"> 清空日志</el-button>
          </template>
        </el-popconfirm>

      </template>
      <template #table>
        <el-table-column prop="logId" label="日志id" width="100" align="center"></el-table-column>
        <!--成功 0 账号或密码不正确 1 用户禁用 2 其它 9-->
        <el-table-column prop="result" label="登录结果" align="center" show-overflow-tooltip>
          <template #default="scope">
            <el-tag :type="item.color" v-for="item in loginResults"
                    :key="item.value" v-show="scope.row.result === item.value">
              {{ scope.row.result === item.value ? item.label : '' }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="username" label="登录账号" width="180" align="center" show-overflow-tooltip/>
        <!--密码 0 二维码 1 QQ 2 微信 3 支付宝 4-->
        <el-table-column prop="type" label="登录方式" align="center" show-overflow-tooltip>
          <template #default="scope">
            <span v-for="item in loginType" :key="item.value" :hidden="scope.row.type !== item.value">
              {{ scope.row.type === item.value ? item.label : null }}
            </span>
          </template>
        </el-table-column>
        <el-table-column prop="browser" label="浏览器" align="center"/>
        <el-table-column prop="os" label="登陆设备" align="center" show-overflow-tooltip width="180px"/>
        <el-table-column prop="ip" label="登录ip" align="center" show-overflow-tooltip/>
        <el-table-column prop="address" label="登录地址" align="center" show-overflow-tooltip/>
        <el-table-column prop="createTime" label="登录时间" align="center" width="180"/>
      </template>
    </SherlyTable>
  </div>
</template>

<script>
import {reactive, ref, onMounted} from "vue";
import {loginLogRemoveAll, loginLogListPage} from '@/api/system/login_log.js'
import {ElMessage} from "element-plus";
import {InfoFilled} from '@element-plus/icons-vue'

export default {
  setup() {
    onMounted(() => {
      getList()
    });
    const loading = ref(false)
    const tableData = reactive({});
    const queryForm = reactive({
      current: 1,
      size: 10,
    })
    const datetimerange = ref([])

    // 登陆结果枚举
    const loginResults = reactive([
      {
        value: 0,
        label: '成功',
        color: 'primary'
      }, {
        value: 1,
        label: '账号或密码不正确',
        color: 'danger'
      }, {
        value: 2,
        label: '用户禁用',
        color: 'warning'
      }, {
        value: 9,
        label: '其他',
        color: 'info'
      }
    ])

    // 登陆方式枚举
    const loginType = reactive([
      {
        value: 0,
        label: '账号密码登录'
      }, {
        value: 1,
        label: '二维码登录'
      }, {
        value: 2,
        label: 'QQ登录'
      }, {
        value: 3,
        label: '微信登录'
      }, {
        value: 4,
        label: '支付宝登录'
      }
    ])

    // 搜索
    const handleSearch = () => {
      if (datetimerange.value.length > 0) {
        queryForm.beginTime = datetimerange.value[0]
        queryForm.endTime = datetimerange.value[1]
      }
      getList()
    }

    // 重置
    const handleReset = () => {
      datetimerange.value = []
      for (let key in queryForm) {
        delete queryForm[key]
      }
      queryForm.current = 1
      queryForm.size = 10
      getList()
    }

    // 获取登录日志分页数据
    const getList = async () => {
      loading.value = true;
      const data = await loginLogListPage(queryForm)
      Object.keys(data).forEach((key) => {
        tableData[key] = data[key];
      });
      setTimeout(() => {
        loading.value = false
      }, 100)
    }

    // 清空日志
    const handleEmpty = () => {
      loginLogRemoveAll().then(() => {
        ElMessage({
          message: "清除成功",
          type: "success",
        });
        queryForm.current = 1
        getList()
      })
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
      InfoFilled,
      loginResults,
      loginType,
      queryForm,
      datetimerange,
      handleCurrentChange,
      handleSizeChange,
      handleEmpty,
      handleSearch,
      handleReset
    }
  }
}
</script>

<style lang="scss" scoped>
input {
  border: none;
  border-bottom: 1px solid #000;
  outline: none; // 聚焦时去掉边框
  padding: 0 4px;
}

:deep(.el-col) {
  margin: 10px 0;
}

label {
  display: inline-block;
  width: 100px;
  padding: 0 4px;
  text-align: right;
}
</style>

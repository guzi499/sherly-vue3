<!--
 * @author: 李浩宇
 * @date: 2022-05-22
-->

<template>
  <div class="sherly-page-wrapper">
    <el-form
      ref="resetFormData"
      :model="queryForm"
      :inline="true"
      label-width="80px"
    >
      <el-form-item label="手机号" prop="phone">
        <el-input style="width: 215px" v-model="queryForm.phone" placeholder="请输入手机号" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="handleSearch" icon="Search"
          >搜索</el-button
        >
        <el-button icon="Refresh" @click="handleReset">重置</el-button>
      </el-form-item>
    </el-form>
    <SherlyTable
      :loading="loading"
      :tableData="tableData.result"
      style="width: 100%"
      showPagination
      @handleCurrentChange="handleCurrentChange"
      @handleSizeChange="handleSizeChange"
      :pagination-total="tableData.total"
      :pagination-current="queryForm.current"
      :pagination-size="queryForm.size"
    >
      <template #table>
        <el-table-column
            prop="sessionId"
            label="会话id"
            width="300"
            align="center"
        />
        <el-table-column
          prop="phone"
          label="手机号"
          width="180"
          align="center"
        />
        <el-table-column
          prop="realName"
          label="姓名"
          width="180"
          align="center"
        />
        <el-table-column
          prop="address"
          label="登录地点"
          width="120"
          show-overflow-tooltip="true"
          align="center"
        />
        <el-table-column
          prop="browser"
          label="浏览器"
          width="120"
          align="center"
        />
        <el-table-column
          prop="os"
          show-overflow-tooltip="true"
          label="设备"
          width="220"
          align="center"
        />
        <el-table-column prop="ip" label="登录IP" width="220" align="center" />
        <el-table-column
          prop="loginTime"
          label="登录时间"
          width="220"
          align="center"
        />
        <el-table-column
          fixed="right"
          label="操作"
          min-width="150"
          align="center"
        >
          <template #default="scope">
            <el-popconfirm
              title="确定强退本条数据?"
              @confirm="handleDelete(scope.row)"
            >
              <template #reference>
                <el-link type="danger">强退</el-link>
              </template>
            </el-popconfirm>
          </template>
        </el-table-column></template
      >
    </SherlyTable>
  </div>
</template>
<script>
import { reactive, ref, onMounted } from "vue";
import { userOnlineListAll, userOnlineForceQuit } from "@/api/system/user_online";
import { ElMessage } from "element-plus";

export default {
  setup() {
    const loading = ref(false);
    let queryForm = reactive({
      phone: "",
      current: 1,
      size: 10,
    });

    onMounted(() => {
      getList();
    });

    const resetFormData = ref(null);
    const tableData = reactive({});

    // 获取列表
    const getList = async () => {
      loading.value = true;
      const result = await userOnlineListAll(queryForm.phone ? queryForm : "");
      const data = {
        result: formatPagination(result),
        size: queryForm.size,
        total: result.length,
        current: queryForm.current,
      };
      Object.keys(data).forEach((i) => {
        tableData[i] = data[i];
      });
      setTimeout(() => {
        loading.value = false;
      }, 100);
    };

    const formatPagination = (result) => {
      const newArr = [];
      const { size, current } = queryForm;
      if (result instanceof Array && result.length > 0) {
        for (let i = 0; i < result.length; ) {
          newArr.push(result.slice(i, (i += size)));
        }
      }
      return newArr[current - 1];
    };

    // 搜索
    const handleSearch = () => {
      getList();
    };

    // 重置
    const handleReset = () => {
      resetFormData.value.resetFields();
      getList();
    };

    // 添加租户
    const handleAddTenant = () => {};

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

    // 删除角色
    const handleDelete = ({ sessionId }) => {
      userOnlineForceQuit(sessionId).then(() => {
        ElMessage({
          message: "强退用户成功",
          type: "success",
        });
        getList();
      });
    };

    return {
      queryForm,
      tableData,
      resetFormData,
      loading,
      handleSearch,
      handleReset,
      handleAddTenant,
      handleCurrentChange,
      handleSizeChange,
      handleDelete
    };
  },
};
</script>

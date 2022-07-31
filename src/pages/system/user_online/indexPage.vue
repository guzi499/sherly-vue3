<!--
 * @Author: lihaoyu
 * @Date: 2022-05-22 20:52:14
 * @LastEditTime: 2022-07-30 14:15:33
 * @LastEditors: lihaoyu
 * @Description:
 * @FilePath: /sherly-vue3/src/pages/system/user_online/indexPage.vue
-->
<template>
  <div class="sherly-page-wrapper">
    <el-form ref="resetFormData" :model="form" class="sherly-form">
      <el-form-item label="手机号" prop="phone">
        <el-input v-model="form.phone" />
      </el-form-item>
      <div class="sherly-operate-box">
        <el-button type="primary" @click="handleSearch">搜索</el-button>
        <el-button @click="handleReset">重置</el-button>
      </div>
    </el-form>
    <SherlyTable
      :loading="loading"
      :tableData="tableData.result"
      style="width: 100%"
      showPagination
      @handleCurrentChange="handleCurrentChange"
      @handleSizeChange="handleSizeChange"
      :pagination-total="tableData.total"
      :pagination-current="tableData.current"
      :pagination-size="tableData.size"
    >
      <template #table>
        <el-table-column prop="phone" label="手机号" width="180" />
        <el-table-column prop="realName" label="姓名" width="180" />
        <el-table-column
          prop="address"
          label="登录地点"
          width="120"
          show-overflow-tooltip="true"
        />
        <el-table-column prop="browser" label="浏览器" width="120" />
        <el-table-column
          prop="os"
          show-overflow-tooltip="true"
          label="设备"
          width="220"
        />
        <el-table-column prop="ip" label="登录IP" width="220" />
        <el-table-column prop="loginTime" label="登录时间" width="220" />
        <el-table-column fixed="right" label="操作" min-width="150">
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
import { getOnline, delOnline } from "@/api/system/online";
import SherlyTable from "@/components/SherlyTable.vue";
import { ElMessage } from "element-plus";

export default {
  components: { SherlyTable },
  setup() {
    const loading = ref(false);
    let form = reactive({
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
      const result = await getOnline(form.phone ? form : "");
      const data = {
        result: formatPagination(result),
        size: form.size,
        total: result.length,
        current: form.current,
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
      const { size, current } = form;
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
    const handleaddTenant = () => {};

    // 修改当前分页页码
    const handleCurrentChange = (e) => {
      tableData.current = e;
      form.current = e;
      getList(form);
    };

    // 修改当前每页数量
    const handleSizeChange = (e) => {
      tableData.size = e;
      form.size = e;
      getList(form);
    };

    // 删除角色
    const handleDelete = ({ phone }) => {
      delOnline(phone).then(() => {
        ElMessage({
          message: "删除用户成功",
          type: "success",
        });
        getList();
      });
    };

    return {
      form,
      tableData,
      resetFormData,
      handleSearch,
      handleReset,
      handleaddTenant,
      handleCurrentChange,
      handleSizeChange,
      handleDelete,
      loading,
    };
  },
};
</script>

<!--
 * @Author: lihaoyu
 * @Date: 2022-04-09 11:49:55
 * @LastEditTime: 2022-04-21 11:33:02
 * @LastEditors: lihaoyu
 * @Description: 
 * @FilePath: /sherly-vue3/src/pages/system/rolePage.vue
-->
<template>
  <div class="sherly-page-wrapper">
    <el-form ref="resetFormData" :model="form" class="sherly-form">
      <el-form-item label="用户名称" prop="roleName">
        <el-input v-model="form.roleName" />
      </el-form-item>
      <div class="sherly-operate-box">
        <el-button type="primary" @click="handleSearch">搜索</el-button>
        <el-button @click="handleReset">重置</el-button>
      </div>
    </el-form>

    <!-- <div class="sherly-table-box">
      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="roleName" label="角色名称" width="180" />
        <el-table-column prop="description" label="描述" />
        <el-table-column prop="createTime" label="创建时间" />
        <el-table-column fixed="right" label="操作" width="180">
          <template #default="scope">
            <el-button type="text" size="small" @click="handleEdit(scope)"
              >修改</el-button
            >
            <el-popconfirm
              title="确定删除本条数据?"
              @confirm="handleDelete(scope)"
            >
              <template #reference>
                <el-button type="text" size="small">删除</el-button>
              </template>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
      <div class="sherly-pagination-box">
        <el-pagination
          background
          layout="prev,pager,next,jumper"
          :total="1000"
        />
      </div>
    </div> -->
    <SherlyTable
      :tableData="tableData"
      style="width: 100%"
      showPagination
      @handleCurrentChange="handleCurrentChange"
      :loading="loading"
    >
      <template #header>
        <el-button type="primary" @click="addRole" size="small">新增</el-button>
      </template>
      <template #table>
        <el-table-column prop="roleName" label="角色名称" width="180" />
        <el-table-column prop="description" label="描述" />
        <el-table-column prop="createTime" label="创建时间" />
        <el-table-column fixed="right" label="操作" width="180">
          <template #default="scope">
            <el-button type="text" @click="handleEdit(scope)">修改</el-button>
            <el-popconfirm
              title="确定删除本条数据?"
              @confirm="handleDelete(scope)"
            >
              <template #reference>
                <el-button type="text">删除</el-button>
              </template>
            </el-popconfirm>
          </template>
        </el-table-column></template
      >
    </SherlyTable>
  </div>
</template>
<script>
import { ref, reactive, onMounted } from "vue";
import { getRoleLists } from "@/api/system/role";
import SherlyTable from "@/components/SherlyTable.vue";
export default {
  components: { SherlyTable },
  setup() {
    const resetFormData = ref(null);
    let tableData = reactive({
      result: [],
      size: 10,
      total: 0,
      current: 1,
    });
    let loading = ref(false);
    let form = reactive({
      roleName: "",
      current: 1,
      size: 10,
    });
    onMounted(() => {
      handleGetRoleLists();
    });
    const handleGetRoleLists = async () => {
      const data = await getRoleLists(form);
      Object.keys(tableData).forEach((key) => {
        tableData[key] = data[key] || tableData[key];
      });
    };
    const handleCurrentChange = (e) => {
      console.log(e);
      form.current = e;
      getRoleLists(form);
    };
    const handleSearch = () => {
      console.log(form);
    };
    const handleReset = () => {
      resetFormData.value.resetFields();
    };
    const addRole = () => {};
    const handleEdit = (row) => {
      console.log(row);
    };
    const handleDelete = (row) => {
      console.log(row);
    };

    return {
      form,
      resetFormData,
      tableData,
      loading,
      handleSearch,
      handleReset,
      handleEdit,
      handleDelete,
      addRole,
      handleCurrentChange,
      handleGetRoleLists,
    };
  },
};
</script>
<style lang="scss" scoped></style>

<!--
 * @Author: lihaoyu
 * @Date: 2022-05-22 20:52:14
 * @LastEditTime: 2022-07-08 23:31:53
 * @LastEditors: lihaoyu
 * @Description:
 * @FilePath: /sherly-vue3/src/pages/system/tenantPage.vue
-->
<template>
  <div class="sherly-page-wrapper">
    <el-form ref="resetFormData" :model="form" class="sherly-form">
      <el-form-item label="租户代码" prop="tenantCode">
        <el-input v-model="form.tenantCode" />
      </el-form-item>
      <el-form-item label="租户名称" prop="tenantName">
        <el-input v-model="form.tenantName" />
      </el-form-item>
      <div class="sherly-operate-box">
        <el-button icon="Search" type="primary" @click="handleSearch"
          >搜索</el-button
        >
        <el-button icon="Refresh" @click="handleReset">重置</el-button>
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
      <template #header>
        <el-button type="success" plain @click="handleaddTenant" size="small"
          >新增
        </el-button>
      </template>
      <template #table>
        <el-table-column
          prop="tenantCode"
          label="租户代码"
          width="120"
          align="center" />
        <el-table-column
          prop="tenantName"
          label="租户名称"
          width="120"
          align="center" />
        <el-table-column
          prop="contactUser"
          label="联系人"
          width="180"
          align="center" />
        <el-table-column
          prop="contactPhone"
          label="联系电话"
          width="180"
          align="center" />
        <el-table-column
          prop="expireTime"
          label="过期时间"
          width="220"
          align="center" />
        <el-table-column
          prop="userLimit"
          label="用户上限"
          width="220"
          align="center" />
        <el-table-column
          fixed="right"
          label="操作"
          min-width="150"
          align="center"
        >
          <template #default="scope">
            <a href="javascript:;" title="修改">
              <Edit
                style="width: 1em; height: 1em; margin-right: 8px"
                @click="handleEdit(scope.row)"
              />
            </a>
            <el-popconfirm
              title="确定删除本条数据?"
              @confirm="handleDelete(scope.row)"
            >
              <template #reference>
                <a href="javascript:;" title="删除">
                  <Delete style="width: 1em; height: 1em; margin-right: 8px" />
                </a>
              </template>
            </el-popconfirm>
          </template> </el-table-column
      ></template>
    </SherlyTable>
    <el-dialog
      v-model="dialogVisible"
      :title="isEdit ? '租户修改' : '租户新增'"
      width="480px"
      :before-close="handleCancel"
    >
      <el-form
        v-if="dialogVisible"
        ref="tenantFormRef"
        :model="tenantForm"
        :rules="rules"
        label-width="80px"
      >
        <el-form-item label="租户代码" prop="tenantCode" required>
          <el-input v-model="tenantForm.tenantCode" />
        </el-form-item>
        <el-form-item label="租户名称" prop="tenantName" required>
          <el-input v-model="tenantForm.tenantName" />
        </el-form-item>
        <template v-if="isEdit">
          <el-form-item label="联系人" prop="contactUser">
            <el-input v-model="tenantForm.contactUser" />
          </el-form-item>
          <el-form-item label="联系电话" prop="contactPhone">
            <el-input v-model="tenantForm.contactPhone" />
          </el-form-item>
          <el-form-item label="过期时间" prop="expireTime">
            <el-date-picker
              style="width: 360px"
              v-model="tenantForm.expireTime"
              type="date"
            />
          </el-form-item>
          <el-form-item label="用户上限" prop="userLimit">
            <el-input-number
              v-model="tenantForm.userLimit"
              :min="1"
              :max="9999"
              controls-position="right"
              style="height: 32px"
            />
          </el-form-item>
        </template>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="handleCancel">取消</el-button>
          <el-button type="primary" @click="handleConfirm">确定</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>
<script>
import { reactive, ref, onMounted } from "vue";
import {
  getTenant,
  delTenant,
  updateTenant,
  addTenant,
} from "@/api/system/tenant";
import SherlyTable from "@/components/SherlyTable.vue";
import { ElMessage } from "element-plus";

export default {
  components: { SherlyTable },
  setup() {
    const loading = ref(false)
    let form = reactive({
      tenantName: "",
      tenantCode: "",
      current: 1,
      size: 10,
    });

    onMounted(() => {
      getList();
    });

    const resetFormData = ref(null);
    const tenantFormRef = ref(null);
    const tableData = reactive({});
    let isEdit = ref(false);
    let dialogVisible = ref(false);
    // 初始化租户详情数据
    const inittenantForm = () => {
      return {
        contactPhone: "",
        contactUser: "",
        expireTime: "",
        tenantCode: "",
        tenantName: "",
        userLimit: "",
      };
    };

    // 角色详情数据响应式
    let tenantForm = reactive(inittenantForm());

    // 重置角色详情数据
    const resettenantForm = () => {
      Object.assign(tenantForm, inittenantForm());
    };

    // 获取列表
    const getList = async () => {
      loading.value = true
      const data = await getTenant(form);
      Object.keys(data).forEach((i) => {
        tableData[i] = data[i];
      });
      setTimeout(() => {
        loading.value = false
      }, 100)
    };

    // 搜索
    const handleSearch = () => {
      getList();
    };

    // 重置
    const handleReset = () => {
      resetFormData.value.resetFields();
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

    // 编辑租户
    const handleEdit = (row) => {
      Object.keys(row).forEach((i) => {
        tenantForm[i] = row[i];
      });
      isEdit.value = true;
      dialogVisible.value = true;
    };

    // 删除角色
    const handleDelete = ({ tenantId }) => {
      delTenant(tenantId).then(() => {
        ElMessage({
          message: "删除角色成功",
          type: "success",
        });
        getList();
      });
    };

    // 取消
    const handleCancel = () => {
      resettenantForm();
      dialogVisible.value = false;
    };

    // 确定
    const handleConfirm = () => {
      tenantFormRef.value.validate((valid) => {
        if (valid) {
          if (tenantForm.tenantId) {
            updateTenant(tenantForm).then(() => {
              dialogVisible.value = false;
              ElMessage({
                message: "修改角色成功",
                type: "success",
              });
              getList();
            });
          } else {
            addTenant(tenantForm).then(() => {
              dialogVisible.value = false;
              ElMessage({
                message: "添加角色成功",
                type: "success",
              });
              getList();
            });
          }
          handleCancel();
        }
      });
    };

    return {
      form,
      tableData,
      resetFormData,
      tenantFormRef,
      tenantForm,
      isEdit,
      dialogVisible,
      handleSearch,
      handleReset,
      handleaddTenant,
      handleCurrentChange,
      handleSizeChange,
      handleEdit,
      handleDelete,
      handleCancel,
      handleConfirm,
      loading
    };
  },
};
</script>
<style lang="scss" scoped>
a {
  color: #000;

  &:hover {
    color: rgb(9, 130, 217);
  }
}
</style>

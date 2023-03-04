<script setup lang="ts">
import { ref } from "vue";
import { useTenantList } from "./hook";
import { PureTableBar } from "@/components/RePureTableBar";
import { useRenderIcon } from "@/components/ReIcon/src/hooks";

import Delete from "@iconify-icons/ep/delete";
import EditPen from "@iconify-icons/ep/edit-pen";
import Search from "@iconify-icons/ep/search";
import Refresh from "@iconify-icons/ep/refresh";
import AddFill from "@iconify-icons/ri/add-circle-line";

defineOptions({
  name: "User"
});

const formRef = ref();
const ruleFormRef = ref();
const {
  form,
  loading,
  columns,
  dataList,
  pagination,
  // buttonClass,
  onSearch,
  resetForm,
  handleUpdate,
  handleDelete,
  handleSizeChange,
  handleCurrentChange,
  handleClose,
  dialogVisible,
  title,
  ruleForm,
  rules,
  handleOk,
  handleCancel,
  type,
  roleList,
  handleSelect,
  datetimerangeCreateTime,
  datetimerangeExpireTime
} = useTenantList();
</script>

<template>
  <div class="main">
    <!--    搜索框-->
    <el-form
      ref="formRef"
      :inline="true"
      :model="form"
      class="bg-bg_color w-[99/100] pl-8 pt-4"
    >
      <el-form-item label="租户代码：" prop="tenantCode">
        <el-input
          v-model="form.tenantCode"
          placeholder="请输入租户代码"
          clearable
          class="!w-[200px]"
        />
      </el-form-item>
      <el-form-item label="租户名称：" prop="tenantName">
        <el-input
          v-model="form.tenantName"
          placeholder="请输入租户名称"
          clearable
          class="!w-[200px]"
        />
      </el-form-item>
      <el-form-item label="联系人：" prop="contactUser">
        <el-input
          v-model="form.contactUser"
          placeholder="请输入联系人"
          clearable
          class="!w-[200px]"
        />
      </el-form-item>
      <el-form-item label="联系电话：" prop="contactPhone">
        <el-input
          v-model="form.contactPhone"
          placeholder="请输入联系电话"
          clearable
          class="!w-[200px]"
        />
      </el-form-item>
      <el-form-item label="创建时间：" prop="createTime">
        <el-date-picker
          v-model="datetimerangeCreateTime"
          type="datetimerange"
          :shortcuts="shortcuts"
          range-separator="至"
          start-placeholder="开始时间"
          end-placeholder="结束时间"
          value-format="YYYY-MM-DD hh:mm:ss"
        />
      </el-form-item>
      <el-form-item label="过期时间：" prop="expireTime">
        <el-date-picker
          v-model="datetimerangeExpireTime"
          type="datetimerange"
          :shortcuts="shortcuts"
          range-separator="至"
          start-placeholder="开始时间"
          end-placeholder="结束时间"
          value-format="YYYY-MM-DD hh:mm:ss"
        />
      </el-form-item>
      <el-form-item label="用户上限：">
        <div class="input-box">
          <el-input
            v-model="form.beginUserLimit"
            placeholder="0"
            maxlength="4"
            minlength="1"
            class="!w-[80px]"
          />
          ~
          <el-input
            v-model="form.endUserLimit"
            placeholder="9999"
            maxlength="4"
            minlength="1"
            class="!w-[80px]"
          />
        </div>
      </el-form-item>
      <el-form-item>
        <el-button
          type="primary"
          :icon="useRenderIcon(Search)"
          :loading="loading"
          @click="onSearch"
        >
          搜索
        </el-button>
        <el-button :icon="useRenderIcon(Refresh)" @click="resetForm(formRef)">
          重置
        </el-button>
      </el-form-item>
    </el-form>
    <!--表格-->
    <PureTableBar title="租户列表" @refresh="onSearch">
      <template #buttons>
        <el-button
          type="primary"
          :icon="useRenderIcon(AddFill)"
          @click="handleUpdate('add', '')"
        >
          新增租户
        </el-button>
      </template>
      <template v-slot="{ size, checkList }">
        <pure-table
          border
          align-whole="center"
          showOverflowTooltip
          table-layout="auto"
          :loading="loading"
          :size="size"
          :data="dataList"
          :columns="columns"
          :checkList="checkList"
          :pagination="pagination"
          :paginationSmall="size === 'small' ? true : false"
          :header-cell-style="{
            background: 'var(--el-table-row-hover-bg-color)',
            color: 'var(--el-text-color-primary)'
          }"
          @selection-change="handleCurrentChange"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        >
          <template #operation="{ row }">
            <el-button
              class="reset-margin"
              link
              type="primary"
              :size="size"
              :icon="useRenderIcon('ant-design:tags-filled')"
              @click="handleSelect(row)"
            >
              套餐选择
            </el-button>
            <el-button
              class="reset-margin"
              link
              type="primary"
              :size="size"
              :icon="useRenderIcon(EditPen)"
              @click="handleUpdate('update', row)"
            >
              修改
            </el-button>
            <el-popconfirm title="是否确认删除?" @confirm="handleDelete(row)">
              <template #reference>
                <el-button
                  class="reset-margin"
                  link
                  type="primary"
                  :size="size"
                  :icon="useRenderIcon(Delete)"
                >
                  删除
                </el-button>
              </template>
            </el-popconfirm>
          </template>
        </pure-table>
      </template>
    </PureTableBar>
    <!--  新增/编辑弹框组件-->
    <el-dialog
      v-model="dialogVisible"
      :title="'租户' + title"
      width="30%"
      :before-close="handleClose"
    >
      <el-form
        ref="ruleFormRef"
        :model="ruleForm"
        :rules="rules"
        label-width="120px"
        class="demo-ruleForm"
        status-icon
      >
        <el-form-item label="套餐选择" prop="roleIds" v-if="type === 'select'">
          <el-select
            v-model="ruleForm.contactPhone"
            multiple
            placeholder="请选择套餐选择"
            style="width: 240px"
          >
            <el-option
              v-for="item in roleList"
              :key="item.roleId"
              :label="item.roleName"
              :value="item.roleId"
            />
          </el-select>
        </el-form-item>
        <div v-else>
          <el-form-item label="租户名称" prop="tenantName">
            <el-input
              :disabled="type === 'update'"
              v-model="ruleForm.tenantName"
              class="!w-[300px]"
            />
          </el-form-item>
          <el-form-item label="租户代码" prop="tenantCode">
            <el-input
              :disabled="type === 'update'"
              v-model="ruleForm.tenantCode"
              class="!w-[300px]"
            />
          </el-form-item>
          <el-form-item label="过期时间" prop="expireTime">
            <el-date-picker
              v-model="ruleForm.expireTime"
              type="datetime"
              value-format="YYYY-MM-DD hh:mm:ss"
              placeholder="请选择过期时间"
              class="!w-[300px]"
            />
          </el-form-item>
          <el-form-item label="用户上限" prop="userLimit">
            <el-input v-model="ruleForm.userLimit" class="!w-[300px]" />
          </el-form-item>
          <el-form-item label="联系人" prop="contactUser">
            <el-input
              :disabled="type === 'update'"
              v-model="ruleForm.contactUser"
              class="!w-[300px]"
            />
          </el-form-item>
          <el-form-item label="联系电话" prop="contactPhone">
            <el-input
              :disabled="type === 'update'"
              v-model="ruleForm.contactPhone"
              class="!w-[300px]"
            />
          </el-form-item>
        </div>
        <el-form-item>
          <el-button @click="handleCancel(ruleFormRef)">取消</el-button>
          <el-button type="primary" @click="handleOk(ruleFormRef)">
            确定
          </el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<style scoped lang="scss">
.input-box {
  box-shadow: 0 0 0 1px #dcdfe6;
  border-radius: 2px;

  :deep(.el-input__wrapper) {
    padding: 0 15px;
    box-shadow: 0 0 0 0px #dcdfe6;
  }
}
</style>

<script setup lang="ts">
import {ref} from "vue";
import {useDepartment} from "./hook";
import {PureTableBar} from "@/components/RePureTableBar";
import {useRenderIcon} from "@/components/ReIcon/src/hooks";

import Database from "@iconify-icons/ri/database-2-line";
import More from "@iconify-icons/ep/more-filled";
import Delete from "@iconify-icons/ep/delete";
import EditPen from "@iconify-icons/ep/edit-pen";
import Search from "@iconify-icons/ep/search";
import Refresh from "@iconify-icons/ep/refresh";
import Menu from "@iconify-icons/ep/menu";
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
  buttonClass,
  onSearch,
  resetForm,
  handleUpdate,
  handleDelete,
  handleSizeChange,
  handleCurrentChange,
  handleSelectionChange,
  handleClose,
  dialogVisible,
  title,
  ruleForm,
  rules,
  handleOk,
  handleCancle,
  type,
  departmentList,
  treeProps,
  roleList
} = useDepartment();
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
      <el-form-item label="姓名：" prop="realName">
        <el-input
          v-model="form.realName"
          placeholder="请输入姓名"
          clearable
          class="!w-[200px]"
        />
      </el-form-item>
      <el-form-item label="昵称：" prop="nickname">
        <el-input
          v-model="form.nickname"
          placeholder="请输入昵称"
          clearable
          class="!w-[200px]"
        />
      </el-form-item>
      <el-form-item label="手机号：" prop="phone">
        <el-input
          v-model="form.phone"
          placeholder="请输入手机号"
          clearable
          class="!w-[200px]"
        />
      </el-form-item>
      <el-form-item label="邮箱：" prop="email">
        <el-input
          v-model="form.email"
          placeholder="请输入邮箱"
          clearable
          class="!w-[200px]"
        />
      </el-form-item>
      <el-form-item label="部门：" prop="departmentIds">
        <el-tree-select
          v-model="form.departmentIds"
          node-key="departmentId"
          :data="departmentList"
          :props="treeProps"
          multiple
          :render-after-expand="false"
          show-checkbox
          check-strictly
          check-on-click-node
        />
      </el-form-item>
      <el-form-item label="创建时间：" prop="createTime">
        <el-date-picker
          v-model="form.createTime"
          type="datetimerange"
          :shortcuts="shortcuts"
          range-separator="至"
          start-placeholder="开始时间"
          end-placeholder="结束时间"
          value-format="YY-MM-DD hh:mm:ss"
        />
      </el-form-item>
      <el-form-item label="禁用状态：" prop="enable">
        <el-select v-model="form.enable" class="!w-[200px]" placeholder="请选择禁用状态" >
          <el-option value="ENABLE" label="启用" />
          <el-option value="DISABLE" label="禁用" />
        </el-select>
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
    <PureTableBar title="用户列表" @refresh="onSearch">
      <template #buttons>
        <el-button type="primary" :icon="useRenderIcon(AddFill)" @click="handleUpdate('add')">
          新增用户
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
          @selection-change="handleSelectionChange"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        >
          <template #operation="{ row }">
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
      :title="'角色' + title"
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
        <el-form-item label="手机号" prop="phone">
          <el-input :disabled="type === 'update'"  v-model="ruleForm.phone"/>
        </el-form-item>
        <el-form-item label="昵称" prop="nickname" v-if="type === 'update'">
          <el-input :disabled="type === 'update'" v-model="ruleForm.nickname"/>
        </el-form-item>
        <el-form-item label="姓名" prop="realName">
          <el-input v-model="ruleForm.realName"/>
        </el-form-item>
        <el-form-item label="性别" prop="gender">
          <el-radio-group v-model="ruleForm.gender" class="ml-4">
            <el-radio label="MALE" size="large">男</el-radio>
            <el-radio label="FEMALE" size="large">女</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="部门" prop="departmentId">
          <el-tree-select
            v-model="ruleForm.departmentId"
            node-key="departmentId"
            :data="departmentList"
            :props="treeProps"
            :render-after-expand="false"
            check-strictly
          />
        </el-form-item>
        <el-form-item label="角色" prop="roleIds">
          <el-select
            v-model="ruleForm.roleIds"
            multiple
            placeholder="请选择角色"
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
        <el-form-item>
          <el-button @click="handleCancle(ruleFormRef)">取消</el-button>
          <el-button type="primary" @click="handleOk(ruleFormRef)">
            确定
          </el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<style scoped lang="scss">
</style>

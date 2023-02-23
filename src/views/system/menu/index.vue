<script setup lang="ts">
import { ref } from "vue";
import { useMenu } from "./hook";
import { PureTableBar } from "@/components/RePureTableBar";
import { useRenderIcon } from "@/components/ReIcon/src/hooks";

import Delete from "@iconify-icons/ep/delete";
import EditPen from "@iconify-icons/ep/edit-pen";
import Search from "@iconify-icons/ep/search";
import Refresh from "@iconify-icons/ep/refresh";
import AddFill from "@iconify-icons/ri/add-circle-line";

defineOptions({
  name: "Menu"
});

const formRef = ref();
const ruleFormRef = ref();
const {
  form,
  loading,
  columns,
  dataList,
  // buttonClass,
  onSearch,
  resetForm,
  handleUpdate,
  handleDelete,
  handleClose,
  dialogVisible,
  title,
  ruleForm,
  rules,
  handleOk,
  handleCancel,
  menuList,
  treeProps,
  EXmenuType
} = useMenu();
</script>

<template>
  <div class="main">
    <el-form
      ref="formRef"
      :inline="true"
      :model="form"
      class="bg-bg_color w-[99/100] pl-8 pt-4"
    >
      <el-form-item label="菜单名称：" prop="menuName">
        <el-input
          v-model="form.menuName"
          placeholder="请输入菜单名称"
          clearable
          class="!w-[200px]"
        />
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

    <PureTableBar title="菜单列表" @refresh="onSearch">
      <template #buttons>
        <el-button
          type="primary"
          :icon="useRenderIcon(AddFill)"
          @click="handleUpdate('add', '')"
        >
          新增菜单
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
          :header-cell-style="{
            background: 'var(--el-table-row-hover-bg-color)',
            color: 'var(--el-text-color-primary)'
          }"
          row-key="menuId"
          default-expand-all
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
      :title="'菜单' + title"
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
        <el-form-item label="菜单类型" prop="menuType">
          <el-radio
            v-model="ruleForm.menuType"
            v-for="item in EXmenuType"
            :key="item.value"
            :label="item.value"
            size="large"
            style="margin-right: 10px"
            @change="
              () => {
                ruleFormRef.clearValidate();
              }
            "
          >
            {{ item.label }}
          </el-radio>
        </el-form-item>
        <el-form-item label="菜单名称" prop="menuName">
          <el-input v-model="ruleForm.menuName" />
        </el-form-item>
        <el-form-item
          label="权限"
          prop="permission"
          v-if="ruleForm.menuType !== 'DIR'"
        >
          <el-input v-model="ruleForm.permission" />
        </el-form-item>
        <el-form-item
          label="菜单路径"
          prop="path"
          v-if="ruleForm.menuType === 'MENU'"
        >
          <el-input v-model="ruleForm.path" />
        </el-form-item>
        <el-form-item
          label="图标"
          prop="icon"
          v-if="ruleForm.menuType !== 'BUTTON'"
        >
          <el-input v-model="ruleForm.icon" />
        </el-form-item>
        <el-form-item label="排序" prop="sort">
          <el-input v-model="ruleForm.sort" />
        </el-form-item>
        <el-form-item label="父级菜单" prop="parentId">
          <el-tree-select
            v-model="ruleForm.parentId"
            node-key="menuId"
            :data="[menuList]"
            :props="treeProps"
            :render-after-expand="false"
            check-strictly
          />
        </el-form-item>
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
:deep(.el-dropdown-menu__item i) {
  margin: 0;
}
</style>

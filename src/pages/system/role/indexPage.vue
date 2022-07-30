<!--
 * @Author: lihaoyu
 * @Date: 2022-04-09 11:49:55
 * @LastEditTime: 2022-07-09 22:55:55
 * @LastEditors: lihaoyu
 * @Description:
 * @FilePath: /sherly-vue3/src/pages/system/rolePage.vue
-->
<template>
  <div class="sherly-page-wrapper">
    <el-form ref="resetFormData" :model="form" class="sherly-form">
      <el-form-item label="角色名称" prop="roleName">
        <el-input v-model="form.roleName" clearable />
      </el-form-item>
      <div class="sherly-operate-box">
        <el-button icon="Search" type="primary" @click="handleSearch">
          搜索
        </el-button>
        <el-button icon="Refresh" @click="handleReset">重置</el-button>
      </div>
    </el-form>

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
        <el-button type="success" plain @click="handleAddRole" size="small"
          >新增
        </el-button>
      </template>
      <template #table>
        <el-table-column
          prop="roleName"
          label="角色名称"
          width="180"
          align="center" />
        <el-table-column prop="description" label="描述" align="center" />
        <el-table-column prop="createTime" label="创建时间" align="center" />
        <el-table-column fixed="right" label="操作" width="180" align="center">
          <template #default="scope">
            <el-button type="text" @click="handleEdit(scope.row)">修改</el-button>
            <el-popconfirm
              title="确定删除本条数据?"
              @confirm="handleDelete(scope.row)"
            >
              <template #reference>
                <el-button class="delete" type="text">删除</el-button>
              </template>
            </el-popconfirm>
          </template> </el-table-column
      ></template>
    </SherlyTable>
    <el-dialog
      v-model="dialogVisible"
      :title="isEdit ? '角色修改' : '角色新增'"
      width="480px"
      :before-close="handleCancel"
    >
      <el-form
        v-if="dialogVisible"
        ref="ruleFormRef"
        :model="roleForm"
        :rules="rules"
        label-width="80px"
      >
        <el-form-item label="角色名称" prop="roleName">
          <el-input v-model="roleForm.roleName" />
        </el-form-item>
        <el-form-item label="描述" prop="description">
          <el-input v-model="roleForm.description" />
        </el-form-item>
      </el-form>
      <el-tabs v-model="activeName" v-if="roleForm.roleId">
        <el-tab-pane label="菜单权限" name="menu">
          <div class="tree-box">
            <el-tree
                :check-strictly="!isStrictly"
                :data="menuTree"
                show-checkbox
                node-key="menuId"
                :props="{
                children: 'children',
                label: 'menuName',
              }"
                default-expand-all
                :default-checked-keys="roleForm.menuIds"
                @check-change="handleMenuTreeCheckChange"
            />
          </div>
        </el-tab-pane>
      </el-tabs>
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
import { ref, reactive, onMounted, toRaw } from "vue";
import { ElMessage } from "element-plus";
import {
  getRoleLists,
  addRole,
  delRole,
  updateRole,
  getOneRole,
} from "@/api/system/role";
import { getMenu } from "@/api/system/menu";
import SherlyTable from "@/components/SherlyTable.vue";

export default {
  components: { SherlyTable },
  setup() {
    const loading = ref(false)
    const resetFormData = ref(null);
    const ruleFormRef = ref(null);
    const tableData = reactive({});
    const dialogVisible = ref(false);
    const menuTree = reactive([]);
    const permissionTree = reactive([]);
    const isEdit = ref(false);
    const activeName = ref("menu");
    const isStrictly = ref(false)
    const rules = {
      roleName: [
        {
          required: true,
          message: "请输入角色名称",
        },
      ],
      description: [
        {
          required: true,
          message: "请输入角色描述",
        },
      ],
    };
    let form = reactive({
      roleName: "",
      current: 1,
      size: 10,
    });

    // 初始化角色详情数据
    const initRoleForm = () => {
      return {
        description: "",
        menuIds: [],
        permissionIds: [],
        roleName: "",
        roleId: null,
      };
    };
    // 角色详情数据响应式
    let roleForm = reactive(initRoleForm());
    // 重置角色详情数据
    const resetRoleForm = () => {
      Object.assign(roleForm, initRoleForm());
    };

    onMounted(() => {
      handleGetRoleLists();
      handleGetMenuTree();
    });

    // 获取角色列表
    const handleGetRoleLists = async () => {
      loading.value = true
      const data = await getRoleLists(form);
      Object.keys(data).forEach((key) => {
        tableData[key] = data[key];
        setTimeout(() => {
          loading.value = false
        }, 100)
      });
    };

    // 获取菜单树
    const handleGetMenuTree = async () => {
      const data = await getMenu();
      data.forEach((i) => {
        menuTree.push(i);
      });
    };

    // 修改当前分页页码
    const handleCurrentChange = (e) => {
      tableData.current = e;
      form.current = e;
      handleGetRoleLists(form);
    };

    // 修改当前每页数量
    const handleSizeChange = (e) => {
      tableData.size = e;
      form.size = e;
      handleGetRoleLists(form);
    };

    // 搜索
    const handleSearch = () => {
      handleGetRoleLists(form);
    };

    // 重置搜素
    const handleReset = () => {
      resetFormData.value.resetFields();
      handleGetRoleLists();
    };

    // 添加角色
    const handleAddRole = () => {
      isEdit.value = false;
      dialogVisible.value = true;
    };

    // 编辑角色
    const handleEdit = async ({ roleId }) => {
      const data = await getOneRole(roleId);
      Object.keys(data).forEach((i) => {
        roleForm[i] = data[i];
      });
      isEdit.value = true;
      dialogVisible.value = true;
    };

    // 删除角色
    const handleDelete = ({ roleId }) => {
      delRole(roleId).then(() => {
        ElMessage({
          message: "删除角色成功",
          type: "success",
        });
        handleGetRoleLists();
      });
    };

    // 修改菜单树选中
    const handleMenuTreeCheckChange = (data, checked) => {
      isStrictly.value = true
      if (checked) {
        roleForm.menuIds.push(toRaw(data).menuId);
      } else {
        const menuIds = roleForm.menuIds.filter(
          (i) => i !== toRaw(data).menuId
        );
        roleForm.menuIds.length = 0;
        menuIds.forEach((i) => {
          roleForm.menuIds.push(i);
        });
      }
    };

    // 确定
    const handleConfirm = () => {
      ruleFormRef.value.validate((valid) => {
        if (valid) {
          if (roleForm.roleId) {
            updateRole(roleForm).then(() => {
              dialogVisible.value = false;
              ElMessage({
                message: "修改角色成功",
                type: "success",
              });
              handleGetRoleLists();
            });
          } else {
            addRole(roleForm).then(() => {
              dialogVisible.value = false;
              ElMessage({
                message: "添加角色成功",
                type: "success",
              });
              handleGetRoleLists();
            });
          }
          handleCancel();
        }
      });
    };

    // 取消
    const handleCancel = () => {
      resetRoleForm();
      dialogVisible.value = false;
    };

    return {
      form,
      rules,
      activeName,
      resetFormData,
      ruleFormRef,
      tableData,
      roleForm,
      dialogVisible,
      isEdit,
      menuTree,
      permissionTree,
      isStrictly,
      handleSearch,
      handleReset,
      handleEdit,
      handleConfirm,
      handleDelete,
      handleAddRole,
      handleCurrentChange,
      handleGetRoleLists,
      handleCancel,
      handleMenuTreeCheckChange,
      handleSizeChange,
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

.tree-box {
  height: 180px;
  overflow: scroll;
}
</style>

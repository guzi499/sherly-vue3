<!--
 * @author: 李浩宇
 * @date: 2022-04-09
-->

<template>
  <div class="sherly-page-wrapper">
    <el-form
      ref="resetFormData"
      :model="form"
      :inline="true"
      label-width="80px"
    >
      <el-form-item label="角色名称" prop="roleName">
        <el-input v-model="form.roleName" style="width: 215px" clearable />
      </el-form-item>
      <el-form-item>
        <el-button icon="Search" type="primary" @click="handleSearch">
          搜索
        </el-button>
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
      :pagination-current="tableData.current"
      :pagination-size="tableData.size"
    >
      <template #header>
        <el-button
          type="primary"
          @click="handleAddRole"
          size="small"
          v-permission="['role:save_one']"
        >
          新增
        </el-button>
      </template>
      <template #table>
        <el-table-column
          prop="roleName"
          label="角色名称"
          width="180"
          align="center"
        />
        <el-table-column prop="description" label="描述" align="center" />
        <el-table-column prop="createTime" label="创建时间" align="center" />
        <el-table-column fixed="right" label="操作" width="180" align="center">
          <template #default="scope">
            <el-link
              type="primary"
              @click="handleEdit(scope.row)"
              v-permission="['role:update_one']"
            >
              修改
            </el-link>
            <el-popconfirm
              title="确定删除本条数据?"
              @confirm="handleDelete(scope.row)"
            >
              <template #reference>
                <el-link
                  type="danger"
                  v-permission="['role:remove_one']"
                  v-show="scope.row.roleId !== 1"
                >
                  删除
                </el-link>
              </template>
            </el-popconfirm>
          </template>
        </el-table-column>
      </template>
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
        <el-form-item label="菜单权限" v-if="roleForm.roleId">
          <div>
            <el-checkbox
              v-model="menuCheckedKey"
              @change="handleCheckedTreeChange"
              >全选</el-checkbox
            >
            <el-checkbox v-model="isStrictly">父子关联</el-checkbox>
          </div>
          <div class="tree-box">
            <el-tree
              ref="roleTree"
              :check-strictly="!isStrictly"
              :data="menuTree"
              show-checkbox
              empty-text="加载中，请稍后"
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
        </el-form-item>
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
import {
  ref,
  reactive,
  onMounted,
  toRaw,
  getCurrentInstance,
  watch,
} from "vue";
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
    const { proxy } = getCurrentInstance();
    const loading = ref(false);
    const resetFormData = ref(null);
    const ruleFormRef = ref(null);
    const tableData = reactive({});
    const dialogVisible = ref(false);
    const menuTree = reactive([]);
    const permissionTree = reactive([]);
    const isEdit = ref(false);
    const isStrictly = ref(false);
    const rules = {
      roleName: [
        {
          required: true,
          message: "请输入角色名称",
        },
      ],
    };
    let form = reactive({
      roleName: "",
      current: 1,
      size: 10,
    });

    watch(dialogVisible, (val) => {
      if (!val) {
        isStrictly.value = false;
      }
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

    // 菜单权限 - 多选框
    const menuCheckedKey = ref("");
    const handleCheckedTreeChange = (val) => {
      const ary = handleTree(menuTree);
      proxy.$refs.roleTree.setCheckedNodes(val ? ary._rawValue : []);
    };
    // 树形数据扁平化
    const handleTree = (val) => {
      let ary = ref([]);
      const fn = (val) => {
        val.forEach((item) => {
          ary.value.push(item);
          if (item.children && item.children.length > 0) {
            fn(item.children);
          }
        });
      };
      fn(val);
      return ary;
    };

    // 获取角色列表
    const handleGetRoleLists = async () => {
      loading.value = true;
      const data = await getRoleLists(form);
      Object.keys(data).forEach((key) => {
        tableData[key] = data[key];
        setTimeout(() => {
          loading.value = false;
        }, 100);
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
      await proxy.$nextTick(() => {
        isStrictly.value = true;
      });
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
      const ary = proxy.$refs.roleTree.getHalfCheckedNodes();
      ary.forEach((item) => {
        proxy.$refs.roleTree.setChecked(item.menuId, true);
      });
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
      resetFormData,
      ruleFormRef,
      tableData,
      roleForm,
      dialogVisible,
      isEdit,
      menuTree,
      permissionTree,
      isStrictly,
      loading,
      menuCheckedKey,
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
      handleCheckedTreeChange,
    };
  },
};
</script>
<style lang="scss" scoped>
/* 滚动条整体部分 */
::-webkit-scrollbar {
  width: 20px;
}

/*滚动条轨道、滚动条*/
::-webkit-scrollbar-track,
::-webkit-scrollbar-thumb {
  border-radius: 50px;
  border: 6px solid transparent;
}

/*滚动条轨道*/
::-webkit-scrollbar-track {
  box-shadow: 1px 1px 10px #fff inset;
}

/*滚动条*/
::-webkit-scrollbar-thumb {
  min-height: 20px;
  background-clip: content-box;
  box-shadow: 0 0 0 5px rgb(204, 204, 204) inset;
}

/*边角*/
::-webkit-scrollbar-corner {
  background: transparent;
}

.tree-box {
  width: 100%;
  height: 180px;
  overflow: auto;
  border: 1px solid rgb(238, 239, 240);
  border-radius: 5px;
}
</style>

<template>
  <div class="sherly-page-wrapper">
    <el-form ref="resetFormData" :model="form" class="sherly-form">
      <el-form-item label="权限名称" prop="selectName">
        <el-input v-model="selectName" placeholder="请输入权限名称" />
      </el-form-item>
      <div class="sherly-operate-box">
        <el-button type="primary" :icon="Search" @click="searchBtn"
          >搜索</el-button
        >
        <el-button :icon="Refresh" @click="resetBtn">重置</el-button>
        <el-button type="primary" :icon="Plus" @click="handleClick('')"
          >新增</el-button
        >
      </div>
    </el-form>
    <!-- <el-row type="flex" class="search">
      <el-col :span="1.5" class="searchName">权限名称：</el-col>
      <el-col :span="5">
        <el-input v-model="selectName" placeholder="请输入权限名称" />
      </el-col>
      <el-col :span="1.2" class="btn">
        <el-button type="primary" :icon="Search" @click="searchBtn"
          >搜索</el-button
        >
      </el-col>
      <el-col :span="1.2" class="btn">
        <el-button :icon="Refresh" @click="resetBtn">重置</el-button>
      </el-col>
      <el-col :span="1.2" class="btn">
        <el-button type="primary" :icon="Plus" @click="handleClick('')"
          >新增</el-button
        >
      </el-col>
    </el-row> -->
    <el-table
      :data="tableData"
      style="width: 100%; margin-bottom: 20px"
      row-key="permissionId"
      default-expand-all
      class="table"
      lazy
      :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
    >
      <el-table-column
        prop="permissionName"
        label="权限名称"
        sortable
        width="240"
      />
      <el-table-column prop="description" label="描述" width="auto" />
      <el-table-column prop="createTime" label="创建时间" width="240" />
      <el-table-column label="操作" width="240" align="center" fixed="right">
        <template #default="{ row }">
          <el-button type="text" size="small" @click="handleClick(row)"
            >修改</el-button
          >
          <el-button type="text" size="small" @click="handleDelect(row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>

    <el-dialog
      v-model="dialogFormVisible"
      title="权限表单"
      center
      width="600px"
      @close="handleDialogClose"
    >
      <el-form :model="form">
        <el-form-item label="权限名称：" :label-width="100">
          <el-input
            v-model="form.permissionName"
            placeholder="请输入"
            autocomplete="off"
          />
        </el-form-item>
        <el-form-item label="描述：" :label-width="100">
          <el-input
            v-model="form.description"
            placeholder="请输入"
            autocomplete="off"
          />
        </el-form-item>
        <el-form-item label="父级权限：" :label-width="100">
          <el-select
            ref="treeRef"
            v-model="form.parentId"
            placeholder="请选择"
            style="width: 550px"
          >
            <el-option
              hidden
              :label="treeDatas"
              :value="form.parentId"
            ></el-option>
            <el-tree
              :data="permissionList"
              :props="defaultProps"
              :expand-on-click-node="false"
              @node-click="nodeOnclick"
            />
          </el-select>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取消</el-button>
          <el-button type="primary" @click="confirm">确定</el-button>
        </span>
      </template>
    </el-dialog>

    <!-- 提示框 -->
    <el-dialog
      v-model="tips"
      title="提示"
      width="30%"
      :before-close="handleClose"
      center
    >
      <span>确定要删除本条数据吗？</span>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="tips = false">取消</el-button>
          <el-button type="primary" @click="delConfirm">确定</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, getCurrentInstance } from "vue";
import { ElMessageBox, ElMessage } from "element-plus";
import { Search, Refresh, Plus } from "@element-plus/icons-vue";

import {
  getPermissionTree,
  addPermission,
  updatePermission,
  delPermission,
  getPermissionSelect,
} from "@/api/system/permission";
const selectName = ref("");
let tableData = ref([]);
const { proxy } = getCurrentInstance();
const dialogFormVisible = ref(false);

const form = ref({
  permissionName: "",
  description: "",
  parentId: "",
});

const tips = ref(false);
const permissionList = ref([]);
const defaultProps = {
  children: "children",
  label: "permissionName",
};
const treeDatas = ref("");
const handleClose = () => {
  ElMessageBox.confirm("确定要放弃当前编辑内容吗?")
    .then(() => {
      tips.value = false;
    })
    .catch(() => {});
};

function getFilterData(list, keyword) {
  const arr = [];
  function getDataList(list, keyword) {
    list.forEach((item) => {
      if (item.permissionName.indexOf(keyword) == -1) {
        if (item.children) {
          getDataList(item.children, keyword);
        }
      } else {
        arr.push(item);
      }
    });
  }
  getDataList(list, keyword);
  return arr;
}

// 搜索
const searchBtn = () => {
  getPermissionTree().then((res) => {
    tableData.value = res;
    tableData.value = getFilterData(tableData.value, selectName.value);
  });
};

// 修改的对象
const selected = ref({});
// 方法;;
// 编辑，新增
const handleClick = (row) => {
  selected.value = row;
  dialogFormVisible.value = true;
  if (row.permissionId) {
    form.value.permissionName = row.permissionName;
    form.value.description = row.description;
    form.value.parentId = row.parentId;
    treeDatas.value = row.permissionName;
    // form.value.parentName = row.parentName
  } else {
    form.value.permissionName = "";
    form.value.description = "";
    form.value.parentId = "";
  }
};
let deleteId = ref("");
// 删除
const handleDelect = (row) => {
  tips.value = true;
  deleteId.value = row.permissionId;
};
getPermissionSelect().then((res) => {
  permissionList.value = res;
});
// 获取菜单树
const getPermissionList = () => {};
const nodeOnclick = (e) => {
  treeDatas.value = e.permissionName;
  form.value.parentId = e.permissionId;
  proxy.$refs.treeRef.blur();
};

getPermissionTree().then((res) => {
  tableData.value = res;
});

// 重置
const resetBtn = () => {
  selectName.value = "";
  getPermissionTree().then((res) => {
    tableData.value = res;
  });
};

// 提交表单
const confirm = () => {
  if (Object.keys(selected.value).length) {
    updatePermission({
      ...selected.value,
      ...form.value,
    })
      .then()
      .finally(() => {
        selected.value = "";
      });
  } else {
    addPermission(form).then(() => {
      getPermissionList();
    });
  }

  dialogFormVisible.value = false;
};

// 删除确认
const delConfirm = () => {
  delPermission(deleteId.value).then(() => {
    getPermissionTree().then((res) => {
      tableData.value = res;
    });
    tips.value = false;
    ElMessage({
      type: "info",
      message: "删除成功",
    });
  });
};

// 关闭弹窗的回调函数
const handleDialogClose = () => {
  form.value = {
    permissionName: "",
    description: "",
    parentId: "",
    parentName: "",
  };
  treeDatas.value = "";
};
</script>

<style lang="scss" scope>
.permissionPage {
  padding: 30px 100px;
  box-sizing: border-box;
  .search {
    margin-top: 20px;
    .searchName {
      align-self: center;
    }
    .btn {
      margin-left: 10px;
    }
    .btn:last-child {
      margin-left: auto;
    }
  }
  .table {
    margin-top: 50px;
  }
  ::v-deep .el-select {
    width: 550px;
  }
}
</style>

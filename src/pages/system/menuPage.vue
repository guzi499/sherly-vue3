<template>
  <div class="menu-container">
    <!-- 菜单搜索框 -->
    <el-form>
      <el-row>
        <el-col :span="6">
          <el-form-item label="菜单名称:">
            <el-input />
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-button type="primary">搜索</el-button>
          <el-button>重置</el-button>
        </el-col>
      </el-row>
    </el-form>
    <!-- 操作按钮 -->
    <el-row :gutter="5" type="flex" justify="end" style="margin-right: 1rem">
      <el-col :span="1.5">
        <el-button type="primary" plain size="small" @click="handleEdit('1')"
          >新增</el-button
        >
      </el-col>
    </el-row>
    <!-- 表格菜单 -->
    <el-table
      :data="menuList"
      style="width: 100%; margin-bottom: 20px"
      row-key="menuId"
      border
      lazy
      :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
    >
      <el-table-column
        label="菜单名称"
        prop="menuName"
        sortable
        width="230"
        align="center"
      />
      <el-table-column
        label="菜单路径"
        prop="link"
        width="230"
        align="center"
      />
      <el-table-column label="图标" prop="icon" width="150" align="center" />
      <el-table-column label="排序" prop="sort" width="150" align="center" />
      <el-table-column label="创建时间" prop="currentDate" align="center" />
      <el-table-column label="操作" align="center" width="250">
        <template #default="scope">
          <el-button
            type="primary"
            size="small"
            @click="handleEdit('2', scope.$index, scope.row)"
            >修改</el-button
          >
          <el-button
            size="small"
            type="danger"
            @click="handleDelete('2', scope.$index, scope.row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <!-- 新增 / 编辑 弹框 -->
  </div>
</template>

<script>
import { useStore } from "vuex";
import { ElMessage, ElMessageBox } from "element-plus";
export default {
  setup() {
    const $store = useStore();
    // 获取路由信息
    const menuList = $store.state.router.menuList;
    // 点击修改 - 新增按钮
    const handleEdit = (type, index, data) => {
      if (type === "1") {
        console.log("新增 === ", type, index, data);
      }
      if (type === "2") {
        console.log("修改 === ", type, index, data);
      }
      console.log();
    };
    // 点击删除按钮
    const handleDelete = (type, index, data) => {
      if (type === "2") {
        console.log("删除 ===", type, index, data);
        ElMessageBox.confirm(
          "确定删除本条数据？",
          // "Warning",
          {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning",
          }
        )
          .then(() => {
            console.log(data.menuId);
            ElMessage({
              type: "success",
              message: "删除成功",
            });
          })
          .catch(() => {
            ElMessage({
              type: "info",
              message: "取消删除操作",
            });
          });
      }
    };
    return { menuList, handleEdit, handleDelete };
  },
};
</script>

<style lang="scss" scoped>
.el-row {
  margin: 0.5rem;
}
.el-button--text {
  margin-right: 15px;
}
.el-select {
  width: 300px;
}
.el-input {
  width: 300px;
}
.dialog-footer button:first-child {
  margin-right: 10px;
}
</style>

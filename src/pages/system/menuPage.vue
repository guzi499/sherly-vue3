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
    <el-row :gutter="5" type="flex" justify="end">
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
    <el-dialog v-model="dialogFormVisible" :title="dialogTitle" width="600px">
      <el-form :model="form">
        <el-form-item label="父级菜单" :label-width="formLabelWidth">
          <el-select v-model="form.parentId" placeholder="请选择">
            <el-option hidden :value="treeData" :label="treeDatas"> </el-option>
            <el-tree
              :data="menuList"
              :props="defaultProps"
              :expand-on-click-node="false"
              @node-click="nodeOnclick"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="菜单名称" :label-width="formLabelWidth">
          <el-input v-model="form.menuName"></el-input>
        </el-form-item>
        <el-form-item label="菜单路径" :label-width="formLabelWidth">
          <el-input v-model="form.link"></el-input>
        </el-form-item>
        <el-form-item label="图标" :label-width="formLabelWidth">
          <el-input v-model="form.icon"></el-input>
        </el-form-item>
        <el-form-item label="排序" :label-width="formLabelWidth">
          <!-- <el-input v-model="form.sort"></el-input> -->
          <el-input-number
            v-model="form.sort"
            :min="1"
            controls-position="right"
            size="large"
          />
        </el-form-item>
        <el-form-item :label-width="formLabelWidth">
          <el-button @click="handleCancle">取消</el-button>
          <el-button type="primary" @click="handleOk">确定</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import { useStore } from "vuex";
import { ElMessage, ElMessageBox } from "element-plus";
import { reactive, ref, onMounted,  getCurrentInstance } from "vue";
import server from "@/api/router";
// import { addMenu, updateMenu } from "@/api/system/menu";
import { delMenu } from "@/api/system/menu";
export default { 
  setup() {
    const Proxy = getCurrentInstance()
    console.log(Proxy);
    onMounted(() => {
      getList()
    })
    const loading = ref(true);
    const $store = useStore();
    // 获取路由信息
    const menuList = $store.state.router.menuList;
    // const menuList = reactive([]);
    /** 查询菜单列表 */
    const getList = () => {
      loading.value = true;
      server.getMenu().then((res) => {
        console.log(res);
        menuList.value = res;
        loading.value = false;
      });
    };

    // 控制弹框是否显示
    const dialogFormVisible = ref(false);
    const formLabelWidth = "140px";
    // 弹框标题
    const dialogTitle = ref("菜单");
    // 选中回显的数据
    const treeData = ref(null);
    const treeDatas = ref("");
    // 弹框新增 / 修改弹框绑定数据
    const form = reactive({
      icon: "",
      link: "",
      menuName: "",
      parentId: "",
      sort: "",
    });
    const defaultProps = {
      children: "children",
      label: "menuName",
    };
    // 选中菜单
    const nodeOnclick = (e) => {
      form.parentId = e.menuId;
      treeData.value = e.menuId;
      treeDatas.value = e.menuName;
      console.log(form.parentId, treeData.value, treeDatas.value, e);
    };
    // 点击修改 - 新增按钮
    const handleEdit = (type, index, data) => {
      dialogFormVisible.value = true
      if (type === "1") {
        console.log("新增 === ", type, index, data);
        dialogTitle.value = "新增菜单";
      }
      if (type === "2") {
        console.log("修改 === ", type, index, data);
        dialogTitle.value = "修改菜单";
      }
    };
    // 点击删除按钮
    const handleDelete = (type, index, data) => {
      if (type === "2") {
        console.log("删除 ===", type, index, data);
        ElMessageBox.confirm("确定删除本条数据？", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        })
          .then(() => {
            console.log(typeof data.menuId);
            delMenu(data.menuId)
              .then((res) => {
                console.log(res);
                ElMessage({
                  type: "success",
                  message: "res.message",
                });
                getList();
              })
              .catch((err) => {
                return err;
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
    // 点击确定按钮
    const handleOk = () => {
      console.log(form);
    };
    // 点击取消按钮
    const handleCancle = () => {
      console.log('点击取消按钮');
    }
    return {
      menuList,
      handleEdit,
      handleDelete,
      dialogFormVisible,
      dialogTitle,
      formLabelWidth,
      form,
      defaultProps,
      nodeOnclick,
      treeData,
      treeDatas,
      handleOk,
      handleCancle
    };
  },
};
</script>

<style lang="scss" scoped>
.menu-container {
  padding: 16px;
}
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

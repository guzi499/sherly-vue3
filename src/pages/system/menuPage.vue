<template>
  <div class="menu-container">
    <!-- 菜单搜索框 -->
    <el-form>
      <el-row>
        <el-col :span="6">
          <el-form-item label="菜单名称:">
            <el-input v-model="queryparms.menuName" />
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-button type="primary" @click="handleQuery">搜索</el-button>
          <el-button @click="resetFn">重置</el-button>
        </el-col>
      </el-row>
    </el-form>
    <!-- 操作按钮 -->
    <el-row :gutter="5" type="flex" justify="end">
      <el-col :span="1.5">
        <el-button type="primary" plain size="small" @click="handleEdit('1')"
          >新增
        </el-button>
      </el-col>
    </el-row>
    <!-- 表格菜单 -->
    <el-table
      :data="menuList"
      style="width: 100%; margin-bottom: 20px"
      row-key="menuId"
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
            >修改
          </el-button>
          <el-button
            size="small"
            type="danger"
            @click="handleDelete('2', scope.$index, scope.row)"
            >删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 新增 / 编辑 弹框 -->
    <el-dialog v-model="dialogFormVisible" :title="dialogTitle" width="600px">
      <el-form :model="form">
        <el-form-item
          label="父级菜单"
          :label-width="formLabelWidth"
          prop="parentId"
        >
          <el-select
            ref="selectTree"
            v-model="form.parentId"
            placeholder="请选择"
          >
            <el-option
              hidden
              :value="form.parentId"
              :label="treeDatas"
            ></el-option>
            <el-tree
              :data="menuListSelect"
              :props="defaultProps"
              :expand-on-click-node="false"
              @node-click="nodeOnclick"
            />
            <!--            <el-tree-select v-model="menuId" :data="menuListSelect" />-->
          </el-select>
        </el-form-item>
        <el-form-item
          label="菜单名称"
          :label-width="formLabelWidth"
          prop="menuName"
        >
          <el-input v-model="form.menuName"></el-input>
        </el-form-item>
        <el-form-item
          label="菜单路径"
          :label-width="formLabelWidth"
          prop="link"
        >
          <el-input v-model="form.link"></el-input>
        </el-form-item>
        <el-form-item label="图标" :label-width="formLabelWidth" prop="icon">
          <el-input v-model="form.icon"></el-input>
        </el-form-item>
        <el-form-item label="排序" :label-width="formLabelWidth" prop="sort">
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
import { ElMessage, ElMessageBox } from "element-plus";
import { reactive, ref, onMounted, getCurrentInstance } from "vue";
import { getMenu } from "@/api/system/menu";
import { addMenu, delMenu, updateMenu } from "@/api/system/menu";
import { getMenuList } from "@/api/general.js";

export default {
  setup() {
    const { proxy } = getCurrentInstance();
    console.log(proxy);
    // 菜单查询条件
    const queryparms = reactive({
      menuName: "",
    });
    // 根据查询条件搜索
    const handleQuery = () => {
      console.log("搜索");
    };
    const resetFn = () => {
      queryparms.menuName = "";
      getList();
    };
    // 判断弹框类型
    const dialogType = ref("1");
    onMounted(() => {
      getList();
      getMenuListFn();
    });
    const loading = ref(true);
    // 获取路由信息
    const menuList = ref([]);
    // 查询菜单列表
    const getList = (value) => {
      loading.value = true;
      getMenu(value).then((res) => {
        console.log(res);
        menuList.value = res;
        loading.value = false;
      });
      getMenuListFn();
    };

    // 查询菜单下拉框数据
    const menuListSelect = ref([]);
    // 获取菜单下拉框数据
    const getMenuListFn = () => {
      getMenuList().then((res) => {
        menuListSelect.value = res;
        console.log(menuListSelect.value);
      });
    };

    // 控制弹框是否显示
    const dialogFormVisible = ref(false);
    const formLabelWidth = "140px";
    // 弹框标题
    const dialogTitle = ref("菜单");
    // 选中回显的数据
    // const treeData = ref(null);
    const treeDatas = ref("");
    // 弹框新增 / 修改弹框绑定数据
    const form = reactive({});
    const defaultProps = {
      children: "children",
      label: "menuName",
    };
    // 重置表单
    const reset = () => {
      form.parentId = "";
      form.icon = "";
      form.link = "";
      form.menuId = "";
      form.menuName = "";
      form.sort = "";
      // (treeData.value = "");
      treeDatas.value = "";
    };
    // 选中弹框中的树形数据
    const nodeOnclick = (e) => {
      console.log(e);
      form.parentId = e.menuId;
      // treeData.value = e.menuId;
      treeDatas.value = e.menuName;
      proxy.$refs.selectTree.blur();
    };
    // 点击修改 - 新增按钮
    const handleEdit = (type, index, data) => {
      dialogFormVisible.value = true;
      if (type === "1") {
        reset();
        dialogType.value = type;
        console.log("新增 === ", type, index, data);
        dialogTitle.value = "新增菜单";
      }
      if (type === "2") {
        dialogType.value = type;
        console.log("修改 === ", type, index, data);
        dialogTitle.value = "修改菜单";
        // treeData.value = data.parentId;
        form.parentId = data.parentId;
        console.log(menuList.value);
        forEachMenuList(menuList.value);
        form.icon = data.icon;
        form.link = data.link;
        form.menuId = data.menuId;
        form.menuName = data.menuName;
        form.sort = data.sort;
      }
    };
    // 处理树形数据回显
    const forEachMenuList = (data) => {
      data.forEach((item) => {
        console.log(item);
        if (form.parentId === 0) {
          return (treeDatas.value = "主目录");
        }
        if (form.parentId === item.menuId) {
          return (treeDatas.value = item.menuName);
        } else if (item.children.length >= 1) {
          forEachMenuList(item.children);
        }
      });
    };
    // 点击删除按钮
    const handleDelete = (type, index, data) => {
      if (type === "2") {
        ElMessageBox.confirm("确定删除本条数据？", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        })
          .then(() => {
            delMenu(data.menuId)
              .then(() => {
                ElMessage({
                  type: "success",
                  message: "删除成功",
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
      // 新增
      if (dialogType.value === "1") {
        console.log("调用新增接口");
        delete form.menuId;
        addMenu(form)
          .then(() => {
            getList();
            reset();
          })
          .catch(() => {
            console.log("新增失败");
          })
          .finally(() => {
            dialogFormVisible.value = false;
          });
      }
      // 修改
      if (dialogType.value === "2") {
        console.log("调用修改接口");
        updateMenu(form)
          .then(() => {
            getList();
          })
          .catch(() => {
            console.log("修改失败");
          })
          .finally(() => {
            reset();
            dialogFormVisible.value = false;
          });
      }
    };
    // 点击取消按钮
    const handleCancle = () => {
      reset();
      console.log("重置后的表单", form);
      dialogFormVisible.value = false;
    };
    return {
      menuList,
      queryparms,
      handleQuery,
      resetFn,
      handleEdit,
      handleDelete,
      dialogFormVisible,
      dialogTitle,
      formLabelWidth,
      form,
      defaultProps,
      nodeOnclick,
      // treeData,
      treeDatas,
      handleOk,
      handleCancle,
      menuListSelect,
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

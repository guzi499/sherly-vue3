<template>
  <div class="menu-container">
    <!-- 操作按钮 -->
    <el-row :gutter="5">
      <el-col :span="1.5">
        <el-button type="primary" plain size="small" @click="handleEdit('1')"
          >新增</el-button
        >
      </el-col>
      <el-col :span="1.5">
        <el-button type="danger" plain size="small" @click="handleDelete('1')"
          >批量删除</el-button
        >
      </el-col>
    </el-row>
    <!-- 表格菜单 -->
    <el-table
      :data="tableData"
      style="width: 100%; margin-bottom: 20px"
      row-key="id"
      border
      default-expand-all
    >
      <el-table-column
        label="菜单名称"
        prop="name"
        width="180"
        align="center"
      />
      <el-table-column label="排序" prop="id" width="180" align="center" />
      <el-table-column
        label="请求地址"
        prop="address"
        width="180"
        align="center"
      />
      <el-table-column label="类型" prop="type" width="180" align="center" />
      <el-table-column label="可见" width="180" align="center">
        <el-switch v-model="tableData.visible" />
      </el-table-column>
      <el-table-column
        label="权限标识"
        prop="permission"
        width="180"
        align="center"
      />
      <el-table-column label="操作" align="center">
        <template #default="scope">
          <el-button
            type="primary"
            size="small"
            @click="handleEdit('2', scope.$index, scope.row)"
            >编辑</el-button
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
    <el-dialog
      v-model="dialogEditFormVisible"
      :title="title"
      class="editDialog"
    >
      <el-form :model="editForm" label-width="120px">
        <el-form-item label="上级菜单">
          <el-select
            v-model="editForm.parentId"
            clearable
            placeholder="Select"
            style="width: 90%"
          >
            <el-option
              ref="option"
              class="option"
              :value="optionData.id"
              :label="optionData.name"
            >
              <el-tree
                :data="menuList"
                :props="defaultProps"
                @node-click="handleNodeClick"
              ></el-tree>
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="菜单类型">
          <el-radio-group v-model="editForm.type">
            <el-radio label="目录" />
            <el-radio label="菜单" />
            <el-radio label="按钮" />
          </el-radio-group>
        </el-form-item>
        <el-form-item label="菜单图标">
          <el-select
            style="width: 90%"
            v-model="editForm.icon"
            multiple
            filterable
            remote
            reserve-keyword
            placeholder="点击选择图标"
            :remote-method="remoteMethod"
          >
            <el-option
              v-for="item in icons"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="菜单名称">
          <el-select
            style="width: 90%"
            v-model="editForm.icon"
            multiple
            filterable
            remote
            reserve-keyword
            placeholder="请输入菜单名称"
            :remote-method="remoteMethod"
          >
            <el-option
              v-for="item in icons"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="显示排序">
          <el-input-number
            v-model="editForm.sort"
            :min="1"
            :max="10"
            controls-position="right"
            size="large"
            @change="handleChangeSort"
          />
        </el-form-item>
        <el-form-item label="是否外链">
          <el-radio
            v-model="editForm.radio1"
            label="是"
            value="1"
            size="large"
          />
          <el-radio
            v-model="editForm.radio1"
            label="否"
            value="0"
            size="large"
          />
        </el-form-item>
        <el-form-item label="路由地址">
          <el-select
            style="width: 90%"
            v-model="editForm.icon"
            multiple
            filterable
            remote
            reserve-keyword
            placeholder="请输入菜单名称"
            :remote-method="remoteMethod"
          >
            <el-option
              v-for="item in icons"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="显示状态">
          <el-radio
            v-model="editForm.show1"
            label="显示"
            value="1"
            size="large"
          />
          <el-radio
            v-model="editForm.show1"
            label="隐藏"
            value="0"
            size="large"
          />
        </el-form-item>
        <el-form-item label="菜单状态">
          <el-radio
            v-model="editForm.state1"
            label="正常"
            value="1"
            size="large"
          />
          <el-radio
            v-model="editForm.state1"
            label="停用"
            value="0"
            size="large"
          />
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogEditFormVisible = false">取消</el-button>
          <el-button type="primary" @click="dialogEditFormVisible = false"
            >确定</el-button
          >
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import { reactive, ref } from "vue";
import { useStore } from "vuex";
export default {
  setup() {
    const $store = useStore();
    // console.log($store);
    const menuList = $store.state.router.menuList;
    console.log(menuList);
    // 表格数据
    const tableData = reactive([
      {
        name: "user1",
        id: "1",
        address: "湖北省",
        type: "菜单",
        visible: true,
        permission: "CA 90036",
      },
    ]);
    // 弹框标题
    const title = ref("标题");
    // 新增/编辑 弹框是否可见
    const dialogEditFormVisible = ref(false);
    // 新增/编辑 弹框绑定的表格数据
    const editForm = reactive({
      parentId: "主类目",
      type: "",
      icon: "",
      sort: Number,
      radio1: "1",
      show1: "1",
      state1: "1",
    });
    // 上级菜单
    const defaultProps = reactive({
      children: "children",
      label: "menuName",
    });
    const optionData = reactive({
      id: "",
      name: "",
    });
    // 菜单图标
    const icons = reactive([]);

    // 编辑按钮
    const handleEdit = (type, index, data) => {
      console.log("index = ", index, "data", data);
      dialogEditFormVisible.value = true;
      // 新增
      if (type === "1") {
        console.log(title);
        // title.value = '新增菜单'
        console.log("点击新增");
      }
      // 编辑 / 修改
      if (type === "2") {
        console.log(title);
        // title.value = '编辑菜单'
        console.log("点击编辑");
      }
    };

    // 删除按钮
    const handleDelete = (type, index, data) => {
      console.log("index = ", index, "data", data);
      // 批量删除
      if (type === "1") {
        console.log("点击批量删除");
      }
      // 删除
      if (type === "2") {
        console.log("点击删除");
      }
    };

    // 上级菜单
    const handleNodeClick = (data) => {
      if (data) {
        console.log(data);
        // router.push({ path: data.link });
      }
    };

    // 新增 / 编辑 远程搜索事件
    const remoteMethod = () => {
      console.log("远程搜索");
    };

    // 新增 / 编辑 排序框change事件
    const handleChangeSort = (val) => {
      console.log(val);
    };

    return {
      tableData,
      handleEdit,
      handleDelete,
      dialogEditFormVisible,
      editForm,
      menuList,
      title,
      defaultProps,
      optionData,
      handleNodeClick,
      remoteMethod,
      icons,
      handleChangeSort,
    };
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

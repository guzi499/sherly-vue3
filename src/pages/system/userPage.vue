<!--
 * @Author: lihaoyu
 * @Date: 2022-04-18 09:52:49
 * @LastEditTime: 2022-06-14 01:36:18
 * @LastEditors: lihaoyu
 * @Description:
 * @FilePath: /sherly-vue3/src/pages/system/userPage.vue
-->
<template>
  <div class="user_container">
    <!-- 查询条件 -->
    <el-form :model="queryParams">
      <el-row>
        <el-form-item label="手机号: " style="margin-left: 20px">
          <el-input
            v-model="queryParams.phone"
            placeholder="请输入手机号"
          ></el-input>
        </el-form-item>
        <el-form-item label="姓名: " style="margin-left: 20px">
          <el-input
            v-model="queryParams.realName"
            placeholder="请输入姓名"
          ></el-input>
        </el-form-item>
        <el-form-item label="昵称: " style="margin-left: 20px">
          <el-input
            v-model="queryParams.nickname"
            placeholder="请输入昵称"
          ></el-input>
        </el-form-item>
        <el-form-item label="部门: " style="margin-left: 20px">
          <!--          <el-select-->
          <!--              ref="selectTree"-->
          <!--              v-model="queryParams.parentId"-->
          <!--              placeholder="请选择"-->
          <!--          >-->
          <!--            <el-option-->
          <!--                hidden-->
          <!--                :value="queryParams.parentId"-->
          <!--                :label="treeDatas"-->
          <!--            ></el-option>-->
          <!--            <el-tree-->
          <!--                :data="DepartmentList"-->
          <!--                :props="defaultProps"-->
          <!--                :expand-on-click-node="false"-->
          <!--                @node-click="nodeOnclick"-->
          <!--            />-->
          <!--          </el-select>-->
          <TreeSelect
            ref="selectTree"
            :treeList="DepartmentList"
            :defaultProps="defaultProps"
            @treeSelectList="treeSelectList"
          ></TreeSelect>
        </el-form-item>
        <el-form-item style="margin-left: 20px">
          <el-button type="primary" @click="handleQuery">搜索</el-button>
          <el-button @click="resetFn">重置</el-button>
        </el-form-item>
      </el-row>
    </el-form>
    <!-- 操作按钮 -->
    <el-row :gutter="5" type="flex" justify="end" style="margin-bottom: 12px">
      <el-col :span="1.5">
        <el-button type="primary" plain size="small" @click="handlexport()"
          >导出</el-button
        >
      </el-col>
      <el-col :span="1.5">
        <el-button type="primary" plain size="small" @click="handleEdit('1')"
          >新增</el-button
        >
      </el-col>
    </el-row>
    <!-- 用户表格 -->
    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="phone" label="手机号" width="180" />
      <el-table-column prop="realName" label="姓名" width="180" />
      <el-table-column prop="nickname" label="昵称" width="180" />
      <el-table-column prop="gender" label="性别" width="180">
        <template #default="scope">
          <span>{{ scope.row.gender === 1 ? "男" : "女" }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="departmentName" label="部门" width="180" />
      <el-table-column prop="enable" label="禁用状态" width="180">
        <template #default="scope">
          <el-switch
            v-model="scope.row.enable"
            class="switch"
            :active-value="1"
            :inactive-value="0"
            @change="handleChange(scope.row)"
          />
        </template>
      </el-table-column>
      <el-table-column prop="lastLoginTime" label="创建时间" width="180" />
      <el-table-column prop="name" label="操作" width="180">
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
    <!-- 分页 -->
    <!--    <Pagination v-model:current="queryParams.current" v-model:size="queryParams.size"-->
    <!--                v-show="total >= 1"-->
    <!--                :total="total" @getList="getList"></Pagination>-->
    <el-pagination
      style="margin-top: 20px"
      v-model:currentPage="queryParams.current"
      v-model:page-size="queryParams.size"
      :page-sizes="[10, 20, 30, 40]"
      :small="small"
      :disabled="disabled"
      layout="total, sizes, prev, pager, next, jumper"
      v-show="total >= 1"
      :total="total"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
    <!--    新增 / 修改弹框-->
    <el-dialog v-model="dialogFormVisible" :title="dialogTitle" width="40%">
      <el-form :model="form" style="padding-right: 60px">
        <el-form-item label="手机号" :label-width="formLabelWidth" prop="phone">
          <el-input v-model="form.phone"></el-input>
        </el-form-item>
        <el-form-item
          label="姓名"
          :label-width="formLabelWidth"
          prop="realName"
        >
          <el-input v-model="form.realName"></el-input>
        </el-form-item>
        <el-form-item
          label="昵称"
          :label-width="formLabelWidth"
          prop="nickname"
        >
          <el-input v-model="form.nickname"></el-input>
        </el-form-item>
        <el-form-item label="性别" :label-width="formLabelWidth" prop="gender">
          <el-input v-model="form.gender"></el-input>
        </el-form-item>
        <el-form-item label="部门" :label-width="formLabelWidth" prop="phone">
          <TreeSelect
            ref="selectTree"
            :treeList="DepartmentList"
            :defaultProps="defaultProps"
            @treeSelectList="treeSelectList"
          ></TreeSelect>
        </el-form-item>
        <el-form-item label="角色" :label-width="formLabelWidth" prop="roleIds">
          <el-select
            v-model="form.roleIds"
            multiple
            placeholder="选择角色"
            style="width: 100%"
          >
            <el-option
              v-for="item in rolesOptions"
              :key="item.roleId"
              :label="item.roleName"
              :value="item.roleId"
            />
          </el-select>
          <!--          <el-input v-model="form.roleIds"></el-input>-->
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
import { getCurrentInstance, ref, reactive, toRefs, onMounted } from "vue";
import { getDepartmentList, getRoleList } from "@/api/general.js";
import {
  pageUser,
  exportUser,
  updataUser,
  addUser,
  delMenu,
} from "@/api/system/user.js";
import { ElMessage, ElMessageBox } from "element-plus";

export default {
  setup() {
    const { proxy } = getCurrentInstance();
    onMounted(() => {
      getDepartmentListFn();
      getList();
      getRoleListFn();
    });

    // 获取角色下拉款数据
    const rolesOptions = ref([]);
    const getRoleListFn = () => {
      getRoleList().then((res) => {
        rolesOptions.value = res;
      });
    };

    const data = reactive({
      // 查询条件
      queryParams: {
        current: 1,
        size: 10,
      },
      // 部门下拉框配置项
      defaultProps: {
        children: "children",
        label: "departmentName",
      },
    });

    // 搜索按钮
    const handleQuery = () => {
      getList();
    };

    // 重置查询条件
    const reset = () => {
      data.queryParams = {
        current: 1,
        size: 10,
      };
    };

    // 重置弹出框表单
    const resetform = () => {
      form.value = {};
      proxy.$refs.selectTree.treeSelectData.parentId = null;
      proxy.$refs.selectTree.treeSelectData.treeDatas = "";
    };

    // 重置按钮
    const resetFn = () => {
      reset();
      proxy.$refs.selectTree.treeSelectData = {};
      getList();
    };

    // 选中弹框中的树形数据
    const treeSelectList = (e) => {
      if (type1.value !== "1" && type1.value !== "2") {
        data.queryParams.departmentId = e.departmentId;
      } else {
        form.value.departmentId = e.departmentId;
      }
    };

    // 分页数据
    const total = ref(400);
    const small = ref(false);
    const background = ref(false);
    const handleSizeChange = (val) => {
      console.log(`每页${val} 条`);
    };
    const handleCurrentChange = (val) => {
      console.log(`当前页: ${val}`);
    };
    const disabled = ref(false);

    // 定义表格数据
    const tableData = ref([]);
    // 获取用户信息列表
    const getList = () => {
      pageUser(data.queryParams).then((res) => {
        tableData.value = res.result;
        total.value = res.total;
      });
    };

    // 公共部门下拉框
    const DepartmentList = ref([]);
    // 获取公共部门下拉框数据
    const getDepartmentListFn = () => {
      getDepartmentList().then((res) => {
        DepartmentList.value = res;
      });
    };

    // 禁用按钮状态改变
    const handleChange = (data) => {
      console.log(data);
    };

    // 新增 / 修改按钮弹框数据
    // 控制弹框是否显示
    const dialogFormVisible = ref(false);
    const formLabelWidth = "120px";
    // 弹框标题
    const dialogTitle = ref("用户");
    // 弹框新增 / 修改弹框绑定数据
    const form = ref({});

    const type1 = ref("");
    // 新增 / 修改按钮
    const handleEdit = (type, index, data) => {
      resetform();
      type1.value = type;
      dialogFormVisible.value = true;
      if (type === "1") {
        dialogTitle.value = "用户新增";
      }
      if (type === "2") {
        dialogTitle.value = "用户更新";
        form.value = data;
        // form.value.realName = data.realName
        // form.value.nickname = data.nickname
        // form.value.gender = data.gender
        // form.value.departmentName = data.departmentName
        // form.value.phone = data.phone   // 用户角色
      }
    };

    // 确定按钮
    const handleOk = () => {
      if (type1.value === "1") {
        addUser(form.value)
          .then(() => {
            ElMessage({
              message: "新增成功！",
              type: "success",
            });
            getList();
            dialogFormVisible.value = false;
          })
          .catch(() => {
            ElMessage.error("新增失败");
          });
      } else {
        delete form.value.departmentName;
        delete form.value.createTime;
        delete form.value.enable;
        updataUser(form.value)
          .then(() => {
            ElMessage({
              message: "修改成功！",
              type: "success",
            });
            getList();
            dialogFormVisible.value = false;
          })
          .catch(() => {
            ElMessage.error("修改失败");
          });
      }
    };

    // 取消按钮
    const handleCancle = () => {
      dialogFormVisible.value = false;
    };

    // 删除按钮
    const handleDelete = (type, index, data) => {
      if (type === "2") {
        ElMessageBox.confirm("确定删除当前用户?", "是否删除", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        })
          .then(() => {
            delMenu(data.userId).then(() => {
              ElMessage({
                message: "删除成功！",
                type: "success",
              });
            });
            getList();
          })
          .catch(() => {
            ElMessage({
              type: "info",
              message: "取消删除操作",
            });
          });
      }
    };

    // 用户导出
    const handlexport = () => {
      exportUser();
    };

    return {
      ...toRefs(data),
      total,
      small,
      background,
      disabled,
      tableData,
      DepartmentList,
      handleChange,
      dialogTitle,
      formLabelWidth,
      dialogFormVisible,
      form,
      handleOk,
      handleCancle,
      handleEdit,
      handleDelete,
      treeSelectList,
      handleQuery,
      resetFn,
      handleSizeChange,
      handleCurrentChange,
      handlexport,
      rolesOptions,
    };
  },
};
</script>

<style lang="scss" scoped>
.user_container {
  padding: 16px;
}
</style>

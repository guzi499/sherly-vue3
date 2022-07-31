<!--
 * @Author: 陈雪丽
 * @Date: 2022-07-31
-->
<template>
  <div class="sherly-page-wrapper">
    <!-- 查询条件 -->
    <el-form :model="queryParams" :inline="true" label-width="80px">
      <el-form-item label="手机号">
        <el-input
            style="width: 215px"
            clearable
            v-model="queryParams.phone"
            placeholder="请输入手机号"
        ></el-input>
      </el-form-item>
      <el-form-item label="姓名">
        <el-input
            clearable
            style="width: 215px"
            v-model="queryParams.realName"
            placeholder="请输入姓名"
        ></el-input>
      </el-form-item>
      <el-form-item label="昵称">
        <el-input
            clearable
            style="width: 215px"
            v-model="queryParams.nickname"
            placeholder="请输入昵称"
        ></el-input>
      </el-form-item>
      <el-form-item label="部门">
        <el-select
            collapse-tags
            style="width: 215px"
            multiple
            ref="selectTree"
            v-model="treeSelectData.treeDate"
            placeholder="请选择"
            clearable
        >
          <el-option
              hidden
              :value="treeSelectData.parentId"
              :label="treeSelectData.treeDate"
          ></el-option>
          <el-tree
              ref="checkTree"
              node-key="departmentId"
              default-expand-all
              show-checkbox
              highlight-current
              :data="DepartmentList"
              :props="defaultProps"
              expand-on-click-node
              @check="nodeCheck"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="邮箱">
        <el-input
            clearable
            style="width: 215px"
            v-model="queryParams.email"
            placeholder="请输入邮箱"
        ></el-input>
      </el-form-item>
      <el-form-item label="禁用状态">
        <el-select v-model="queryParams.enable" placeholder="请选择禁用状态" clearable style="width: 215px">
          <el-option label="启用" :value="1"></el-option>
          <el-option label="禁用" :value="0"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="创建时间">
        <el-date-picker
            clearable
            style="width: 355px"
            v-model="datetimerange"
            type="datetimerange"
            range-separator="至"
            format="YYYY-MM-DD HH:mm:ss"
            value-format="YYYY-MM-DD HH:mm:ss"
            start-placeholder="开始日期"
            end-placeholder="结束日期">
        </el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="Search" @click="handleSearch">搜索</el-button>
        <el-button icon="Refresh" @click="handleReset">重置</el-button>
      </el-form-item>
    </el-form>
    <!-- 操作按钮 -->
    <el-row :gutter="5" type="flex" justify="end" style="margin-bottom: 12px">
      <el-col :span="1.5">
        <el-button type="primary" size="small" @click="handleExport()"  v-permission="['user:list_export']"
        >导出
        </el-button
        >
      </el-col>
      <el-col :span="1.5">
        <el-button type="primary" size="small" @click="handleEdit('1')" v-permission="['user:save_one']"
        >新增
        </el-button
        >
      </el-col>
    </el-row>
    <!-- 用户表格 -->
    <el-table v-loading="loading" :data="tableData" style="width: 100%">
      <el-table-column prop="phone" label="手机号" width="180" align="center"/>
      <el-table-column prop="realName" label="姓名" align="center"/>
      <el-table-column prop="nickname" label="昵称" align="center"/>
      <el-table-column prop="gender" label="性别" align="center">
        <template #default="scope">
          <span>{{ scope.row.gender === 1 ? "男" : "女" }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="departmentName" label="部门" align="center"/>
      <el-table-column prop="email" label="邮箱" align="center"/>
      <el-table-column prop="enable" label="禁用状态" align="center">
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
      <el-table-column prop="createTime" label="创建时间" width="180" align="center"/>
      <el-table-column prop="name" label="操作" width="180" align="center">
        <template #default="scope">
          <el-link type="primary" @click="handleEdit('2', scope.$index, scope.row)" v-permission="['user:update_one']">修改</el-link>
          <el-popconfirm
              title="确定删除本条数据?"
              @confirm="handleDelete(scope.row)"
          >
            <template #reference>
              <el-link type="danger" v-permission="['user:remove_one']" v-show="scope.row.userId !== 1">删除</el-link>
            </template>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
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
    <el-dialog v-if="dialogFormVisible" v-model="dialogFormVisible" :title="dialogTitle" width="40%" >
      <el-form :model="form" :rules="formRules" ref="ruleForm" style="padding-right: 60px">
        <el-form-item label="手机号" :label-width="formLabelWidth" prop="phone" v-if="type1 === '1' ">
          <el-input v-model="form.phone" :disabled="type1 === '2'"></el-input>
        </el-form-item>
        <el-form-item label="手机号" :label-width="formLabelWidth" prop="phone1" v-if="type1 === '2' ">
          <el-input v-model="form.phone" :disabled="type1 === '2'"></el-input>
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
            v-if="type1 === '2'"
            :label-width="formLabelWidth"
            prop="nickname"
        >
          <el-input v-model="form.nickname" :disabled="type1 === '2'"></el-input>
        </el-form-item>
        <el-form-item label="性别" :label-width="formLabelWidth" prop="gender">
          <el-radio-group v-model="form.gender">
            <el-radio :label="1" size="large">男</el-radio>
            <el-radio :label="0" size="large">女</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="部门" :label-width="formLabelWidth" prop="departmentId">
          <el-select
              ref="selectTree1"
              v-model="form.departmentId"
              placeholder="请选择"
          >
            <el-option
                hidden
                :value="form.departmentId"
                :label="form.departmentName"
            ></el-option>
            <el-tree
                :data="DepartmentList"
                :props="defaultProps"
                :expand-on-click-node="false"
                @node-click="nodeOnclick2"
            />
          </el-select>
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
          <el-button type="primary" @click="handleOk('ruleForm')">确定</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import {getCurrentInstance, ref, reactive, toRefs, onMounted, watch} from "vue";
import {listAll} from "@/api/system/role.js";
import { getDepartmentListTree } from "@/api/system/department.js";
import {
  pageUser,
  exportUser,
  updataUser,
  addUser,
  delMenu,
  disableUser,
  getUserId
} from "@/api/system/user.js";
import {ElMessage} from "element-plus";

export default {
  setup() {
    const { proxy } = getCurrentInstance();
    const loading = ref(false)
    onMounted(() => {
      getDepartmentListFn();
      getList();
      getRoleListFn();
    });

    // 获取角色下拉款数据
    const rolesOptions = ref([]);
    const getRoleListFn = () => {
      listAll().then((res) => {
        rolesOptions.value = res;
      });
    };

    const data = reactive({
      // 查询条件
      queryParams: {
        current: 1,
        size: 10
      },
      // 部门下拉框配置项
      defaultProps: {
        children: "children",
        label: "departmentName",
      },
    });

    const datetimerange = ref([])

    // 搜索按钮
    const handleSearch = () => {
      data.queryParams.current = 1
      if (datetimerange.value.length > 0) {
        data.queryParams.beginTime = datetimerange.value[0]
        data.queryParams.endTime = datetimerange.value[1]
      }
      getList();
    };

    // 重置查询条件
    const reset = () => {
      datetimerange.value = []
      data.queryParams = {
        current: 1,
        size: 10
      };
    };

    // 重置按钮
    const handleReset = () => {
      reset();
      treeSelectData.parentId = []
      treeSelectData.treeDate = []
      getList();
    };

    // 分页数据
    const total = ref(400);
    const small = ref(false);
    const background = ref(false);
    const handleSizeChange = (val) => {
      console.log(`每页${val} 条`);
      data.queryParams.size = val
      getList()
    };
    const handleCurrentChange = (val) => {
      console.log(`当前页: ${val}`);
      data.queryParams.current = val
      getList()
    };
    const disabled = ref(false);

    // 定义表格数据
    const tableData = ref([]);
    // 获取用户信息列表
    const getList = () => {
      loading.value = true
      pageUser(data.queryParams).then((res) => {
        tableData.value = res.result;
        total.value = res.total;
        setTimeout(() => {
          loading.value = false
        }, 100)
      })
    };

    // 公共部门下拉框
    const DepartmentList = ref([]);
    // 获取公共部门下拉框数据
    const getDepartmentListFn = () => {
      getDepartmentListTree().then((res) => {
        DepartmentList.value = res;
      });
    };

    // 禁用按钮状态改变
    const handleChange = (data) => {
      disableUser(data.userId, data.enable).then(() => {
        if(data.enable === 1) {
          ElMessage({
            message: '禁用状态已开启',
            type: 'success',
          })
        } else {
          ElMessage({
            message: '禁用状态已关闭',
            type: 'success',
          })
        }
      }).catch(() =>{
        getList()
      })
    };

    // 新增 / 修改按钮弹框数据
    // 控制弹框是否显示
    const dialogFormVisible = ref(false);
    const formLabelWidth = "120px";
    // 弹框标题
    const dialogTitle = ref("用户");
    // 弹框新增 / 修改弹框绑定数据
    const form = ref({});
    // 重置弹出框表单
    const resetForm = () => {
      form.value = {};
    };

    const type1 = ref("");
    // 新增 / 修改按钮
    const handleEdit = (type, index, data) => {
      resetForm()
      type1.value = type;
      if (type === "1") {
        dialogTitle.value = "用户新增";
        dialogFormVisible.value = true;
        proxy.$nextTick(() => {
          proxy.$refs.ruleForm.resetFields()
        })
      }
      if (type === "2") {
        dialogTitle.value = "用户更新";
        getUserId(data.userId).then((res) => {
          form.value = res;
          form.value.departmentName = data.departmentName
          dialogFormVisible.value = true;
        })
      }
    };

    const treeSelectData = reactive({
      parentId: [],
      treeDate: [],
    });

    const nodeCheck = (obj, data1) => {
      treeSelectData.parentId = data1.checkedNodes.map(item => {
        return item.departmentId
      })
      treeSelectData.treeDate = data1.checkedNodes.map(item => {
        return item.departmentName
      })
      data.queryParams.departmentIds = treeSelectData.parentId.join(',')
    };

    // 部门选择
    const nodeOnclick2 = (e) => {
      form.value.departmentId = e.departmentId;
      form.value.departmentName = e.departmentName;
      proxy.$refs.selectTree1.blur();
    };

    // 表格添加校验效果
    const formRules = {
      phone: [
        { required: true, message: '请输入手机号码', trigger: 'blur' },
        { min: 11, max: 11, message: '请输入11位手机号码', trigger: 'blur' },
        {
          pattern: /^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/,
          message: "请输入正确的手机号码",
        }
      ],
      realName: [
        {required: true, message: '请输入姓名', trigger: 'blur'}
      ],
      gender: [
        {required: true, message: '请选择性别', trigger: 'change'}
      ],
      departmentId: [
        {required: true, message: '请选择部门', trigger: 'change'}
      ],
      roleIds: [
        {required: true, message: '请选择角色', trigger: 'change'}
      ]
    }

    // 确定按钮
    const handleOk = (formName) => {
      proxy.$refs[formName].validate((valid) => {
        if (valid) {
          if (type1.value === "1") {
            delete form.value.departmentName;
            addUser(form.value)
                .then(() => {
                  ElMessage({
                    message: "新增成功！",
                    type: "success",
                  });
                  data.queryParams.current = 1
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
            delete form.value.email;
            delete form.value.nickname;
            delete form.value.phone;
            updataUser(form.value)
                .then(() => {
                  ElMessage({
                    message: "修改成功！",
                    type: "success",
                  });
                  data.queryParams.current = 1
                  getList();
                  dialogFormVisible.value = false;
                })
                .catch(() => {
                  ElMessage.error("修改失败");
                });
          }
        } else {
          return false;
        }
      });

    };

    // 取消按钮
    const handleCancle = () => {
      dialogFormVisible.value = false;
    };

    // 删除按钮
    const handleDelete = (data1) => {
      delMenu(data1.userId).then(() => {
        ElMessage({
          message: "删除成功！",
          type: "success",
        });
        data.queryParams.current = 1
        getList();
      })

    };

    // 用户导出
    const handleExport = () => {
      exportUser();
    };

    watch(
        () => treeSelectData.treeDate, (val) => {
          console.log(val)
          if (val.length === 0) {
            console.log(val)
            delete data.queryParams.departmentIds
            proxy.$refs.checkTree.setCheckedKeys([]);
          }
        }, {
          deep: true
        }
    );

    return {
      loading,
      formRules,
      type1,
      ...toRefs(data),
      total,
      small,
      background,
      disabled,
      tableData,
      DepartmentList,
      dialogTitle,
      formLabelWidth,
      dialogFormVisible,
      form,
      treeSelectData,
      handleChange,
      nodeCheck,
      nodeOnclick2,
      handleOk,
      handleCancle,
      handleEdit,
      handleDelete,
      handleSearch,
      handleReset,
      handleSizeChange,
      handleCurrentChange,
      handleExport,
      rolesOptions,
      datetimerange
    };
  },
};
</script>

<style lang="scss" scoped>
:deep(.el-form-item) {
  margin-right: 10px;
}
</style>

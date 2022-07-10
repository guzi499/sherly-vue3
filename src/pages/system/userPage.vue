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
    <el-form :model="queryParams" :inline="true">
      <el-form-item label="手机号: ">
        <el-input
            clearable
            v-model="queryParams.phone"
            placeholder="请输入手机号"
        ></el-input>
      </el-form-item>
      <el-form-item label="姓名: ">
        <el-input
            clearable
            v-model="queryParams.realName"
            placeholder="请输入姓名"
        ></el-input>
      </el-form-item>
      <el-form-item label="昵称: ">
        <el-input
            clearable
            v-model="queryParams.nickname"
            placeholder="请输入昵称"
        ></el-input>
      </el-form-item>
      <el-form-item label="部门: ">
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
      <el-form-item>
        <el-button type="primary" icon="Search" @click="handleSearch">搜索</el-button>
        <el-button icon="Refresh" @click="handleReset">重置</el-button>
      </el-form-item>
    </el-form>
    <!-- 操作按钮 -->
    <el-row :gutter="5" type="flex" justify="end" style="margin-bottom: 12px">
      <el-col :span="1.5">
        <el-button type="warning" plain size="small" @click="handlexport()"
        >导出
        </el-button
        >
      </el-col>
      <el-col :span="1.5">
        <el-button type="success" plain size="small" @click="handleEdit('1')"
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
          <a href="javascript:;" title="修改">
            <Edit style="width: 1em; height: 1em; margin-right: 8px"
                  @click="handleEdit('2', scope.$index, scope.row)"/>
          </a>
          <a href="javascript:;" title="删除">
            <Delete style="width: 1em; height: 1em; margin-right: 8px"
                    @click="handleDelete('2', scope.$index, scope.row)"/>
          </a>
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
    <el-dialog v-model="dialogFormVisible" :title="dialogTitle" width="40%">
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
          <!--          <el-input v-model="form.gender"></el-input>-->
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
          <!--          <TreeSelect-->
          <!--            ref="selectTree"-->
          <!--            :treeList="DepartmentList"-->
          <!--            :defaultProps="defaultProps"-->
          <!--            @treeSelectList="treeSelectList"-->
          <!--          ></TreeSelect>-->
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
import { getCurrentInstance, ref, reactive, toRefs, onMounted } from "vue";
import { getDepartmentList, getRoleList } from "@/api/general.js";
import {
  pageUser,
  exportUser,
  updataUser,
  addUser,
  delMenu,
  disableUser,
  getUserId
} from "@/api/system/user.js";
import { ElMessage, ElMessageBox } from "element-plus";

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
    const handleSearch = () => {
      data.queryParams.current = 1
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
      proxy.$refs.selectTree.treeSelectData = {
        parentId: null,
        treeDatas: ""
      };
      // proxy.$refs.ruleForm.resetFields();
     setTimeout(() => {
       proxy.$refs.ruleForm.resetFields()
     }, 50)
    };

    // 重置按钮
    const handleReset = () => {
      reset();
      proxy.$refs.selectTree.treeSelectData = {
        parentId: null,
        treeDatas: ""
      };
      getList();
    };

    // 选中弹框中的树形数据
    const treeSelectList = (e) => {
      data.queryParams.departmentId = e.departmentId;
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

    const type1 = ref("");
    // 新增 / 修改按钮
    const handleEdit = (type, index, data) => {
      console.log('新增 / 修改', data)
      resetform();
      type1.value = type;
      if (type === "1") {
        dialogTitle.value = "用户新增";
        dialogFormVisible.value = true;
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

    // 部门选择
    const nodeOnclick2 = (e) => {
      form.value.departmentId = e.departmentId;
      form.value.departmentName = e.departmentName;
      proxy.$refs.selectTree1.blur();
    };

    // 自定义校验手机号
    // const validatePass = (rule, value, callback) => {
    //   const reg = /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/g
    //   if (!value) {
    //     return callback(new Error('手机号不能为空'));
    //   } else {
    //     if (!Number(value)) {
    //       callback(new Error('请输入数字值'));
    //     }
    //     else {
    //       console.log(!reg.test(value))
    //       if (!reg.test(value)) {
    //         console.log(1111111)
    //         callback(new Error('不合法手机号!!!'));
    //       } else {
    //         console.log(22222222)
    //         callback();
    //       }
    //     }
    //   }
    // }

    // 表格添加校验效果
    const formRules = {
      // phone: [
      //   {validator: validatePass, trigger: 'blur'}
      // ],
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
          console.log('error submit!!');
          return false;
        }
      });

    };

    // 取消按钮
    const handleCancle = () => {
      dialogFormVisible.value = false;
    };

    // 删除按钮
    const handleDelete = (type, index, data1) => {
      if (type === "2") {
        ElMessageBox.confirm("确定删除当前用户?", "是否删除", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        })
            .then(() => {
              delMenu(data1.userId).then(() => {
                ElMessage({
                  message: "删除成功！",
                  type: "success",
                });
                data.queryParams.current = 1
                getList();
              })
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
      handleChange,
      dialogTitle,
      formLabelWidth,
      dialogFormVisible,
      form,
      nodeOnclick2,
      handleOk,
      handleCancle,
      handleEdit,
      handleDelete,
      treeSelectList,
      handleSearch,
      handleReset,
      handleSizeChange,
      handleCurrentChange,
      handlexport,
      rolesOptions,
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

.user_container {
  padding: 16px;
}
</style>

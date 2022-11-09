<!--
 * @author: 陈雪丽
 * @date: 2022-07-31
-->
<template>
  <div class="sherly-page-wrapper">
    <!-- 查询条件 -->
    <el-form :model="queryForm" :inline="true" label-width="80px">
      <el-form-item label="错误代码">
        <el-input
            style="width: 215px"
            clearable
            v-model="queryForm.errorCode"
            placeholder="请输入错误代码"
        ></el-input>
      </el-form-item>
      <el-form-item label="错误信息">
        <el-input
            clearable
            style="width: 215px"
            v-model="queryForm.message"
            placeholder="请输入错误信息"
        ></el-input>
      </el-form-item>
      <el-form-item label="模块代码">
        <el-select
          collapse-tags
          style="width: 215px"
          ref="selectTree"
          placeholder="请选择模块名称"
          v-model="queryForm.moduleCode"
          clearable
        >
          <el-option
              hidden
            :value="queryForm.moduleId"
            :label="queryForm.moduleCode"
          ></el-option>
          <el-tree
            ref="queryTree"
            node-key="moduleId"
            highlight-current
            :data="ModuleList"
            :props="defaultProps"
            expand-on-click-node
            @node-click="(obj)=> {
              queryForm.moduleId=obj.moduleId
              queryForm.moduleCode=obj.moduleCode
              $refs.selectTree.blur()
            }"
          />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="Search" @click="handleSearch"
        >搜索
        </el-button
        >
        <el-button icon="Refresh" @click="handleReset">重置</el-button>
      </el-form-item>
    </el-form>
    <SherlyTable
        :loading="loading"
        :tableData="tableData.result"
        style="width: 100%"
        showPagination
        @handleCurrentChange="handleCurrentChange"
        @handleSizeChange="handleSizeChange"
        :pagination-total="tableData.total"
        :pagination-current="queryForm.current"
        :pagination-size="queryForm.size"
    >
      <template #header>
        <el-row :gutter="5" type="flex" justify="end" style="margin-bottom: 12px">
          <el-col :span="1.5">
            <el-button
                type="primary"
                size="small"
                @click="handleEdit('1')"
                v-permission="['user:save_one']"
            >新增
            </el-button>
          </el-col>
        </el-row>
      </template>
      <template #table>
        <el-table-column prop="errorCode" label="错误代码" width="180" align="center"/>
        <el-table-column prop="message" label="错误信息" align="center"/>
        <el-table-column prop="description" label="描述" align="center"/>
        <el-table-column prop="moduleCode" label="模块代码" align="center"/>
        <el-table-column
            prop="createTime"
            label="创建时间"
            width="180"
            align="center"
        />
        <el-table-column prop="name" label="操作" width="180" align="center">
          <template #default="scope">
            <el-link
                type="primary"
                @click="handleEdit('2', scope.$index, scope.row)"
                v-permission="['user:update_one']"
            >修改
            </el-link
            >
            <el-popconfirm
                title="确定删除本条数据?"
                @confirm="handleDelete(scope.row)"
            >
              <template #reference>
                <el-link
                    type="danger"
                    v-permission="['user:remove_one']"
                    v-show="scope.row.moduleId !== 1"
                >删除
                </el-link
                >
              </template>
            </el-popconfirm>
          </template>
        </el-table-column>
      </template>
    </SherlyTable>
    <el-dialog
        v-if="dialogFormVisible"
        v-model="dialogFormVisible"
        :title="dialogTitle"
        width="40%"
    >
      <el-form
          :model="form"
          :rules="formRules"
          ref="ruleForm"
          style="padding-right: 60px"
      >
        <el-form-item
            label="错误代码"
            :label-width="formLabelWidth"
            prop="errorCode"
        >
          <el-input v-model="form.errorCode" placeholder="请输入错误代码" clearable></el-input>
        </el-form-item>
        <el-form-item
          label="错误信息"
          :label-width="formLabelWidth"
          prop="message"
        >
          <el-input v-model="form.message" placeholder="请输入错误信息" clearable></el-input>
        </el-form-item>
        <el-form-item
          label="描述"
          :label-width="formLabelWidth"
          prop="description"
        >
          <el-input v-model="form.description" placeholder="请输入错误描述" clearable></el-input>
        </el-form-item>
        <el-form-item
          label="模块代码"
          :label-width="formLabelWidth"
          prop="moduleCode"
        >
          <el-select
              style="width: 100%"
              collapse-tags
              ref="selectTree1"
              placeholder="请选择"
              v-model="form.moduleCode"
              clearable
          >
            <el-option
                hidden
                :value="form.moduleId"
                :label="form.moduleCode"
            ></el-option>
              <el-tree
                ref="queryTree"
                node-key="moduleId"
                highlight-current
                :data="ModuleList"
                :props="defaultProps"
                expand-on-click-node
                @node-click="(obj)=> {
                  form.moduleId=obj.moduleId
                  form.moduleCode=obj.moduleCode
                  $refs.selectTree1.blur()
                }"
              />
          </el-select>
        </el-form-item>
        <el-form-item :label-width="formLabelWidth">
          <el-button @click="dialogFormVisible = false;">取消</el-button>
          <el-button type="primary" @click="handleOk('ruleForm')"
            >确定</el-button
          >
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import {
  getCurrentInstance,
  ref,
  reactive,
  onMounted
} from "vue";
import { roleListAll } from "@/api/system/role.js";
import { moduleListTree } from "@/api/system/module_manage.js";
import {
  errorListPage,
  errorCodeUpdateOne,
  errorCodeSaveOne,
  errorCodeRemoveOne
} from "@/api/system/error_manage.js";
import { ElMessage } from "element-plus";

export default {
  setup() {
    const { proxy } = getCurrentInstance();
    const loading = ref(false);
    onMounted(() => {
      getModuleListFn();
      getList();
      getRoleListFn();
    });

    // 获取角色下拉款数据
    const rolesOptions = ref([]);
    const getRoleListFn = () => {
      roleListAll().then((res) => {
        rolesOptions.value = res;
      });
    };

    // 查询条件
    const queryForm = reactive({
      current: 1,
      size: 10,
    })

    const defaultProps = reactive({
      children: "children",
      label: "moduleCode",
    })

    const datetimerange = ref([]);
    // 搜索按钮
    const handleSearch = () => {
      queryForm.current = 1;
      !queryForm.moduleCode ? delete queryForm.moduleId : ''
      getList();
    };

    // 重置查询条件
    const reset = () => {
      Object.keys(queryForm).forEach((key) => {
        delete queryForm[key]
      })
      queryForm.current = 1
      queryForm.size = 10
    };

    // 重置按钮
    const handleReset = () => {
      reset();
      getList();
    };

    // 分页
    const total = ref(400);
    const small = ref(false);
    const background = ref(false);
    const handleSizeChange = (val) => {
      queryForm.size = val;
      getList();
    };
    const handleCurrentChange = (val) => {
      queryForm.current = val;
      getList();
    };
    const disabled = ref(false);

    // 表格列表
    const tableData = reactive([]);
    // 获取错误信息列表
    const getList = async () => {
      loading.value = true;
      const data = await errorListPage(queryForm)
      Object.keys(data).forEach((key)  => {
        tableData[key] = data[key]
      })
      setTimeout(() => {
        loading.value = false;
      }, 100);
    };

    // 公共部门下拉框
    const ModuleList = ref([]);
    // 获取公共部门下拉框数据
    const getModuleListFn = () => {
      moduleListTree().then((res) => {
        ModuleList.value = res;
      });
    };

    // 新增 / 修改弹框
    const dialogFormVisible = ref(false);
    const formLabelWidth = "120px";
    const dialogTitle = ref("错误");
    const form = ref({});
    const formRules = {
      errorCode: [
        {required: true, message: "请输入错误代码", trigger: "blur"}
      ],
      message: [{required: true, message: "请输入错误信息", trigger: "blur"}],
      moduleCode: [
        {required: true, message: "请选择模块代码", trigger: "change"},
      ]
    };
    const type1 = ref("");
    // 新增 / 修改按钮
    const handleEdit = (type, index, data) => {
      form.value = {};
      type1.value = type;
      if (type === "1") {
        dialogTitle.value = "错误码新增";
        dialogFormVisible.value = true;
        proxy.$nextTick(() => {
          proxy.$refs.ruleForm.resetFields();
        });
      }
      if (type === "2") {
        dialogTitle.value = "错误码更新";
          form.value = data;
          // form.value.departmentName = data.departmentName;
          dialogFormVisible.value = true;
      }
    };

    const treeSelectData = reactive({
      moduleId: '',
      moduleCode: '',
    });

    // 部门选择
    const nodeOnclick2 = (e) => {
      form.value.moduleId = e.moduleId;
      form.value.moduleCode = e.moduleCode;
      proxy.$refs.selectTree1.blur();
    };

    // 确定按钮
    const handleOk = (formName) => {
      proxy.$refs[formName].validate((valid) => {
        if (valid) {
          if (type1.value === "1") {
            delete form.value.moduleCode;
            errorCodeSaveOne(form.value)
              .then(() => {
                ElMessage({
                  message: "新增成功！",
                  type: "success",
                });
                queryForm.current = 1;
                getList();
              })
              .catch(() => {
                ElMessage.error("新增失败");
              });
            dialogFormVisible.value = false;
          } else {
            delete form.value.moduleCode;
            errorCodeUpdateOne(form.value)
              .then(() => {
                ElMessage({
                  message: "修改成功！",
                  type: "success",
                });
                queryForm.current = 1;
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

    // 删除按钮
    const handleDelete = (data1) => {
      errorCodeRemoveOne(data1.moduleId).then(() => {
        ElMessage({
          message: "删除成功！",
          type: "success",
        });
        queryForm.current = 1;
        getList();
      });
    };

    return {
      loading,
      formRules,
      type1,
      queryForm,
      defaultProps,
      total,
      small,
      background,
      disabled,
      tableData,
      ModuleList,
      dialogTitle,
      formLabelWidth,
      dialogFormVisible,
      form,
      treeSelectData,
      rolesOptions,
      datetimerange,
      nodeOnclick2,
      handleOk,
      handleEdit,
      handleDelete,
      handleSearch,
      handleReset,
      handleSizeChange,
      handleCurrentChange
    };
  },
};
</script>

<style lang="scss" scoped>
:deep(.el-form-item) {
  margin-right: 10px;
}
</style>

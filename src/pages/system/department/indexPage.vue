<template>
  <div class="sherly-page-wrapper">
    <!-- 菜单搜索框 -->
    <el-form :model="queryForm" :inline="true" label-width="80px">
      <el-form-item label="部门名称" prop="departmentName">
        <el-input v-model="queryForm.departmentName" placeholder="请输入部门名称" style="width: 215px" clearable/>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="Search" @click="handleSearch">搜索</el-button>
        <el-button icon="Refresh" @click="handleReset">重置</el-button>
      </el-form-item>
    </el-form>
    <!-- 操作按钮 -->
    <el-row :gutter="5" type="flex" justify="end">
      <el-col :span="1.5">
        <el-button type="info" size="small" @click="handleUp">
          展开 / 折叠
        </el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button type="primary" size="small" @click="handleEdit('1')" v-permission="['department:save_one']"
        >新增
        </el-button>
      </el-col>
    </el-row>
    <!-- 表格菜单 -->
    <el-table
        v-if="refreshTree"
        v-loading=loading
        :data="departmentList"
        style="width: 100%; margin-bottom: 20px"
        row-key="departmentId"
        lazy
        :default-expand-all="isUp"
        :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
    >
      <el-table-column label="部门名称" prop="departmentName"/>
      <el-table-column
        label="描述"
        prop="description"
        width="230"
        align="center"
      />
      <el-table-column label="排序" prop="sort" width="150" align="center" />
      <el-table-column label="创建时间" prop="createTime" align="center" />
      <el-table-column label="操作" align="center" width="250">
        <template #default="scope">
          <el-link type="primary" @click="handleEdit('2', scope.$index, scope.row)" v-permission="['department:update_one']" v-show="scope.row.departmentId !== 1">修改</el-link>
          <el-popconfirm
              title="确定删除本条数据?"
              @confirm="handleDelete(scope.row)"
          >
            <template #reference>
              <el-link type="danger" v-permission="['department:remove_one']" v-show="scope.row.departmentId !== 1">删除</el-link>
            </template>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
    <!-- 新增 / 编辑 弹框 -->
    <el-dialog v-model="dialogFormVisible" :title="dialogTitle" width="600px">
      <el-form :model="form" :rules="formRules" ref="ruleFormRef">
        <el-form-item
          label="父级部门"
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
              :label="treeData"
            ></el-option>
            <el-tree
              :data="departmentListSelect"
              :props="defaultProps"
              :expand-on-click-node="false"
              @node-click="nodeOnclick"
            />
          </el-select>
        </el-form-item>
        <el-form-item
          label="部门名称"
          :label-width="formLabelWidth"
          prop="departmentName"
        >
          <el-input v-model="form.departmentName" placeholder="请输入部门名称"></el-input>
        </el-form-item>
        <el-form-item
          label="描述"
          :label-width="formLabelWidth"
          prop="description"
        >
          <el-input v-model="form.description" placeholder="描述"></el-input>
        </el-form-item>
        <el-form-item label="排序" :label-width="formLabelWidth" prop="sort">
          <el-input-number
            v-model="form.sort"
            :min="1"
            controls-position="right"
            size="large"
            placeholder="仅限输入数字"
          />
        </el-form-item>
        <el-form-item :label-width="formLabelWidth">
          <el-button @click="handleCancel">取消</el-button>
          <el-button type="primary" @click="handleOk('ruleFormRef')">确定</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import {ElMessage} from "element-plus";
import {reactive, ref, onMounted, getCurrentInstance} from "vue";
import {
  departmentListTree,
  departmentSaveOne,
  departmentRemoveOne,
  departmentUpdateOne,
} from "@/api/system/department";
export default {
  name: "departmentPage",
  setup() {
    onMounted(() => {
      getList();
      getDepartmentListFn();
    });
    const loading = ref(false)
    const {proxy} = getCurrentInstance();

    // 部门查询条件
    const queryForm = reactive({
      departmentName: ''
    });

    // 根据查询条件搜索
    const handleSearch = () => {
      departmentList.value = handleTreeData(
          departmentList.value,
          queryForm.departmentName
      );
    };

    const isUp = ref(true)
    const refreshTree = ref(true)
    // 折叠展开按钮
    const handleUp = () => {
      refreshTree.value = false
      isUp.value ? isUp.value = false : isUp.value = true
      proxy.$nextTick(() => {
        refreshTree.value = true
      })
    }

    // 处理展示数据
    const handleTreeData = (list, value) => {
      let arr = [];
      const handleData = (list, value) => {
        list.forEach((item) => {
          // 判断当前层级是否存在符合条件的字段, 如果没有， 则判断该项是否存在children
          if (item.departmentName.indexOf(value) == -1) {
            // 若存在children,则重新调用
            if (item.children.length > 0) {
              handleData(item.children, value);
            }
          } else {
            arr.push(item);
          }
        });
      };
      handleData(list, value);
      return arr;
    };

    // 重置搜索框
    const handleReset = () => {
      queryForm.departmentName = ''
      getList();
    };

    // 查询部门列表信息
    const departmentList = ref([]);
    const getList = () => {
      loading.value = true;
      departmentListTree(queryForm).then((res) => {
        departmentList.value = res;
        setTimeout(() => {
          loading.value = false;
        }, 100)
      });
      getDepartmentListFn();
    };

    // 查询部门下拉框列表信息
    const departmentListSelect = ref([]);
    const getDepartmentListFn = () => {
      departmentListTree().then((res) => {
        departmentListSelect.value = res;
      });
    };

    // 判断弹框类型 - 新增/修改
    const dialogType = ref("1");
    const dialogFormVisible = ref(false);
    const formLabelWidth = "140px";
    const dialogTitle = ref("菜单");
    const treeData = ref("");
    const form = ref({});
    const formRules = reactive({
      parentId: [
        {required: true, message: '请选择父级部门', trigger: 'change'}
      ],
      departmentName: [
        {required: true, message: '请输入部门名称', trigger: 'blur'}
      ],
      sort: [
        {required: true, message: '请输入排序', trigger: 'blur'}
      ]
    })
    const defaultProps = {
      children: "children",
      label: "departmentName",
    };

    // 重置表单
    const reset = () => {
      form.value = {};
      treeData.value = "";
    };

    // 选中弹框中的树形数据
    const nodeOnclick = (e) => {
      form.value.parentId = e.departmentId;
      // treeData.value = e.menuId;
      treeData.value = e.departmentName;
      proxy.$refs.selectTree.blur();
    };

    // 点击修改 - 新增按钮
    const handleEdit = (type, index, data) => {
      reset();
      dialogFormVisible.value = true;
      if (type === "1") {
        dialogType.value = type;
        dialogTitle.value = "部门新增";
      }
      if (type === "2") {
        dialogType.value = type;
        forEachDepartmentList(departmentList.value, data);
        dialogTitle.value = "部门更新";
        form.value = JSON.parse(JSON.stringify(data));
      }
    };

    // 处理树形数据回显
    const forEachDepartmentList = (list, data) => {
      list.forEach((item) => {
        if (data.parentId === 0) {
          return (treeData.value = "总部");
        } else {
          const _obj = JSON.parse(JSON.stringify(item));
          if (_obj.departmentId === data.parentId) {
            return (treeData.value = _obj.departmentName);
          } else {
            if (_obj.children) {
              forEachDepartmentList(_obj.children, data);
            }
          }
        }
      });
    };

    // 点击删除按钮
    const handleDelete = (data) => {
      departmentRemoveOne(data.departmentId).then(() => {
        ElMessage({
          type: "success",
          message: "删除成功",
        });
        getList();
      }).catch((err) => {
        return err;
      });
    };

    // 点击确定按钮
    const handleOk = (formName) => {
      proxy.$refs[formName].validate((config) => {
        if (config) {
          // 新增
          if (dialogType.value === "1") {
            departmentSaveOne(form.value)
                .then(() => {
                  getList();
                })
                .catch(() => {
                })
                .finally(() => {
                  reset();
                  dialogFormVisible.value = false;
                });
          }
          // 修改
          if (dialogType.value === "2") {
            departmentUpdateOne(form.value)
                .then(() => {
                  getList();
                })
                .catch(() => {
                })
                .finally(() => {
                  reset();
                  dialogFormVisible.value = false;
                });
          }
        } else {
          return false;
        }
      })

    };

    // 点击取消按钮
    const handleCancel = () => {
      reset();
      dialogFormVisible.value = false;
    };
    return {
      departmentList,
      queryForm,
      dialogFormVisible,
      dialogTitle,
      formLabelWidth,
      form,
      defaultProps,
      treeData,
      departmentListSelect,
      loading,
      isUp,
      refreshTree,
      formRules,
      handleSearch,
      handleReset,
      handleEdit,
      handleDelete,
      nodeOnclick,
      handleOk,
      handleCancel,
      handleUp,
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

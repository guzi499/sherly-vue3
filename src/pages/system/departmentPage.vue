<template>
  <div class="menu-container">
    <!-- 菜单搜索框 -->
    <el-form>
      <el-row>
        <el-col :span="7">
          <el-form-item label="部门名称:">
            <el-input v-model="data.queryParams.departmentName" clearable/>
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
        :data="departmentList"
        style="width: 100%; margin-bottom: 20px"
        row-key="departmentId"
        lazy
        :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
    >
      <el-table-column
          label="部门名称"
          prop="departmentName"
          sortable
      />
      <el-table-column
          label="描述"
          prop="description"
          width="230"
          align="center"
      />
      <el-table-column label="排序" prop="sort" width="150" align="center"/>
      <el-table-column label="创建时间" prop="createTime" align="center"/>
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
                :label="treeDatas"
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
          <el-input v-model="form.departmentName"></el-input>
        </el-form-item>
        <el-form-item
            label="描述"
            :label-width="formLabelWidth"
            prop="description"
        >
          <el-input v-model="form.description"></el-input>
        </el-form-item>
        <el-form-item
            label="排序"
            :label-width="formLabelWidth"
            prop="sort"
        >
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
import {ElMessage, ElMessageBox} from "element-plus";
import {reactive, ref, onMounted, getCurrentInstance} from "vue";
import {getDepartmentListTree, addDepartment, delDepartment, updateDepartment} from "@/api/system/department";
import {getDepartmentList} from "@/api/general.js";
// import type { FormInstance, FormRules } from 'element-plus'
export default {
  setup() {
    const {proxy} = getCurrentInstance();
    console.log(proxy);
    onMounted(() => {
      getList(data.queryParams);
      getDepartmentListFn();
    });

    const data = reactive({
      // 部门查询条件
      queryParams: {
        pageNum: 1,
        pageSize: 10,
      }
    });

    // 添加表单验证
    // const ruleFormRef = ref<FormInstance>()
    // const formRrules = reactive<FormRules>({
    //   parentId: [
    //     {required: true, message: '请选择父级部门', trigger: 'change'},
    //     {min: 3, max: 5, message: 'Length should be 3 to 5', trigger: 'blur'},
    //   ],
    //   departmentName: [
    //     {
    //       required: true,
    //       message: 'Please select Activity zone',
    //       trigger: 'change',
    //     },
    //   ],
    //   sort: [
    //     {
    //       type: 'date',
    //       required: true,
    //       message: 'Please pick a date',
    //       trigger: 'change',
    //     },
    //   ]
    // })

    // 根据查询条件搜索
    const handleQuery = () => {
      getList(data.queryParams)
    };

    // 处理展示数据
    const handleTreeData = (list, value) => {
      console.log(list, value)
      let arr = []
      const handleData = (list, value) => {
        list.forEach(item => {
          // 判断当前层级是否存在符合条件的字段, 如果没有， 则判断该项是否存在children
          if (item.departmentName.indexOf(value) == -1) {
            // 若存在children,则重新调用
            if (item.children.length > 0) {
              handleData(item.children, value)
            }
          } else {
            arr.push(item)
          }
        })
      }
      handleData(list, value)
      console.log(arr)
      return arr
    }

    // 重置搜索框
    const resetFn = () => {
      data.queryParams = {
        pageSize: 1,
        pageNum: 10
      };
      getList(data.queryParams);
    };


    const loading = ref(true);

    // 查询部门列表信息
    const departmentList = ref([]);
    const getList = (value) => {
      loading.value = true;
      getDepartmentListTree(value).then((res) => {
        departmentList.value = res;
        loading.value = false;
        if (value.departmentName) {
          console.log(value.departmentName)
          departmentList.value = handleTreeData(departmentList.value, value.departmentName)
        }
      });
      getDepartmentListFn();
    };

    // 查询部门下拉框列表信息
    const departmentListSelect = ref([]);
    const getDepartmentListFn = () => {
      getDepartmentList().then((res) => {
        departmentListSelect.value = res;
      });
    };

    // 判断弹框类型 - 新增/修改
    const dialogType = ref("1");
    // 控制弹框是否显示
    const dialogFormVisible = ref(false);
    // 统一弹框宽度
    const formLabelWidth = "140px";
    // 弹框标题
    const dialogTitle = ref("菜单");
    // 选中回显的数据
    // const treeData = ref(null);
    const treeDatas = ref("");
    // 弹框新增 / 修改弹框绑定数据
    const form = ref({});
    const defaultProps = {
      children: "children",
      label: "departmentName",
    };
    // 重置表单
    const reset = () => {
      form.value = {}
      treeDatas.value = "";
    };
    // 选中弹框中的树形数据
    const nodeOnclick = (e) => {
      console.log(e);
      form.value.parentId = e.departmentId;
      // treeData.value = e.menuId;
      treeDatas.value = e.departmentName;
      proxy.$refs.selectTree.blur();
    };
    // 点击修改 - 新增按钮
    const handleEdit = (type, index, data) => {
      reset();
      dialogFormVisible.value = true;
      if (type === "1") {
        dialogType.value = type;
        console.log("新增 === ", type, index, data);
        dialogTitle.value = "部门新增";
      }
      if (type === "2") {
        dialogType.value = type;
        console.log("修改 === ", type, index, data);
        forEachDepartmentList(departmentList.value, data);
        dialogTitle.value = "部门更新";
        form.value = data
      }
    };
    // 处理树形数据回显
    const forEachDepartmentList = (list, data) => {
      list.forEach((item) => {
        console.log("item === ", item, "data === ", data)
        if (data.parentId === 0) {
          return (treeDatas.value = "总部");
        } else {
          const _obj = JSON.parse(JSON.stringify(item))
          console.log(_obj.departmentId)
          if (_obj.departmentId === data.parentId) {
            return (treeDatas.value = _obj.departmentName);
          } else {
            console.log(_obj)
            if (_obj.children) {
              forEachDepartmentList(_obj.children, data)
            }
          }
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
              delDepartment(data.departmentId)
                  .then(() => {
                    ElMessage({
                      type: "success",
                      message: "删除成功",
                    });
                    getList(data.queryParams);
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
        addDepartment(form.value)
            .then(() => {
              getList(data.queryParams);
            })
            .catch(() => {
              console.log("新增失败");
            })
            .finally(() => {
              reset();
              dialogFormVisible.value = false;
            });
      }
      // 修改
      if (dialogType.value === "2") {
        console.log("调用修改接口");
        updateDepartment(form.value)
            .then(() => {
              getList(data.queryParams);
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
      departmentList,
      data,
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
      treeDatas,
      handleOk,
      handleCancle,
      departmentListSelect,
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

<template>
  <div class="menu-container">
    <!-- 菜单搜索框 -->
    <el-form :model="data.queryParams" :inline="true">
      <el-form-item label="菜单名称:">
        <el-input v-model="data.queryParams.menuName" clearable />
      </el-form-item>
      <el-form-item>
        <el-button icon="Search" type="primary" @click="handleSearch">
          搜索
        </el-button>
        <el-button icon="Refresh" @click="handleReset"> 重置 </el-button>
      </el-form-item>
    </el-form>
    <!-- 操作按钮 -->
    <el-row :gutter="5" type="flex" justify="end">
      <el-col :span="1.5">
        <el-button type="success" plain size="small" @click="handleEdit('1')">
          新增
        </el-button>
      </el-col>
    </el-row>
    <!-- 表格菜单 -->
    <el-table
      v-loading="loading"
      :data="menuList"
      style="width: 100%; margin-bottom: 20px"
      row-key="menuId"
      lazy
      :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
    >
      <el-table-column label="菜单名称" prop="menuName" width="230" />
      <el-table-column
        label="菜单路径"
        prop="link"
        width="230"
        align="center"
      />
      <el-table-column
        label="权限"
        prop="permission"
        width="230"
        align="center"
      />
      <el-table-column label="图标" width="150" align="center">
        <template #default="scope">
          <span
            class="icon iconfont"
            :class="'icon-' + scope.row.icon"
            v-if="scope.row.icon"
          />
        </template>
      </el-table-column>
      <el-table-column label="排序" prop="sort" width="150" align="center" />
      <el-table-column label="创建时间" prop="createTime" align="center" />
      <el-table-column label="操作" align="center" width="250" fixed="right">
        <template #default="scope">
          <el-button
            type="text"
            @click="handleEdit('2', scope.$index, scope.row)"
          >
            修改
          </el-button>
          <el-button
            class="delete"
            type="text"
            @click="handleDelete('2', scope.$index, scope.row)"
          >
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 新增 / 编辑 弹框 -->
    <el-dialog
      v-if="dialogFormVisible"
      v-model="dialogFormVisible"
      :title="dialogTitle"
      width="600px"
    >
      <el-form :model="form" :rules="rules" ref="ruleForm">
        <el-form-item
          :label-width="formLabelWidth"
          prop="menuType"
          label="菜单类型"
        >
          <el-radio-group v-model="form.menuType">
            <el-radio :label="1">目录</el-radio>
            <el-radio :label="2">菜单</el-radio>
            <el-radio :label="3">按钮</el-radio>
          </el-radio-group>
        </el-form-item>
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
            <el-option hidden :value="form.parentId" :label="treeDatas">
            </el-option>
            <el-tree
              :data="menuListSelect"
              :props="defaultProps"
              :expand-on-click-node="false"
              @node-click="nodeOnclick"
            />
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
          label="权限"
          :label-width="formLabelWidth"
          prop="permission"
          v-if="form.menuType !== 1"
        >
          <el-input v-model="form.permission"></el-input>
        </el-form-item>
        <el-form-item
          label="菜单路径"
          :label-width="formLabelWidth"
          prop="link"
          v-if="form.menuType == 2"
        >
          <el-input v-model="form.link"></el-input>
        </el-form-item>
        <el-form-item
          label="图标"
          :label-width="formLabelWidth"
          prop="icon"
          v-if="form.menuType !== 3"
        >
          <el-popover
            trigger="click"
            width="500px"
            :visible="iconPopoverVisible"
          >
            <template #reference>
              <el-input
                readonly
                v-model="form.icon"
                @click="openIconPopover"
                @blur="closeIconPopover"
              >
                <template #prefix>
                  <span
                    class="icon iconfont"
                    :class="'icon-' + form.icon"
                    v-if="form.icon"
                  />
                </template>
              </el-input>
            </template>
            <div class="icon_wrapper">
              <div class="icon_grid" @click="handleSelectIcon('blank')">
                <div class="icon iconfont blank" />
                blank
              </div>
              <div
                class="icon_grid"
                v-for="icon in iconfontList"
                :key="icon.icon_id"
                @click="handleSelectIcon(icon.font_class)"
              >
                <span
                  class="icon iconfont"
                  :class="'icon-' + icon.font_class"
                />
                {{ icon.font_class }}
              </div>
            </div>
          </el-popover>
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
          <el-button type="primary" @click="handleOk('ruleForm')"
            >确定</el-button
          >
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
import iconfont from "@/assets/style/font-icon/iconfont.json";

export default {
  name: "menuPage",
  setup() {
    const { proxy } = getCurrentInstance();
    const loading = ref(false);
    const iconfontList = iconfont.glyphs;
    const iconPopoverVisible = ref(false);
    onMounted(() => {
      getList(data.queryParams);
    });

    const data = reactive({
      // 菜单查询条件
      queryParams: {
        pageNum: 1,
        pageSize: 10,
      },
    });

    // 根据查询条件搜索
    const handleSearch = () => {
      data.queryParams.pageNum = 1;
      getList(data.queryParams);
    };

    // 处理展示数据
    const handleTreeData = (list, value) => {
      let arr = [];
      const handleData = (list, value) => {
        list.forEach((item) => {
          // 判断当前层级是否存在符合条件的字段, 如果没有， 则判断该项是否存在children
          if (item.menuName.indexOf(value) == -1) {
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
      data.queryParams = {
        pageSize: 1,
        pageNum: 10,
      };
      getList(data.queryParams);
    };

    // 查询菜单列表信息
    const menuList = ref([]);
    const getList = (value) => {
      loading.value = true;
      getMenu(value).then((res) => {
        menuList.value = res;
        if (value.menuName) {
          menuList.value = handleTreeData(menuList.value, value.menuName);
        }
      }).finally(() => {
        setTimeout(() => {
          loading.value = false;
        }, 100);
      });
      getMenuListFn();
    };

    // 弹框添加校验效果
    const rules = {
      menuType: [
        { required: true, message: "请选择菜单类型", trigger: "change" },
      ],
      parentId: [
        { required: true, message: "请选择父级菜单", trigger: "change" },
      ],
      menuName: [
        { required: true, message: "请输入菜单名称", trigger: "blur" },
      ],
      // permission: [
      //   { required: true, message: '请输入权限标识', trigger: 'blur' }
      // ],
      link: [{ required: true, message: "请输入菜单路径", trigger: "blur" }],

      icon: [{ required: true, message: "请选择菜单图标", trigger: "blur" }],

      sort: [{ required: true, message: "请输入排序", trigger: "blur" }],
    };

    // 查询菜单下拉框列表信息
    const menuListSelect = ref([]);
    const getMenuListFn = () => {
      getMenu().then((res) => {
        menuListSelect.value = res;
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
    const form = ref({
      menuType: 1,
    });
    const defaultProps = {
      children: "children",
      label: "menuName",
    };

    // 重置表单
    const reset = () => {
      form.value = {};
      treeDatas.value = "";
      // setTimeout(() => {
      //   proxy.$refs.ruleForm.resetFields();
      // }, 100);
    };

    // 选中弹框中的树形数据
    const nodeOnclick = (e) => {
      form.value.parentId = e.menuId;
      // treeData.value = e.menuId;
      treeDatas.value = e.menuName;
      proxy.$refs.selectTree.blur();
    };

    // 点击修改 - 新增按钮
    const handleEdit = (type, index, data) => {
      if (type === "1") {
        reset();
        form.value.menuType = 1;
        form.value.parentId = 0;
        form.value.icon = "blank";
        treeDatas.value = "主目录";
        dialogType.value = type;
        dialogTitle.value = "新增菜单";
      }
      if (type === "2") {
        dialogType.value = type;
        dialogTitle.value = "修改菜单";
        forEachMenuList(menuList.value, data);
        form.value = JSON.parse(JSON.stringify(data));
      }
      dialogFormVisible.value = true;
      proxy.$nextTick(() => {
        proxy.$refs.ruleForm.resetFields();
      })
    };

    // 处理树形数据回显
    const forEachMenuList = (list, data) => {
      list.forEach((item) => {
        if (data.parentId === 0) {
          return (treeDatas.value = "主目录");
        } else {
          const _obj = JSON.parse(JSON.stringify(item));
          if (_obj.menuId === data.parentId) {
            return (treeDatas.value = _obj.menuName);
          } else {
            if (_obj.children) {
              forEachMenuList(_obj.children, data);
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
            delMenu(data.menuId)
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
    const handleOk = (formName) => {
      proxy.$refs[formName].validate((valid) => {
        if (valid) {
          let _obj = ref({})
          // 菜单类型切换时数据过滤
          if (form.value.menuType === 1) {
            _obj.value.icon = form.value.icon
            _obj.value.menuName = form.value.menuName
            _obj.value.menuType = form.value.menuType
            _obj.value.parentId = form.value.parentId
            _obj.value.sort = form.value.sort
          } else if (form.value.menuType === 2) {
            _obj.value.icon = form.value.icon
            _obj.value.link = form.value.link
            _obj.value.menuName = form.value.menuName
            _obj.value.menuType = form.value.menuType
            _obj.value.parentId = form.value.parentId
            _obj.value.permission = form.value.permission || ""
            _obj.value.sort = form.value.sort
          } else {
            _obj.value.icon = form.value.icon
            _obj.value.menuName = form.value.menuName
            _obj.value.menuType = form.value.menuType
            _obj.value.parentId = form.value.parentId
            _obj.value.permission = form.value.permission || ""
            _obj.value.sort = form.value.sort
          }
          // 新增
          if (dialogType.value === "1") {
            addMenu(_obj.value)
                .then(() => {
                  getList(data.queryParams);
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
            updateMenu(_obj.value)
              .then(() => {
                getList(data.queryParams);
              })
              .catch(() => {})
              .finally(() => {
                reset();
                dialogFormVisible.value = false;
              });
          }
        } else {
          return false;
        }
      });
    };

    // 点击取消按钮
    const handleCancle = () => {
      reset();
      dialogFormVisible.value = false;
    };

    // 开启iconPopover显示状态
    const openIconPopover = () => {
      iconPopoverVisible.value = true;
    };

    // 关闭iconPopover显示状态
    const closeIconPopover = () => {
      iconPopoverVisible.value = false;
    };

    // 选中菜单icon图标
    const handleSelectIcon = (icon) => {
      form.value.icon = icon;
      iconPopoverVisible.value = false;
    };

    return {
      menuList,
      data,
      handleSearch,
      handleReset,
      handleEdit,
      handleDelete,
      handleSelectIcon,
      dialogFormVisible,
      dialogTitle,
      formLabelWidth,
      form,
      defaultProps,
      nodeOnclick,
      iconfontList,
      treeDatas,
      handleOk,
      handleCancle,
      menuListSelect,
      rules,
      loading,
      iconPopoverVisible,
      openIconPopover,
      closeIconPopover
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
.icon_wrapper {
  width: 500px;
  display: grid;
  grid-template-columns: repeat(3, 33.3%);
  grid-gap: 10px;
  .icon_grid {
    cursor: pointer;
    display: flex;
    align-items: center;
    .icon {
      margin-right: 4px;
    }
    .blank {
      height: 16px;
      width: 16px;
    }
  }
}
</style>

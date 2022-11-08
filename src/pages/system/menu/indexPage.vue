<template>
  <div class="sherly-page-wrapper">
    <!-- 菜单搜索框 -->
    <el-form :model="queryForm" :inline="true" label-width="80px">
      <el-form-item label="菜单名称">
        <el-input v-model="queryForm.menuName" placeholder="请输入菜单名称" style="width: 215px" clearable/>
      </el-form-item>
      <el-form-item>
        <el-button icon="Search" type="primary" @click="handleSearch">
          搜索
        </el-button>
        <el-button icon="Refresh" @click="handleReset"> 重置</el-button>
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
        <el-button type="primary" size="small" @click="handleEdit('1')"  v-permission="['menu:save_one']">
          新增
        </el-button>
      </el-col>
    </el-row>
    <!-- 表格菜单 -->
    <el-table
        v-if="refreshTree"
        :default-expand-all="isUp"
        v-loading="loading"
        :data="tableData"
        style="width: 100%; margin-bottom: 20px"
        row-key="menuId"
        lazy
        :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
    >
      <el-table-column label="菜单名称" prop="menuName" width="230"/>
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
          <el-link type="primary" @click="handleEdit('2', scope.$index, scope.row)" v-permission="['menu:update_one']" >修改</el-link>
          <el-popconfirm
              title="确定删除本条数据?"
              @confirm="handleDelete(scope.$index, scope.row)"
          >
            <template #reference>
              <el-link type="danger"  v-permission="['menu:remove_one']"> 删除</el-link>
            </template>
          </el-popconfirm>
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
            <el-option hidden :value="form.parentId" :label="treeData">
            </el-option>
            <span class="mainTopMenu" @click="handleMainTopMenu">主目录</span>
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
          <el-input v-model="form.menuName" placeholder="请输入菜单名称"></el-input>
        </el-form-item>
        <el-form-item
          label="权限"
          :label-width="formLabelWidth"
          prop="permission"
          v-if="form.menuType !== 1"
        >
          <el-input v-model="form.permission" placeholder="请输入权限code"></el-input>
        </el-form-item>
        <el-form-item
          label="菜单路径"
          :label-width="formLabelWidth"
          prop="link"
          v-if="form.menuType == 2"
        >
          <el-input v-model="form.link" placeholder="请输入菜单路径"></el-input>
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
            placeholder="仅限输入数字"
          />
        </el-form-item>

        <el-form-item :label-width="formLabelWidth">
          <el-button @click="handleCancel">取消</el-button>
          <el-button type="primary" @click="handleOk('ruleForm')"
            >确定</el-button
          >
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import { ElMessage } from "element-plus";
import { reactive, ref, onMounted, getCurrentInstance } from "vue";
import { menuListTree } from "@/api/system/menu";
import { menuSaveOne, menuRemoveOne, menuUpdateOne } from "@/api/system/menu";
import iconfont from "@/assets/style/font-icon/iconfont.json";

export default {
  name: "menuPage",
  setup() {
    const {proxy} = getCurrentInstance();
    const loading = ref(false);
    const iconfontList = iconfont.glyphs;
    const iconPopoverVisible = ref(false);
    onMounted(() => {
      getList();
    });
    // 菜单查询条件
    const queryForm = reactive({
      menuName: '',
    });

    // 根据查询条件搜索
    const handleSearch = () => {
      tableData.value = handleTreeData(tableData.value, queryForm.menuName);
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
      queryForm.menuName = ''
      getList();
    };

    // 查询菜单列表信息
    const tableData = ref([]);
    const getList = () => {
      loading.value = true;
      menuListTree(queryForm).then((res) => {
        tableData.value = res;
        setTimeout(() => {
          loading.value = false;
        }, 100);
      })
      getMenuListFn();
    };

    // 查询菜单下拉框列表信息
    const menuListSelect = ref([]);
    const getMenuListFn = () => {
      menuListTree().then((res) => {
        menuListSelect.value = res;
      });
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

    // 弹框 - 新增/修改
    const dialogType = ref("1");
    const dialogFormVisible = ref(false);
    const formLabelWidth = "140px";
    const dialogTitle = ref("菜单");
    const treeData = ref("");
    const form = ref({
      menuType: 1,
    });
    const rules = {
      menuType: [
        {required: true, message: "请选择菜单类型", trigger: "change"},
      ],
      parentId: [
        {required: true, message: "请选择父级菜单", trigger: "change"},
      ],
      menuName: [
        {required: true, message: "请输入菜单名称", trigger: "blur"},
      ],
      link: [{required: true, message: "请输入菜单路径", trigger: "blur"}],

      icon: [{required: true, message: "请选择菜单图标", trigger: "blur"}],

      sort: [{required: true, message: "请输入排序", trigger: "blur"}],
    };
    const defaultProps = {
      children: "children",
      label: "menuName",
    };
    // 重置表单
    const reset = () => {
      form.value = {};
      treeData.value = "";
    };
    // 选中弹框中的树形数据
    const nodeOnclick = (e) => {
      form.value.parentId = e.menuId;
      treeData.value = e.menuName;
      proxy.$refs.selectTree.blur();
    };

    // 点击主目录
    const handleMainTopMenu = () => {
      form.value.parentId = 0;
      treeData.value = "主目录";
      proxy.$refs.selectTree.blur();
    }

    // 点击修改 - 新增按钮
    const handleEdit = (type, index, data) => {
      if (type === "1") {
        reset();
        form.value.menuType = 1;
        form.value.parentId = 0;
        form.value.icon = "blank";
        treeData.value = "主目录";
        dialogType.value = type;
        dialogTitle.value = "新增菜单";
      }
      if (type === "2") {
        dialogType.value = type;
        dialogTitle.value = "修改菜单";
        forEachMenuList(tableData.value, data);
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
          return (treeData.value = "主目录");
        } else {
          const _obj = JSON.parse(JSON.stringify(item));
          if (_obj.menuId === data.parentId) {
            return (treeData.value = _obj.menuName);
          } else {
            if (_obj.children) {
              forEachMenuList(_obj.children, data);
            }
          }
        }
      });
    };

    // 点击删除按钮
    const handleDelete = (index, data) => {
      menuRemoveOne(data.menuId)
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

    };

    // 点击确定按钮
    const handleOk = (formName) => {
      console.log(form.value.menuType)
      proxy.$refs[formName].validate((valid) => {
        if (valid) {
          let _obj = ref({})
          // 菜单类型切换时数据过滤
          _obj.value.icon = form.value.icon
          _obj.value.menuName = form.value.menuName || ''
          _obj.value.menuType = form.value.menuType
          _obj.value.parentId = form.value.parentId
          _obj.value.sort = form.value.sort
          dialogType.value === "2" ? _obj.value.menuId = form.value.menuId : ''
          if (form.value.menuType === 2) {
            _obj.value.link = form.value.link
            _obj.value.permission = form.value.permission || ""
          } else if (form.value.menuType === 3) {
            _obj.value.permission = form.value.permission || ""
          }
          // 新增
          if (dialogType.value === "1") {
            menuSaveOne(_obj.value)
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
            menuUpdateOne(_obj.value)
              .then(() => {
                getList();
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
    const handleCancel = () => {
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
      tableData,
      queryForm,
      dialogFormVisible,
      dialogTitle,
      formLabelWidth,
      form,
      defaultProps,
      iconfontList,
      treeData,
      menuListSelect,
      rules,
      loading,
      iconPopoverVisible,
      isUp,
      refreshTree,
      handleSearch,
      handleReset,
      handleEdit,
      handleDelete,
      handleSelectIcon,
      nodeOnclick,
      handleOk,
      handleCancel,
      openIconPopover,
      closeIconPopover,
      handleMainTopMenu,
      handleUp
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
.mainTopMenu {
  display: block;
  width: 100%;
  font-size: 14px;
  color: rgb(96, 98, 102);
  padding: 8px 0 8px 4px;
  cursor: pointer;
  &:hover {
    background-color: rgb(245, 247, 250);
  }
}
</style>

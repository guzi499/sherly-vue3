<!--
 * @author: 陈雪丽
 * @date: 2022-7-31
-->
<template>
  <div class="sherly-page-wrapper">
    <el-form
      ref="resetFormData"
      :model="form"
      :inline="true"
      label-width="80px"
    >
      <el-form-item label="租户代码" prop="tenantCode">
        <el-input v-model="form.tenantCode" style="width: 215px" clearable />
      </el-form-item>
      <el-form-item label="租户名称" prop="tenantName">
        <el-input v-model="form.tenantName" style="width: 215px" clearable />
      </el-form-item>
      <el-form-item label="联系人" prop="contactUser">
        <el-input v-model="form.contactUser" style="width: 215px" clearable />
      </el-form-item>
      <el-form-item label="联系电话" prop="contactPhone">
        <el-input v-model="form.contactPhone" style="width: 215px" clearable />
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
          end-placeholder="结束日期"
        />
      </el-form-item>
      <el-form-item label="过期时间">
        <el-date-picker
          clearable
          style="width: 355px"
          v-model="_datetimerange"
          type="datetimerange"
          range-separator="至"
          format="YYYY-MM-DD HH:mm:ss"
          value-format="YYYY-MM-DD HH:mm:ss"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        />
      </el-form-item>
      <el-form-item label="用户上限">
        <el-form-item prop="beginUserLimit" style="margin: 0">
          <el-input
            oninput="value=value.replace(/[^\d]/g,'')"
            style="width: 100px"
            v-model="form.beginUserLimit"
            placeholder="输入数字"
            clearable
          />
        </el-form-item>
        <span style="width: 28px; text-align: center; user-select: none">
          ~
        </span>
        <el-form-item prop="endUserLimit" style="margin: 0">
          <el-input
            oninput="value=value.replace(/[^\d]/g,'')"
            style="width: 100px"
            v-model="form.endUserLimit"
            placeholder="输入数字"
            clearable
          />
        </el-form-item>
      </el-form-item>
      <el-form-item>
        <el-button icon="Search" type="primary" @click="handleSearch">
          搜索
        </el-button>
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
      :pagination-current="tableData.current"
      :pagination-size="tableData.size"
    >
      <template #header>
        <el-button
          type="primary"
          @click="handleaddTenant"
          v-permission="['tenant:save_one']"
          size="small"
        >
          新增
        </el-button>
      </template>
      <template #table>
        <el-table-column
          prop="tenantCode"
          label="租户代码"
          width="120"
          align="center"
        />
        <el-table-column
          prop="tenantName"
          label="租户名称"
          width="120"
          align="center"
        />
        <el-table-column
          prop="contactUser"
          label="联系人"
          width="180"
          align="center"
        />
        <el-table-column
          prop="contactPhone"
          label="联系电话"
          width="180"
          align="center"
        />
        <el-table-column
          prop="expireTime"
          label="过期时间"
          width="220"
          align="center"
        />
        <el-table-column
          prop="userLimit"
          label="用户上限"
          width="220"
          align="center"
        />
        <el-table-column
          prop="createTime"
          label="创建时间"
          width="220"
          align="center"
        />
        <el-table-column
          fixed="right"
          label="操作"
          min-width="180"
          align="center"
        >
          <template #default="scope">
            <el-link
              type="primary"
              @click="handleEditMenu(scope.row.tenantId)"
              v-permission="['tenant:update_menu']"
              v-show="scope.row.tenantId !== 1"
            >
              菜单配置
            </el-link>
            <el-link
              type="primary"
              @click="handleEdit(scope.row)"
              v-permission="['tenant:update_one']"
            >
              修改
            </el-link>
            <el-popconfirm
              title="确定删除本条数据?"
              @confirm="handleDelete(scope.row)"
            >
              <template #reference>
                <el-link type="danger" v-permission="['tenant:remove_one']">
                  删除
                </el-link>
              </template>
            </el-popconfirm>
          </template>
        </el-table-column>
      </template>
    </SherlyTable>
    <el-dialog v-model="dialogMenuVisible" title="租户菜单" width="480px">
      <el-form>
        <el-form-item label="菜单权限" prop="description">
          <div>
            <el-checkbox
              v-model="menuCheckedKey"
              @change="handleCheckedTreeChange"
              >全选</el-checkbox
            >
            <el-checkbox v-model="isStrictly">父子关联</el-checkbox>
          </div>
          <div class="tree-box">
            <el-tree
              ref="tenantTree"
              :check-strictly="!isStrictly"
              :data="menuTree"
              show-checkbox
              empty-text="加载中，请稍后"
              node-key="menuId"
              :props="{
                children: 'children',
                label: 'menuName',
              }"
              default-expand-all
              :default-checked-keys="tenantListMenu"
              @check-change="handleMenuTreeCheckChange"
            />
          </div>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="handleMenuCancel">取消</el-button>
          <el-button type="primary" @click="handleMenuConfirm">确定</el-button>
        </span>
      </template>
    </el-dialog>
    <el-dialog
      v-model="dialogVisible"
      :title="isEdit ? '租户修改' : '租户新增'"
      width="480px"
      :before-close="handleCancel"
    >
      <el-form
        v-if="dialogVisible"
        ref="tenantFormRef"
        :model="tenantForm"
        :rules="rules"
        label-width="80px"
      >
        <el-form-item label="租户代码" prop="tenantCode">
          <el-input v-model="tenantForm.tenantCode" :disabled="isEdit" />
        </el-form-item>
        <el-form-item label="租户名称" prop="tenantName">
          <el-input v-model="tenantForm.tenantName" :disabled="isEdit" />
        </el-form-item>
        <el-form-item label="过期时间" prop="expireTime">
          <el-date-picker
            value-format="YYYY-MM-DD hh:mm:ss"
            style="width: 360px"
            v-model="tenantForm.expireTime"
            type="datetime"
          />
        </el-form-item>
        <el-form-item label="用户上限" prop="userLimit">
          <el-input-number
            v-model="tenantForm.userLimit"
            :min="1"
            :max="9999"
            controls-position="right"
            style="height: 32px"
          />
        </el-form-item>
        <el-form-item label="联系人" prop="contactUser">
          <el-input v-model="tenantForm.contactUser" :disabled="isEdit" />
        </el-form-item>
        <el-form-item label="联系电话" prop="contactPhone">
          <el-input v-model="tenantForm.contactPhone" :disabled="isEdit" />
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="handleCancel">取消</el-button>
          <el-button type="primary" @click="handleConfirm">确定</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>
<script>
import { reactive, ref, onMounted, watch, getCurrentInstance } from "vue";
import {
  tenantListPage,
  tenantRemoveOne,
  tenantUpdateOne,
  tenantSaveOne,
  tenantUpdateMenu,
  tenantListMenuId,
} from "@/api/system/tenant";
import { menuListTree } from "@/api/system/menu";
import SherlyTable from "@/components/SherlyTable.vue";
import { ElMessage } from "element-plus";

export default {
  components: { SherlyTable },
  setup() {
    const activeName = ref("menu");
    const loading = ref(false);
    let form = reactive({
      beginTime: "",
      endTime: "",
      beginExpireTime: "",
      endExpireTime: "",
      tenantName: "",
      tenantCode: "",
      contactPhone: "",
      contactUser: "",
      beginUserLimit: "",
      endUserLimit: "",
      current: 1,
      size: 10,
    });

    onMounted(() => {
      getList();
      handleGetMenuTree();
    });

    const { proxy } = getCurrentInstance();
    const resetFormData = ref(null);
    const tenantFormRef = ref(null);
    const tableData = reactive({});
    const menuTree = reactive([]);
    const tenantListMenu = reactive([]);
    const datetimerange = ref([]);
    const _datetimerange = ref([]);
    const isStrictly = ref(false);
    let tenantId = ref(null);
    let isEdit = ref(false);
    let dialogVisible = ref(false);
    let dialogMenuVisible = ref(false);
    // 初始化租户详情数据
    const inittenantForm = () => {
      return {
        current: 1,
        size: 10,
        beginTime: "",
        endTime: "",
        beginExpireTime: "",
        endExpireTime: "",
        contactPhone: "",
        contactUser: "",
        expireTime: "",
        tenantCode: "",
        tenantName: "",
        userLimit: "",
      };
    };
    const rules = {
      tenantCode: [
        { required: true, message: "请输入租户代码", trigger: "blur" },
        {
          pattern: /^[a-z]+$/,
          message: "租户代码为纯小写英文",
        },
      ],
      tenantName: [
        { required: true, message: "请输入租户名称", trigger: "blur" },
      ],
      expireTime: [
        { required: true, message: "请输入过期时间", trigger: "blur" },
      ],
      userLimit: [
        { required: true, message: "请输入用户上限", trigger: "blur" },
      ],
      contactUser: [
        { required: true, message: "请输入联系人", trigger: "blur" },
      ],
      contactPhone: [
        { required: true, message: "请输入联系电话", trigger: "blur" },
      ],
    };

    // 菜单权限 - 多选框
    const menuCheckedKey = ref("");
    const handleCheckedTreeChange = (val) => {
      const ary = handleTree(menuTree);
      proxy.$refs.tenantTree.setCheckedNodes(val ? ary._rawValue : []);
    };
    // 树形数据扁平化
    const handleTree = (val) => {
      let ary = ref([]);
      const fn = (val) => {
        val.forEach((item) => {
          ary.value.push(item);
          if (item.children && item.children.length > 0) {
            fn(item.children);
          }
        });
      };
      fn(val);
      return ary;
    };

    // 获取菜单树
    const handleGetMenuTree = async () => {
      const data = await menuListTree();
      data.forEach((i) => {
        menuTree.push(i);
      });
    };

    watch(dialogVisible, (val) => {
      if (!val) {
        isStrictly.value = false;
      }
    });

    // 租户详情数据响应式
    let tenantForm = reactive(inittenantForm());

    // 重置租户详情数据
    const resettenantForm = () => {
      Object.assign(tenantForm, inittenantForm());
    };

    // 获取列表
    const getList = async () => {
      loading.value = true;
      const data = await tenantListPage(form);
      Object.keys(data).forEach((i) => {
        tableData[i] = data[i];
      });
      setTimeout(() => {
        loading.value = false;
      }, 100);
    };

    // 搜索
    const handleSearch = () => {
      if (datetimerange.value.length > 0) {
        form.beginTime = datetimerange.value[0];
        form.endTime = datetimerange.value[1];
      }
      if (_datetimerange.value.length > 0) {
        form.beginExpireTime = _datetimerange.value[0];
        form.endExpireTime = _datetimerange.value[1];
      }
      getList();
    };

    // 重置
    const handleReset = () => {
      datetimerange.value = [];
      _datetimerange.value = [];
      form = inittenantForm();
      getList();
    };

    // 添加租户
    const handleaddTenant = () => {
      isEdit.value = false;
      dialogVisible.value = true;
    };

    // 修改当前分页页码
    const handleCurrentChange = (e) => {
      tableData.current = e;
      form.current = e;
      getList(form);
    };

    // 修改当前每页数量
    const handleSizeChange = (e) => {
      tableData.size = e;
      form.size = e;
      getList(form);
    };

    // 编辑租户
    const handleEdit = (row) => {
      Object.keys(row).forEach((i) => {
        tenantForm[i] = row[i];
      });
      isEdit.value = true;
      dialogVisible.value = true;
    };

    // 删除租户
    const handleDelete = ({ tenantId }) => {
      tenantRemoveOne(tenantId).then(() => {
        ElMessage({
          message: "删除租户成功",
          type: "success",
        });
        getList();
      });
    };

    // 取消
    const handleCancel = () => {
      resettenantForm();
      dialogVisible.value = false;
    };

    // 确定
    const handleConfirm = () => {
      tenantFormRef.value.validate((valid) => {
        if (valid) {
          if (tenantForm.tenantId) {
            tenantUpdateOne(tenantForm).then(() => {
              dialogVisible.value = false;
              ElMessage({
                message: "修改租户成功",
                type: "success",
              });
              getList();
            });
          } else {
            tenantSaveOne(tenantForm).then(() => {
              dialogVisible.value = false;
              ElMessage({
                message: "添加租户成功",
                type: "success",
              });
              getList();
            });
          }
          handleCancel();
        }
      });
    };

    // 编辑租户菜单
    const handleEditMenu = async (_tenantId) => {
      tenantId.value = _tenantId;
      const data = await tenantListMenuId(_tenantId);
      data.forEach((i) => {
        tenantListMenu.push(i);
      });
      dialogMenuVisible.value = true;
      await proxy.$nextTick(() => {
        isStrictly.value = true;
      });
    };

    // 修改租户菜单树
    const handleMenuTreeCheckChange = () => {
      const ary = proxy.$refs.tenantTree.getHalfCheckedNodes();
      ary.forEach((item) => {
        proxy.$refs.tenantTree.setChecked(item.menuId, true);
      });
      tenantListMenu.length = 0;
      proxy.$refs.tenantTree.getCheckedKeys().forEach((item) => {
        tenantListMenu.push(item);
      });
    };

    // 菜单权限取消
    const handleMenuCancel = () => {
      dialogMenuVisible.value = false;
    };

    // 菜单权限确认
    const handleMenuConfirm = async () => {
      await tenantUpdateMenu({
        menuIds: tenantListMenu,
        tenantId: tenantId.value,
      });
      ElMessage({
        message: "修改租户菜单成功",
        type: "success",
      });
      dialogMenuVisible.value = false;
      await getList();
    };

    return {
      tenantId,
      form,
      tableData,
      resetFormData,
      tenantFormRef,
      tenantForm,
      isEdit,
      dialogVisible,
      dialogMenuVisible,
      handleSearch,
      handleReset,
      handleaddTenant,
      handleCurrentChange,
      handleSizeChange,
      handleEdit,
      handleDelete,
      handleCancel,
      handleMenuCancel,
      handleConfirm,
      handleMenuConfirm,
      handleEditMenu,
      handleMenuTreeCheckChange,
      loading,
      menuTree,
      rules,
      tenantListMenu,
      isStrictly,
      datetimerange,
      _datetimerange,
      activeName,
      menuCheckedKey,
      handleCheckedTreeChange,
    };
  },
};
</script>
<style lang="scss" scoped>
/* 滚动条整体部分 */
::-webkit-scrollbar {
  width: 20px;
}

/*滚动条轨道、滚动条*/
::-webkit-scrollbar-track,
::-webkit-scrollbar-thumb {
  border-radius: 50px;
  border: 6px solid transparent;
}

/*滚动条轨道*/
::-webkit-scrollbar-track {
  box-shadow: 1px 1px 10px #fff inset;
}

/*滚动条*/
::-webkit-scrollbar-thumb {
  min-height: 20px;
  background-clip: content-box;
  box-shadow: 0 0 0 5px rgb(204, 204, 204) inset;
}

/*边角*/
::-webkit-scrollbar-corner {
  background: transparent;
}

.tree-box {
  width: 100%;
  height: 180px;
  overflow: auto;
  border: 1px solid rgb(238, 239, 240);
  border-radius: 5px;
}
</style>

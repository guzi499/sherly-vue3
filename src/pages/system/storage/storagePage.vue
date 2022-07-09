<!--
 * @Author: lihaoyu
 * @Date: 2022-07-07 22:48:19
 * @LastEditTime: 2022-07-09 23:38:29
 * @LastEditors: lihaoyu
 * @Description: 
 * @FilePath: /sherly-vue3/src/pages/system/storage/storagePage.vue
-->
<template>
  <div class="sherly-page-wrapper">
    <el-tabs v-model="activeName" class="demo-tabs">
      <el-tab-pane label="存储内容" name="first">
        <SherlyTable
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
              type="success"
              plain
              @click="handleAddStorage"
              size="small"
              >新增
            </el-button>
          </template>
          <template #table>
            <el-table-column
              prop="configId"
              label="编号"
              width="180"
              align="center"
            />
            <el-table-column
              prop="configName"
              label="配置名称"
              align="center"
            />
            <el-table-column prop="description" label="描述" align="center" />
            <el-table-column prop="type" label="储存方式" align="center">
              <template #default="scope">
                {{ typeObj[scope.row.type] }}
              </template>
            </el-table-column>
            <el-table-column prop="enable" label="状态" align="center">
              <template #default="scope">
                {{ scope.row.enable ? "开启" : "禁用" }}
              </template>
            </el-table-column>
            <el-table-column
              prop="createTime"
              label="创建时间"
              align="center"
            />
            <el-table-column
              fixed="right"
              label="操作"
              width="180"
              align="center"
            >
              <template #default="scope">
                <a href="javascript:;" title="修改">
                  <Edit
                    style="width: 1em; height: 1em; margin-right: 8px"
                    @click="handleEdit(scope.row)"
                  />
                </a>
                <el-popconfirm
                  title="确定删除本条数据?"
                  @confirm="handleDelete(scope.row)"
                >
                  <template #reference>
                    <a href="javascript:;" title="删除">
                      <Delete
                        style="width: 1em; height: 1em; margin-right: 8px"
                      />
                    </a>
                  </template>
                </el-popconfirm>
              </template>
            </el-table-column>
          </template>
        </SherlyTable>
      </el-tab-pane>
      <el-tab-pane label="内容管理" name="second"></el-tab-pane>
    </el-tabs>

    <StorageDialog ref="StorageDialog" @updata="handlestorageLists" />
  </div>
</template>

<script>
import { ref, reactive, onMounted } from "vue";
import { ElMessage } from "element-plus";
import { getStorageList, deleteStorage } from "@/api/system/storage";
import SherlyTable from "@/components/SherlyTable.vue";
import StorageDialog from "./storageDialog";

export default {
  components: { SherlyTable, StorageDialog },
  setup() {
    const tableData = reactive({});
    const StorageDialog = ref(null);
    const typeObj = { 2: "本地存储", 5: "S3" };
    let activeName = ref("first");
    let dialogVisible = ref(false);
    let form = reactive({
      current: 1,
      size: 10,
    });

    // 初始化角色详情数据
    const initRoleForm = () => {
      return {
        description: "",
        menuIds: [],
        permissionIds: [],
        roleName: "",
        roleId: null,
      };
    };

    // 角色详情数据响应式
    let roleForm = reactive(initRoleForm());

    // 重置角色详情数据
    const resetRoleForm = () => {
      Object.assign(roleForm, initRoleForm());
    };

    onMounted(() => {
      handlestorageLists();
    });

    const handlestorageLists = async () => {
      const data = await getStorageList(form);
      Object.keys(data).forEach((key) => {
        tableData[key] = data[key];
      });
    };

    // 添加或编辑存储方式弹窗
    const handleAddStorage = () => {
      StorageDialog.value.isEdit = false;
      StorageDialog.value.dialogTableVisible = true;
    };

    // 修改当前分页页码
    const handleCurrentChange = (e) => {
      tableData.current = e;
      form.current = e;
      handlestorageLists();
    };

    // 修改当前每页数量
    const handleSizeChange = (e) => {
      tableData.size = e;
      form.size = e;
      handlestorageLists();
    };

    const handleDelete = async (e) => {
      await deleteStorage(e.configId);
      ElMessage({
        message: "添加成功！",
        type: "success",
      });
      handlestorageLists();
    };

    // 取消
    const handleCancel = () => {
      resetRoleForm();
      dialogVisible.value = false;
    };

    return {
      activeName,
      tableData,
      dialogVisible,
      StorageDialog,
      typeObj,
      handleCurrentChange,
      handleSizeChange,
      handleCancel,
      handleAddStorage,
      handleDelete,
      handlestorageLists,
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
</style>

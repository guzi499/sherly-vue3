<!--
 * @author: 李浩宇
 * @date: 2022-07-08
-->

<template>
  <div class="sherly-page-wrapper">
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
          @click="handleAddStorage"
          size="small"
          v-permission="['oss_config:save_one']"
        >
          新增
        </el-button>
      </template>
      <template #table>
        <el-table-column
          prop="configId"
          label="编号"
          width="180"
          align="center"
        />
        <el-table-column prop="configName" label="配置名称" align="center" />
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
        <el-table-column prop="createTime" label="创建时间" align="center" />
        <el-table-column fixed="right" label="操作" width="180" align="center">
          <template #default="scope">
            <el-popconfirm
              title="确定启用当前存储配置?"
              :disabled="scope.row.enable === 1"
              @confirm="handleEnable(scope.row.configId)"
            >
              <template #reference>
                <el-link
                  type="primary"
                  :disabled="scope.row.enable === 1"
                  v-permission="['oss_config:enable_one']"
                >
                  启用
                </el-link>
              </template>
            </el-popconfirm>
            <el-link
              type="primary"
              @click="handleEdit(scope.row.configId)"
              v-permission="['oss_config:update_one']"
            >
              修改
            </el-link>
            <el-popconfirm
              title="确定删除本条数据?"
              @confirm="handleDelete(scope.row)"
            >
              <template #reference>
                <el-link type="danger" v-permission="['oss_config:remove_one']">
                  删除
                </el-link>
              </template>
            </el-popconfirm>
          </template>
        </el-table-column>
      </template>
    </SherlyTable>
    <StorageDialog ref="StorageDialog" @updata="handlestorageLists" />
  </div>
</template>

<script>
import SherlyTable from "@/components/SherlyTable.vue";
import StorageDialog from "./oss_config_dialog";
import { ref, reactive, onMounted } from "vue";
import { ElMessage } from "element-plus";
import {
  ossConfigListPage,
  ossConfigRemoveOne,
  ossConfigGetOne,
  ossConfigEnableOne,
} from "@/api/system/oss";

export default {
  components: { SherlyTable, StorageDialog },
  setup() {
    const loading = ref(false);
    const tableData = reactive({});
    const StorageDialog = ref(null);
    const typeObj = { 2: "本地存储", 5: "S3" };
    let activeName = ref("first");
    let dialogVisible = ref(false);
    let form = reactive({
      current: 1,
      size: 10,
    });

    onMounted(() => {
      handlestorageLists();
    });

    const handlestorageLists = async () => {
      loading.value = true;
      const data = await ossConfigListPage(form);
      Object.keys(data).forEach((key) => {
        tableData[key] = data[key];
      });
      setTimeout(() => {
        loading.value = false;
      }, 100);
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

    // 删除
    const handleDelete = async (e) => {
      await ossConfigRemoveOne(e.configId);
      ElMessage({
        message: "删除成功！",
        type: "success",
      });
      handlestorageLists();
    };

    // 编辑
    const handleEdit = async (configId) => {
      const result = await ossConfigGetOne(configId);
      Object.keys(result).forEach((key) => {
        StorageDialog.value.form[key] = result[key];
      });
      StorageDialog.value.isEdit = true;
      StorageDialog.value.dialogTableVisible = true;
    };

    // 启用
    const handleEnable = async (configId) => {
      await ossConfigEnableOne(configId);
      handlestorageLists();
    };

    return {
      activeName,
      tableData,
      dialogVisible,
      StorageDialog,
      typeObj,
      loading,
      handleCurrentChange,
      handleSizeChange,
      handleAddStorage,
      handleDelete,
      handlestorageLists,
      handleEdit,
      handleEnable,
    };
  },
};
</script>

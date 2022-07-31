<!--
 * @Author: lihaoyu
 * @Date: 2022-07-15 22:24:27
 * @LastEditTime: 2022-07-31 23:58:15
 * @LastEditors: lihaoyu
 * @Description:
 * @FilePath: /sherly-vue3/src/pages/system/oss/indexPage.vue
-->
<template>
  <div class="sherly-page-wrapper">
    <el-form
      ref="resetFormData"
      :model="form"
      :inline="true"
      label-width="80px"
    >
      <el-form-item label="配置id" prop="configId">
        <el-input v-model="form.configId" style="width: 215px" />
      </el-form-item>
      <el-form-item label="文件相对路径" label-width="120px" prop="path">
        <el-input v-model="form.path" style="width: 215px" />
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
      <el-form-item>
        <el-button icon="Search" type="primary" @click="handleSearch">
          搜索
        </el-button>
        <el-button icon="Refresh" @click="handleReset">重置</el-button>
      </el-form-item>
    </el-form>
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
        <el-upload
          v-model:file-list="fileList"
          class="upload-demo"
          :headers="{ token: data.token }"
          :action="action"
          :data="data"
          multiple
          :limit="3"
          :on-success="handleOnSuccess"
          :before-upload="handBeforeUpload"
          :show-file-list="false"
        >
          <el-button
            type="primary"
            size="small"
            v-permission="['oss:upload_one']"
          >
            上传文件
          </el-button>
        </el-upload>
      </template>
      <template #table>
        <el-table-column
          prop="fileId"
          label="编号"
          width="180"
          align="center"
        />
        <el-table-column prop="path" label="相对路径" align="center" />
        <el-table-column prop="fileType" label="文件类型" align="center" />
        <el-table-column prop="size" label="文件大小" align="center">
          <template #default="scope">
            {{ formatFileSize(scope.row.size) }}
          </template>
        </el-table-column>
        <el-table-column prop="createTime" label="创建时间" align="center" />
        <el-table-column fixed="right" label="操作" width="180" align="center">
          <template #default="scope">
            <el-link
              type="primary"
              @click="handleCopy(scope.row)"
              v-permission="['oss:access_url']"
              >复制地址</el-link
            >
            <el-link
              type="primary"
              @click="handleDownload(scope.row)"
              v-permission="['oss:download_one']"
            >
              下载
            </el-link>
            <el-popconfirm
              title="确定删除本条数据?"
              @confirm="handleDelete(scope.row)"
            >
              <template #reference>
                <el-link
                  type="danger"
                  style="color: #f56c6c"
                  v-permission="['oss:remove_one']"
                >
                  删除
                </el-link>
              </template>
            </el-popconfirm>
          </template>
        </el-table-column>
      </template>
    </SherlyTable>
  </div>
</template>
<script>
import { reactive, onMounted, ref } from "vue";
import SherlyTable from "@/components/SherlyTable.vue";
import { getOssList, deleteOss, getOssAccessUrl } from "@/api/system/oss";
import { ElMessage, ElLoading } from "element-plus";

export default {
  components: { SherlyTable },
  setup() {
    let form = reactive({
      current: 1,
      size: 10,
      path: "",
      configId: "",
    });
    const action = "/api/oss/upload_one";
    const data = reactive({
      token: localStorage.getItem("token"),
      path: "",
    });
    const datetimerange = ref([]);
    const resetFormData = ref(null);

    const tableData = reactive({ result: [], total: 0, current: 1, size: 10 });

    onMounted(() => {
      handleOssLists();
    });

    // 获取文件列表
    const handleOssLists = async () => {
      const data = await getOssList(form);
      Object.keys(data).forEach((key) => {
        tableData[key] = data[key];
      });
    };

    // 搜索
    const handleSearch = () => {
      if (datetimerange.value.length > 0) {
        form.beginTime = datetimerange.value[0];
        form.endTime = datetimerange.value[1];
      }
      handleOssLists();
    };

    // 重置
    const handleReset = () => {
      datetimerange.value = [];
      resetFormData.value.resetFields();
      handleOssLists();
    };

    // 格式化文件大小
    const formatFileSize = (fileSize) => {
      if (fileSize < 1024) {
        return fileSize + "B";
      } else if (fileSize < 1024 * 1024) {
        let temp = fileSize / 1024;
        temp = temp.toFixed(2);
        return temp + "KB";
      } else if (fileSize < 1024 * 1024 * 1024) {
        var temp = fileSize / (1024 * 1024);
        temp = temp.toFixed(2);
        return temp + "MB";
      } else {
        let temp = fileSize / (1024 * 1024 * 1024);
        temp = temp.toFixed(2);
        return temp + "GB";
      }
    };

    // 修改当前分页页码
    const handleCurrentChange = (e) => {
      tableData.current = e;
      form.current = e;
      handleOssLists();
    };

    // 修改当前每页数量
    const handleSizeChange = (e) => {
      tableData.size = e;
      form.size = e;
      handleOssLists();
    };

    // 删除
    const handleDelete = async (e) => {
      await deleteOss(e.fileId);
      ElMessage({
        message: "删除成功！",
        type: "success",
      });
      handleOssLists();
    };

    const handleDownload = async ({ path }) => {
      const url = await getOssAccessUrl(path);
      const name = url.split("?")[0].split("/").at(-1);
      const a_link = document.createElement("a");
      fetch(url)
        .then((res) => res.blob())
        .then((blob) => {
          a_link.href = URL.createObjectURL(blob);
          a_link.download = name; //下载的文件的名字
          document.body.appendChild(a_link);
          a_link.click();
        });
    };

    // 上传成功
    const handleOnSuccess = async () => {
      handleOssLists();
      ElLoading.service({
        lock: true,
        text: "Loading",
        background: "rgba(0, 0, 0, 0.7)",
      }).close();
    };

    // 上传前成功
    const handBeforeUpload = async (rawFile) => {
      data.path = rawFile.name;
      if (rawFile.size > 1024 * 1024 * 2) {
        ElMessage({
          message: "文件上传限制2MB！",
          type: "warning",
        });
        return false;
      }
      ElLoading.service({
        lock: true,
        text: "Loading",
        background: "rgba(0, 0, 0, 0.7)",
      });
    };

    const handleCopy = async ({ path }) => {
      const url = await getOssAccessUrl(path);
      let i = document.createElement("input");
      i.value = url;
      document.body.appendChild(i);
      i.select();
      document.execCommand("copy");
      document.body.removeChild(i);
      ElMessage({
        message: "复制成功！",
        type: "success",
      });
    };

    return {
      handleCurrentChange,
      handleSizeChange,
      handleDelete,
      handleDownload,
      handBeforeUpload,
      formatFileSize,
      handleOnSuccess,
      handleCopy,
      handleSearch,
      handleReset,
      datetimerange,
      tableData,
      action,
      data,
      form,
    };
  },
};
</script>

<style scoped></style>

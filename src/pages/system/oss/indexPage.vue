<!--
 * @author: 李浩宇
 * @date: 2022-07-15
-->

<template>
  <div class="sherly-page-wrapper">
    <el-form
      ref="resetFormData"
      :model="queryForm"
      :inline="true"
      label-width="80px"
    >
      <el-form-item label="文件名称" label-width="120px" prop="fileName">
        <el-input v-model="queryForm.fileName" style="width: 215px" clearable />
      </el-form-item>
      <el-form-item label="相对路径" label-width="120px" prop="path">
        <el-input v-model="queryForm.path" style="width: 215px" clearable />
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
        <el-table-column
          prop="fileName"
          label="文件名称"
          show-overflow-tooltip="true"
          align="center"
        />
        <el-table-column prop="fileType" label="文件类型" align="center" />
        <el-table-column prop="size" label="文件大小" align="center">
          <template #default="scope">
            {{ formatFileSize(scope.row.size) }}
          </template>
        </el-table-column>
        <el-table-column
          prop="path"
          label="相对路径"
          show-overflow-tooltip="true"
          align="center"
        />
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
import { onMounted, reactive, ref } from "vue";
import { ossAccessUrl, ossListPage, ossRemoveOne } from "@/api/system/oss";
import { ElLoading, ElMessage, ElNotification } from "element-plus";

export default {
  setup() {
    const loading = ref(false);
    let queryForm = reactive({
      current: 1,
      size: 10,
      fileName: "",
      path: "",
      configId: "",
    });
    const action = "/api/oss/upload_one";
    const data = reactive({
      token: localStorage.getItem("token"),
      path: "",
    });
    const datetimerange = ref([]);

    const tableData = reactive({ result: [], total: 0, current: 1, size: 10 });

    onMounted(() => {
      getList();
    });

    // 获取文件列表
    const getList = async () => {
      loading.value = true;
      const data = await ossListPage(queryForm);
      Object.keys(data).forEach((key) => {
        tableData[key] = data[key];
      });
      setTimeout(() => {
        loading.value = false;
      }, 100);
    };

    // 搜索
    const handleSearch = () => {
      if (datetimerange.value.length > 0) {
        queryForm.beginTime = datetimerange.value[0];
        queryForm.endTime = datetimerange.value[1];
      }
      getList();
    };

    // 重置
    const handleReset = () => {
      datetimerange.value = [];
      for (let key in queryForm) {
        delete queryForm[key];
      }
      queryForm.current = 1;
      queryForm.size = 10;
      getList();
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
      queryForm.current = e;
      getList();
    };

    // 修改当前每页数量
    const handleSizeChange = (e) => {
      queryForm.size = e;
      getList();
    };

    // 删除
    const handleDelete = async (e) => {
      await ossRemoveOne(e.fileId);
      ElMessage({
        message: "删除成功！",
        type: "success",
      });
      getList();
    };

    const handleDownload = async ({ path, fileName }) => {
      const url = await ossAccessUrl(path);
      const name = fileName;
      const a_link = document.createElement("a");
      const loading = ElLoading.service({
        lock: true,
        text: "Loading",
        background: "rgba(0, 0, 0, 0.7)",
      });
      fetch(url)
        .then((res) => res.blob())
        .then((blob) => {
          a_link.href = URL.createObjectURL(blob);
          a_link.download = name; //下载的文件的名字
          document.body.appendChild(a_link);
          a_link.click();
          document.body.removeChild(a_link); // 下载完成移除元素
          window.URL.revokeObjectURL(a_link.href); // 释放掉blob对象
          loading.close();
        })
        .catch(() => {
          loading.close();
        });
    };

    // 上传成功
    const handleOnSuccess = (e) => {
      if (e.code !== "000") {
        ElNotification({
          title: "警告",
          message: e.message,
          duration: 3000,
          type: "error",
        });
      } else {
        getList();
      }
      ElLoading.service({
        lock: true,
        text: "Loading",
        background: "rgba(0, 0, 0, 0.7)",
      }).close();
    };

    // 上传前成功
    const handBeforeUpload = async (rawFile) => {
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
      const url = await ossAccessUrl(path);
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
      loading,
      datetimerange,
      tableData,
      action,
      data,
      queryForm,
      handleCurrentChange,
      handleSizeChange,
      handleDelete,
      handleDownload,
      handBeforeUpload,
      formatFileSize,
      handleOnSuccess,
      handleCopy,
      handleSearch,
      handleReset
    };
  },
};
</script>

<style scoped></style>

<script setup lang="ts">
import {ref} from "vue";
import {useOperationLog} from "./hook";
import {PureTableBar} from "@/components/RePureTableBar";
import {useRenderIcon} from "@/components/ReIcon/src/hooks";

import Delete from "@iconify-icons/ep/delete";
import EditPen from "@iconify-icons/ep/edit-pen";
import Search from "@iconify-icons/ep/search";
import Refresh from "@iconify-icons/ep/refresh";
import AddFill from "@iconify-icons/ri/add-circle-line";

defineOptions({
  name: "OperationLog"
});

const formRef = ref();
const ruleFormRef = ref();
const {
  form,
  loading,
  columns,
  dataList,
  pagination,
  detail,
  requestType,
  onSearch,
  resetForm,
  handleRemove,
  handleSizeChange,
  handleCurrentChange,
  handleClose,
  dialogVisible,
  datetimeRange,
  title,
  ruleForm,
  handleOk,
  handleDetail,
  type,
} = useOperationLog();
</script>

<template>
  <div class="main">
    <el-form
      ref="formRef"
      :inline="true"
      :model="form"
      class="bg-bg_color w-[99/100] pl-8 pt-4"
    >
      <el-form-item label="操作用户姓名：" prop="realName">
        <el-input
          v-model="form.realName"
          placeholder="请输入操作用户姓名"
          clearable
          class="!w-[200px]"
        />
      </el-form-item>
      <el-form-item label="耗时(ms)：">
        <div class="input-box">
          <el-input v-model="form.beginDuration" placeholder="0" maxlength="4" minlength="1" class="!w-[80px]"/>
          ~
          <el-input v-model="form.endDuration" placeholder="9999" maxlength="4" minlength="1" class="!w-[80px]"/>
        </div>
      </el-form-item>
      <el-form-item label="请求方式：" prop="requestMethod">
        <el-select v-model="form.requestMethod" placeholder="请选择请求方式" clearable style="width: 215px">
          <el-option v-for="item in requestType" :key="item.value" :label="item.label" :value="item.label"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="日志类型：" prop="type">
        <el-select v-model="form.type" placeholder="请选择日志类型" clearable style="width: 215px">
          <el-option label="正常" value="NORMAL"/>
          <el-option label="异常" value="EXCEPTION"/>
        </el-select>
      </el-form-item>
      <el-form-item label="请求uri：" prop="uri">
        <el-input
          v-model="form.uri"
          placeholder="请输入请求uri"
          clearable
          class="!w-[200px]"
        />
      </el-form-item>
      <el-form-item label="操作时间：" prop="datetimeRange">
        <el-date-picker
          clearable
          style="width: 355px"
          v-model="datetimeRange"
          type="datetimerange"
          range-separator="至"
          format="YYYY-MM-DD HH:mm:ss"
          value-format="YYYY-MM-DD HH:mm:ss"
          start-placeholder="开始日期"
          end-placeholder="结束日期"/>
      </el-form-item>
      <el-form-item>
        <el-button
          type="primary"
          :icon="useRenderIcon(Search)"
          :loading="loading"
          @click="onSearch"
        >
          搜索
        </el-button>
        <el-button :icon="useRenderIcon(Refresh)" @click="resetForm(formRef)">
          重置
        </el-button>
      </el-form-item>
    </el-form>

    <PureTableBar title="操作日志" @refresh="onSearch">
      <template #buttons>
        <el-button
          type="danger"
          :icon="useRenderIcon(Delete)"
          @click="handleRemove"
        >
          清空日志
        </el-button>
      </template>
      <template v-slot="{ size, checkList }">
        <pure-table
          border
          align-whole="center"
          showOverflowTooltip
          table-layout="auto"
          :loading="loading"
          :size="size"
          :data="dataList"
          :columns="columns"
          :checkList="checkList"
          :pagination="pagination"
          :paginationSmall="size === 'small' ? true : false"
          :header-cell-style="{
            background: 'var(--el-table-row-hover-bg-color)',
            color: 'var(--el-text-color-primary)'
          }"
          @selection-change="handleCurrentChange"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        >
          <template #operation="{ row }">
            <el-button
              class="reset-margin"
              link
              type="primary"
              :size="size"
              :icon="useRenderIcon(EditPen)"
              @click="handleDetail(row)"
            >
              详情
            </el-button>
          </template>
        </pure-table>
      </template>
    </PureTableBar>

    <!--  查看详情组件-->
    <el-dialog
      v-model="dialogVisible"
      title="详情"
      width="40%"
      :before-close="handleClose"
    >
      <el-descriptions column="1" size="large">
        <el-descriptions-item label="日志id：">{{ detail.logId }}</el-descriptions-item>
        <el-descriptions-item label="日志类型：">
          {{ detail.type }}
        </el-descriptions-item>
        <el-descriptions-item label="描述：">{{ detail.description }}</el-descriptions-item>
        <el-descriptions-item label="请求方式：">{{ detail.requestMethod }}</el-descriptions-item>
        <el-descriptions-item label="请求uri：">{{ detail.uri }}</el-descriptions-item>
        <el-descriptions-item label="请求参数：">{{ detail.requestParams }}</el-descriptions-item>
        <el-descriptions-item label="请求ip：">{{ detail.ip }}</el-descriptions-item>
        <el-descriptions-item label="请求地址：">{{ detail.address }}</el-descriptions-item>
        <el-descriptions-item label="请求浏览器：">{{ detail.browser }}</el-descriptions-item>
        <el-descriptions-item label="耗时：">{{ detail.duration }}</el-descriptions-item>
        <el-descriptions-item label="异常详情：">{{ detail.exception }}</el-descriptions-item>
      </el-descriptions>
    </el-dialog>
  </div>
</template>

<style scoped lang="scss">
:deep(.el-dropdown-menu__item i) {
  margin: 0;
}

.input-box {
  box-shadow: 0 0 0 1px #dcdfe6;
  border-radius: 2px;

  :deep(.el-input__wrapper) {
    padding: 0 15px;
    box-shadow: 0 0 0 0px #dcdfe6;
  }
}
</style>

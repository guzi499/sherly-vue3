<script setup lang="ts">
import { ref } from "vue";
import { useLoginLog } from "./hook";
import { PureTableBar } from "@/components/RePureTableBar";
import { useRenderIcon } from "@/components/ReIcon/src/hooks";

import Delete from "@iconify-icons/ep/delete";
import Search from "@iconify-icons/ep/search";
import Refresh from "@iconify-icons/ep/refresh";

defineOptions({
  name: "LoginLog"
});

const formRef = ref();
const {
  form,
  loading,
  columns,
  dataList,
  pagination,
  loginType,
  loginResults,
  onSearch,
  resetForm,
  handleRemove,
  handleSizeChange,
  handleCurrentChange,
  datetimeRange
} = useLoginLog();
</script>

<template>
  <div class="main">
    <el-form
      ref="formRef"
      :inline="true"
      :model="form"
      class="bg-bg_color w-[99/100] pl-8 pt-4"
    >
      <el-form-item label="登录账号：" prop="username">
        <el-input
          v-model="form.username"
          placeholder="请输入登录账号"
          clearable
          class="!w-[200px]"
        />
      </el-form-item>
      <el-form-item label="登录方式：" prop="type">
        <el-select
          v-model="form.type"
          placeholder="请选择登录方式"
          clearable
          style="width: 215px"
        >
          <el-option
            v-for="item in loginType"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="登录结果：" prop="result">
        <el-select
          v-model="form.result"
          placeholder="请选择登录结果"
          clearable
          style="width: 215px"
        >
          <el-option
            v-for="item in loginResults"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="登录时间：" prop="datetimeRange">
        <el-date-picker
          clearable
          style="width: 355px"
          v-model="datetimeRange"
          type="datetimerange"
          range-separator="至"
          format="YYYY-MM-DD HH:mm:ss"
          value-format="YYYY-MM-DD HH:mm:ss"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        />
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

    <PureTableBar title="登录日志" @refresh="onSearch">
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
        />
      </template>
    </PureTableBar>
  </div>
</template>

<style scoped lang="scss">
:deep(.el-dropdown-menu__item i) {
  margin: 0;
}
</style>

<!--
 * @Author: lihaoyu
 * @Date: 2022-04-18 09:52:49
 * @LastEditTime: 2022-04-19 11:23:13
 * @LastEditors: lihaoyu
 * @Description: 
 * @FilePath: /sherly-vue3/src/pages/system/userPage.vue
-->
<template>
  <div class="user_container">
    <!-- 查询条件 -->
    <el-form :model="queryparms">
      <el-row>
        <el-form-item label="手机号: ">
          <el-input
            v-model="queryparms.phone"
            placeholder="请输入手机号"
          ></el-input>
        </el-form-item>
        <el-form-item label="姓名: ">
          <el-input
            v-model="queryparms.realName"
            placeholder="请输入姓名"
          ></el-input>
        </el-form-item>
        <el-form-item label="昵称: ">
          <el-input
            v-model="queryparms.nickname"
            placeholder="请输入昵称"
          ></el-input>
        </el-form-item>
        <el-form-item label="部门: ">
          <el-cascader :options="options" clearable />
        </el-form-item>
        <el-form-item>
          <el-button>搜索</el-button>
          <el-button>重置</el-button>
        </el-form-item>
      </el-row>
    </el-form>
    <!-- 操作按钮 -->
    <el-row :gutter="5" type="flex" justify="end" style="margin-bottom: 12px">
      <el-col :span="1.5">
        <el-button type="primary" plain size="small">新增</el-button>
      </el-col>
    </el-row>
    <!-- 用户表格 -->
    <el-table :data="tableData" stripe style="width: 100%">
      <el-table-column prop="date" label="手机号" width="180" />
      <el-table-column prop="name" label="姓名" width="180" />
      <el-table-column prop="name" label="昵称" width="180" />
      <el-table-column prop="name" label="性别" width="180" />
      <el-table-column prop="name" label="部门" width="180" />
      <el-table-column prop="name" label="禁用状态" width="180" />
      <el-table-column prop="name" label="创建时间" width="180" />
      <el-table-column prop="name" label="操作" width="180" />
    </el-table>
    <!-- 分页 - 暂时不写 -->
  </div>
</template>

<script>
import { getCurrentInstance, reactive } from "vue";
export default {
  setup() {
    const proxy = getCurrentInstance();
    console.log(proxy);
    // 查询条件
    const queryparms = reactive({
      phone: "",
      realName: "",
      nickname: "",
    });
    return {
      queryparms,
    };
  },
};
</script>

<style lang="scss" scoped>
.user_container {
  padding: 16px;
}
</style>

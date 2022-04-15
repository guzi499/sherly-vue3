<template>
  <div class="permissionPage">
    <el-row type="flex" class="search">
      <el-col :span="1.5" class="searchName">权限名称：</el-col>
      <el-col :span="5">
        <el-input v-model="input" placeholder="请输入权限名称" />
      </el-col>
      <el-col :span="1">
        <el-button type="primary" :icon="Search">搜索</el-button>
      </el-col>
      <el-col :span="1">
        <el-button :icon="Refresh">重置</el-button>
      </el-col>
    </el-row>
  </div>
</template>

<script setup>
import { ref } from 'vue'
const input = ref('')
</script>

<style lang="scss" scope>
.permissionPage {
  padding: 30px 50px;
  box-sizing: border-box;
  .search {
    margin-top: 20px;
    .searchName {
      align-self: center;
    }
  }
}
</style>

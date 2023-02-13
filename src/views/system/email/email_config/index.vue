<script setup lang="ts">
import {ref} from "vue";
import {useEmailConfig} from "./hook";

defineOptions({
  name: "EmailConfig"
});

const ruleFormRef = ref();
const {
  loading,
  onSearch,
  ruleForm,
  rules,
  handleOk,
  handleCancel
} = useEmailConfig();
</script>

<template>
  <div class="main">
    <div class="bg-white">
      <el-form
        ref="ruleFormRef"
        :model="ruleForm"
        :rules="rules"
        label-width="120px"
        class="demo-ruleForm"
        status-icon
      >
        <el-form-item label="发件人邮箱" prop="senderEmail">
          <el-input clearable v-model="ruleForm.senderEmail"/>
        </el-form-item>
        <el-form-item label="发件人名称" prop="senderUser">
          <el-input clearable v-model="ruleForm.senderUser"/>
        </el-form-item>
        <el-form-item label="邮箱密码" prop="password">
          <el-input clearable v-model="ruleForm.password"/>
        </el-form-item>
        <el-form-item label="SMTP地址" prop="host">
          <el-input clearable v-model="ruleForm.host"/>
        </el-form-item>
        <el-form-item label="SMTP端口" prop="port">
          <el-input clearable v-model="ruleForm.port"/>
        </el-form-item>
        <el-form-item>
          <el-button @click="handleCancel(ruleFormRef)">一键还原</el-button>
          <el-button type="primary" @click="handleOk(ruleFormRef)">
            更新配置
          </el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<style scoped lang="scss">
:deep(.el-dropdown-menu__item i) {
  margin: 0;
}

.bg-white {
  background-color: #fff;
  padding: 50px 100px;

  .demo-ruleForm {
    width: 50%;
  }
}
</style>

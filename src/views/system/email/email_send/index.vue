<script setup lang="ts">
import { ref, onBeforeUnmount, shallowRef, onMounted } from "vue";
import { useEmailSend } from "./hook";
import "@wangeditor/editor/dist/css/style.css"; // 引入 css
import { Editor, Toolbar } from "@wangeditor/editor-for-vue";

defineOptions({
  name: "EmailSend"
});

const ruleFormRef = ref();
const {
  ruleForm,
  rules,
  // activeName,
  handleSend,
  // handleCancel,
  // handleSelectEmail,
  resetForm
  // handleClose,
  // handleClickTab,
  // dialogVisible
} = useEmailSend();

// 编辑器实例，必须用 shallowRef
const editorRef = shallowRef();

// // 内容 HTML
// const valueHtml = ref("");

// // 模拟 ajax 异步获取内容
// onMounted(() => {
//   setTimeout(() => {
//     valueHtml.value = "";
//   }, 1500);
// });

const toolbarConfig = {};
const editorConfig = { placeholder: "请输入内容..." };

// 组件销毁时，也及时销毁编辑器
onBeforeUnmount(() => {
  const editor = editorRef.value;
  if (editor == null) return;
  editor.destroy();
});

const handleCreated = editor => {
  editorRef.value = editor; // 记录 editor 实例，重要！
};
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
        <el-form-item label="邮件标题：" prop="subject">
          <el-input class="input_width" clearable v-model="ruleForm.subject" />
        </el-form-item>
        <el-form-item label="收件用户：" prop="tos">
          <el-input class="input_width" clearable v-model="ruleForm.tos" />
        </el-form-item>
        <el-form-item label="邮件正文：" prop="content">
          <div style="border: 1px solid #ccc">
            <Toolbar
              style="border-bottom: 1px solid #ccc"
              :editor="editorRef"
              :defaultConfig="toolbarConfig"
              mode="default"
            />
            <Editor
              style="height: 500px; overflow-y: hidden"
              v-model="ruleForm.content"
              :defaultConfig="editorConfig"
              mode="default"
              @onCreated="handleCreated"
            />
          </div>
        </el-form-item>
        <el-form-item>
          <el-button @click="resetForm(ruleFormRef)">内容重置</el-button>
          <el-button type="primary" @click="handleSend(ruleFormRef)">
            发送邮件
          </el-button>
        </el-form-item>
      </el-form>
    </div>
    <!-- 选择用户邮箱弹框 -->
    <!-- <el-dialog
      v-model="dialogVisible"
      title="选择收件人"
      width="40%"
      :before-close="handleClose"
    >
      <div>
        <el-tabs
          v-model="activeName"
          class="demo-tabs"
          @tab-click="handleClickTab"
        >
          <el-tab-pane label="用户" name="first">用户</el-tab-pane>
          <el-tab-pane label="部门" name="second">部门</el-tab-pane>
          <el-tab-pane label="角色" name="third">角色</el-tab-pane>
        </el-tabs>
      </div>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="dialogVisible = false">
            确定
          </el-button>
        </span>
      </template>
    </el-dialog> -->
  </div>
</template>

<style scoped lang="scss">
:deep(.el-dropdown-menu__item i) {
  margin: 0;
}

.bg-white {
  background-color: #fff;
  padding: 50px 100px;
  .input_width {
    width: 50%;
  }
}
</style>

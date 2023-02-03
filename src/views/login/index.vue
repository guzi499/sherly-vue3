<script setup lang="ts">
import Motion from "./utils/motion";
import { useRouter } from "vue-router";
import { message } from "@/utils/message";
import { loginRules } from "./utils/rule";
import { initRouter } from "@/router/utils";
import { useNav } from "@/layout/hooks/useNav";
import type { FormInstance } from "element-plus";
import { useLayout } from "@/layout/hooks/useLayout";
import { useUserStoreHook } from "@/store/modules/user";
import { bg } from "./utils/static";
import { useRenderIcon } from "@/components/ReIcon/src/hooks";
import { ref, reactive, onMounted, onBeforeUnmount } from "vue";
import { useDataThemeChange } from "@/layout/hooks/useDataThemeChange";

import dayIcon from "@/assets/svg/day.svg?component";
import darkIcon from "@/assets/svg/dark.svg?component";
import Lock from "@iconify-icons/ri/lock-fill";
import User from "@iconify-icons/ri/user-3-fill";
import Home from "@iconify-icons/ri/home-2-fill";

defineOptions({
  name: "Login"
});
const router = useRouter();
const loading = ref(false);
const ruleFormRef = ref<FormInstance>();

const { initStorage } = useLayout();
initStorage();

const { dataTheme, dataThemeChange } = useDataThemeChange();
dataThemeChange();
const { title } = useNav();

const ruleForm = reactive({
  username: "admin",
  password: "admin123"
});

// 切换租户
const onSwitch = () => {
  console.log("切换租户");
};

const onLogin = async (formEl: FormInstance | undefined) => {
  loading.value = true;
  if (!formEl) return;
  await formEl.validate((valid, fields) => {
    if (valid) {
      useUserStoreHook()
        .loginByUsername({ username: ruleForm.username, password: "admin123" })
        .then(res => {
          if (res.success) {
            // 获取后端路由
            initRouter().then(() => {
              router.push("/");
              message("登录成功", { type: "success" });
            });
          }
        });
    } else {
      loading.value = false;
      return fields;
    }
  });
};

/** 使用公共函数，避免`removeEventListener`失效 */
function onkeypress({ code }: KeyboardEvent) {
  if (code === "Enter") {
    onLogin(ruleFormRef.value);
  }
}

onMounted(() => {
  window.document.addEventListener("keypress", onkeypress);
});

onBeforeUnmount(() => {
  window.document.removeEventListener("keypress", onkeypress);
});
</script>

<template>
  <div class="select-none">
    <img :src="bg" class="wave" alt="" />
<!--    <div class="flex-c absolute right-5 top-3">-->
<!--      &lt;!&ndash; 主题 &ndash;&gt;-->
<!--      <el-switch-->
<!--        v-model="dataTheme"-->
<!--        inline-prompt-->
<!--        :active-icon="dayIcon"-->
<!--        :inactive-icon="darkIcon"-->
<!--        @change="dataThemeChange"-->
<!--      />-->
<!--    </div>-->
    <div class="login-container">
      <div class="login-box">
        <div class="login-form">
          <img :src="bg" class="small_wave" alt="" />
          <div class="login-form-left">
            <Motion>
              <h2 class="outline-none">{{ title }}</h2>
            </Motion>
            <el-form
              ref="ruleFormRef"
              :model="ruleForm"
              :rules="loginRules"
              size="large"
            >
              <Motion :delay="100">
                <el-form-item prop="username">
                  <el-input
                    v-model="ruleForm.username"
                    placeholder="选择默认租户"
                    :prefix-icon="useRenderIcon(Home)"
                  />
                </el-form-item>
                <el-form-item
                  :rules="[
                    {
                      required: true,
                      message: '请输入账号',
                      trigger: 'blur'
                    }
                  ]"
                  prop="username"
                >
                  <el-input
                    clearable
                    v-model="ruleForm.username"
                    placeholder="账号"
                    :prefix-icon="useRenderIcon(User)"
                  />
                </el-form-item>
              </Motion>

              <Motion :delay="150">
                <el-form-item prop="password">
                  <el-input
                    clearable
                    show-password
                    v-model="ruleForm.password"
                    placeholder="密码"
                    :prefix-icon="useRenderIcon(Lock)"
                  />
                </el-form-item>
              </Motion>

              <Motion :delay="250" style="display: flex">
                <el-button
                  class="w-full mt-4"
                  size="default"
                  :loading="loading"
                  @click="onSwitch"
                >
                  切换租户
                </el-button>
                <el-button
                  class="w-full mt-4"
                  size="default"
                  :loading="loading"
                  @click="onLogin(ruleFormRef)"
                >
                  登录
                </el-button>
              </Motion>
            </el-form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
@import url("@/style/login.css");
</style>

<style lang="scss" scoped>
:deep(.el-input-group__append, .el-input-group__prepend) {
  padding: 0;
}
</style>

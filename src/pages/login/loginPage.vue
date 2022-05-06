<!--
 * @Author: lihaoyu
 * @Date: 2022-03-30 01:06:51
 * @LastEditTime: 2022-04-15 16:06:53
 * @LastEditors: lihaoyu
 * @Description:
 * @FilePath: /sherly-vue3/src/pages/login/loginPage.vue
-->
<template>
  <div class="sherly-page">
    <div class="login-layout">
      <div class="login-layout-left">
        <img src="../../assets/sherlyLogo.jpg" alt="" />
      </div>
      <div class="login-layout-dividing" />
      <div class="login-layout-right">
        <div class="login-layout-right-title">登录</div>
        <div class="login-layout-right-formbox">
          <el-form :model="loginForm">
<!--            <el-form-item>-->
<!--              <el-input-->
<!--                class="login-layout-right-input"-->
<!--                v-model="loginForm.tenantCode"-->
<!--                placeholder="请输入租户账号"-->
<!--                clearable-->
<!--              >-->
<!--                <template #prefix>-->
<!--                  <el-icon class="input-prefix-icon" color="#000">-->
<!--                    <key />-->
<!--                  </el-icon>-->
<!--                </template>-->
<!--              </el-input>-->
<!--            </el-form-item>-->
            <el-form-item>
              <el-input
                class="login-layout-right-input"
                v-model="loginForm.phone"
                placeholder="请输入手机号"
                clearable
              >
                <template #prefix>
                  <el-icon class="input-prefix-icon" color="#000">
                    <avatar />
                  </el-icon>
                </template>
              </el-input>
            </el-form-item>
            <el-form-item>
              <el-input
                class="login-layout-right-input"
                v-model="loginForm.password"
                placeholder="请输入密码"
                type="password"
                show-password
                clearable
              >
                <template #prefix>
                  <el-icon class="input-prefix-icon" color="#000"
                    ><unlock
                  /></el-icon>
                </template>
              </el-input>
            </el-form-item>
            <!-- <el-form-item>
              <el-input
                class="login-layout-right-input"
                v-model="loginForm.password"
                placeholder="请输入密码"
              >
                <template #prefix>
                  <el-icon class="input-prefix-icon" color="#000"
                    ><unlock
                  /></el-icon>
                </template>
              </el-input>
            </el-form-item> -->
          </el-form>
        </div>
        <el-button class="login-layout-right-button" @click="login()"
          >登录</el-button
        >
      </div>
    </div>
  </div>
</template>
<script>
import { reactive, onMounted } from "vue";
import { useRouter } from "vue-router";
import server from "@/api/login";
import Cookies from "js-cookie";
import Config from "@/config";

export default {
  setup() {
    const router = useRouter();
    let loginForm = reactive({
      phone: "",
      password: "",
      // rememberMe: false,
      // tenantCode: "",
      // uuid: "",
    });
    onMounted(() => {
      getCookie();
    });
    const login = () => {
      server.login(loginForm).then((res) => {
        Cookies.set("phone", loginForm.phone, {
          expires: Config.passCookieExpires,
        });
        Cookies.set("password", loginForm.password, {
          expires: Config.passCookieExpires,
        });
        // Cookies.set("tenantCode", loginForm.tenantCode, {
        //   expires: Config.passCookieExpires,
        // });
        localStorage.setItem("token", res.token);
        router.push({ path: "/home" });
      });
    };
    const getCookie = () => {
      const phone = Cookies.get("phone");
      // let password = Cookies.get("password");
      // const tenantCode = Cookies.get("tenantCode");
      loginForm.phone = phone === undefined ? loginForm.phone : phone;
      // loginForm.password =
      //   password === undefined ? loginForm.password : password;
      // loginForm.tenantCode =
      //   tenantCode === undefined ? loginForm.tenantCode : tenantCode;
    };
    return { loginForm, login, getCookie };
  },
};
</script>

<style lang="scss" scoped>
.sherly-page {
  background: #459cc0;
}
.login-layout {
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  box-shadow: var(--el-box-shadow-lighter);
  width: 800px;
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  background: #fff;
  border-radius: 8px;
  overflow: hidden;
  padding: 12rpx;
  &-left {
    width: 400px;
    height: 380px;
    img {
      width: 100%;
      height: 100%;
      display: block;
    }
  }
  &-dividing {
    width: 1px;
    background: #ddd;
    margin: 12px;
  }
  &-right {
    display: flex;
    align-items: center;
    flex-direction: column;
    padding: 24px 0;
    &/deep/ .el-input__inner {
      box-shadow: none;
      border-radius: 0;
      border-bottom: 1px solid #eee;
    }
    &-title {
      font-weight: 500;
      text-align: center;
      font-size: 36px;
      line-height: 36px;
      margin-bottom: 24px;
    }
    &-formbox {
      flex: 1;
    }
    &-input {
      width: 280px;
      .input-prefix-icon {
        margin: auto;
      }
    }
    &-button {
      width: 280px;
    }
  }
}
</style>

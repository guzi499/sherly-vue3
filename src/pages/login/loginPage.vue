<!--
 * @Author: lihaoyu
 * @Date: 2022-03-30 01:06:51
 * @LastEditTime: 2022-05-23 00:08:48
 * @LastEditors: lihaoyu
 * @Description:
 * @FilePath: /sherly-vue3/src/pages/login/loginPage.vue
-->
<template>
  <div class="sherly-page">
    <div class="login-layout">
      <div class="login-layout-left">
        <!--        <img src="../../assets/sherly-logo.png" alt="" />-->
        <img src="../../assets/sherly-logo-simple.png" alt=""/>
      </div>
<!--      <div class="login-layout-dividing" />-->
      <div class="login-layout-right">
        <div class="login-layout-right-title">账号密码登录</div>
        <div class="login-layout-right-formbox">
          <el-form :model="loginForm" class="login-layout-right-formbox-elForm">
            <el-form-item>
              <el-input
                  class="login-layout-right-input"
                  v-model="loginForm.phone"
                  placeholder="请输入手机号"
                  clearable
                  @keyup.enter="login()"
              >
                <template #prefix>
                  <el-icon class="input-prefix-icon" color="#000">
                    <avatar/>
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
                @keyup.enter="login()"
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
            <el-form-item>
              <el-button class="login-layout-right-button" @click="login()" style="width: 60%; margin: 0 auto"
              >登 录
              </el-button
              >
            </el-form-item>
          </el-form>
        </div>

      </div>
    </div>
  </div>
</template>
<script>
import { reactive, onMounted } from "vue";
import { useRouter } from "vue-router";
import server from "@/api/login";
import Cookies from "js-cookie";

export default {
  setup() {
    const router = useRouter();
    let loginForm = reactive({
      phone: "",
      password: "",
    });
    onMounted(() => {
      getCookie();
    });
    const login = () => {
      server.login(loginForm).then((res) => {
        localStorage.setItem("token", res.token);
        router.push({ path: "/home" });
      });
    };
    const getCookie = () => {
      const phone = Cookies.get("phone");
      loginForm.phone = phone === undefined ? loginForm.phone : phone;
    };
    return { loginForm, login, getCookie };
  },
};
</script>

<style lang="scss" scoped>
.sherly-page {
  //background: #459cc0;
  background: url("@/assets/images/bg_img.png");
  background-size: 100% 100%;
}
.login-layout {
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  box-shadow: var(--el-box-shadow-lighter);
  width: 900px;
  display: grid;
  grid-template-columns: 2fr 1fr;
  background: #fff;
  border-radius: 8px;
  overflow: hidden;

  &-left {
    background: url("@/assets/images/bg_img.png");
    background-size: 100% 100%;
    width: 100%;
    height: 380px;
    vertical-align: middle;
    display: flex;
    justify-content: center;
    align-items: center;

    img {
      width: 400px;
      //height: 100%;
      display: block;
    }
  }
  //&-dividing {
  //  width: 1px;
  //  background: #ddd;
  //  margin: 12px 0;
  //}
  &-right {

    padding: 24px 12px;
    &/deep/ .el-input__inner {
      box-shadow: none;
      border-radius: 0;
      border-bottom: 1px solid #eee;
    }
    &-title {
      font-weight: 500;
      text-align: center;
      font-size: 20px;
      line-height: 24px;
      margin-bottom: 24px;
    }
    &-formbox {
      flex: 1;
      height: 100%;
      display: flex;
      align-items: center;
      flex-direction: column;

      &-elForm {
        width: 100%;
        height: 70%;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
      }
    }
    &-input {
      width: 280px;
      .input-prefix-icon {
        margin: auto;
      }
    }
  }
}
</style>

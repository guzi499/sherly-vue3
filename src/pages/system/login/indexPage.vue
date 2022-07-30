<!--
 * @Author: lihaoyu
 * @Date: 2022-03-30 01:06:51
 * @LastEditTime: 2022-07-31 02:28:50
 * @LastEditors: lihaoyu
 * @Description:
 * @FilePath: /sherly-vue3/src/pages/system/login/indexPage.vue
-->
<template>
  <div class="sherly-page">
    <div class="login-layout">
      <div class="login-layout-left">
        <!--        <img src="../../assets/sherly-logo.png" alt="" />-->
        <img src="../../../assets/sherly-logo-simple.png" alt="" />
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
                @keyup.enter="handlelogin()"
              >
                <template #prefix>
                  <el-icon class="input-prefix-icon" color="#000"
                    ><unlock
                  /></el-icon>
                </template>
              </el-input>
            </el-form-item>
            <el-form-item>
              <el-button
                class="login-layout-right-button"
                @click="handlelogin()"
                style="width: 60%; margin: 0 auto"
              >
                登 录
              </el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </div>
    <el-dialog
      v-model="dialogVisible"
      title="请选择租户"
      width="400px"
      :before-close="handleClose"
    >
      <el-radio-group v-model="selectTenant">
        <el-radio
          :label="list.tenantCode"
          v-for="list in tenantList"
          :key="list.tenantCode"
          >{{ list.tenantName }}</el-radio
        >
      </el-radio-group>
      <template #footer>
        <span class="dialog-footer">
          <el-button type="primary" @click="confirm"> 确定</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>
<script>
import { reactive, onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import {
  login,
  //  getAvailablelist
} from "@/api/system/login";
import { heartBzeat } from "@/api/system/generic";
import Cookies from "js-cookie";
import { ElMessage } from "element-plus";

export default {
  setup() {
    const router = useRouter();
    let loginForm = reactive({
      phone: "",
      password: "",
    });
    const dialogVisible = ref(false);
    const selectTenant = ref(null);
    const tenantList = reactive([]);

    onMounted(() => {
      getCookie();
      handleHeartBzeat();
    });

    const handlelogin = () => {
      login(loginForm).then((res) => {
        localStorage.setItem("token", res.token);
        router.replace({ path: "/home" });
      });
      // .catch((res) => {
      //   if (res.code)
      //     getAvailablelist(loginForm.phone).then((_res) => {
      //       tenantList.length = 0;
      //       _res.forEach((i) => {
      //         tenantList.push(i);
      //       });
      //       dialogVisible.value = true;
      //     });
      // });
    };

    // 获取cookie
    const getCookie = () => {
      const phone = Cookies.get("phone");
      loginForm.phone = phone === undefined ? loginForm.phone : phone;
    };

    // 心跳检测
    const handleHeartBzeat = () => {
      heartBzeat().then(() => {
        router.replace({ path: "/home" });
      });
    };

    // 取消
    const handleClose = () => {
      dialogVisible.value = false;
      selectTenant.value = null;
    };

    // 确定
    const confirm = () => {
      if (selectTenant.value) {
        dialogVisible.value = false;
        router.replace({ path: "/home" });
      } else {
        ElMessage({
          message: "请选择租户",
          type: "warning",
        });
      }
    };
    return {
      loginForm,
      dialogVisible,
      selectTenant,
      handlelogin,
      getCookie,
      handleClose,
      confirm,
      tenantList,
    };
  },
};
</script>

<style lang="scss" scoped>
.sherly-page {
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
    &:deep(.el-input__inner) {
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
:deep(.el-radio-group) {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}
</style>

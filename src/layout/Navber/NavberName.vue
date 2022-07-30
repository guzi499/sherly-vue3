<!--
 * @Author: lihaoyu
 * @Date: 2022-04-01 23:17:57
 * @LastEditTime: 2022-07-31 02:34:42
 * @LastEditors: lihaoyu
 * @Description:
 * @FilePath: /sherly-vue3/src/layout/Navber/NavberName.vue
-->
<template>
  <div class="Navbar-wrapper">
    <div style="font-size: 1.25rem" class="header_left">
      <el-radio-group v-model="isCollapse" @change="handleLogo">
        <el-radio-button :label="true" v-if="isCollapse == false">
          <fold style="width: 1em; height: 1em" />
        </el-radio-button>
        <el-radio-button :label="false" v-if="isCollapse == true">
          <expand style="width: 1em; height: 1em" />
        </el-radio-button>
        <div style="font-size: 1rem">{{ config.systemName }}</div>
      </el-radio-group>
    </div>
    <div class="header_right">
      <el-row>
        <el-avatar
          size="small"
          :src="userInfo.avatar"
          style="margin-right: 0.5rem"
        />
        <el-dropdown style="margin: auto 0">
          <span class="el-dropdown-link">
            {{ userInfo.realName }}
            <el-icon class="el-icon--right">
              <arrow-down />
            </el-icon>
          </span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item @click="handleGoPersonal('/personal')">
                个人中心
              </el-dropdown-item>
              <el-dropdown-item @click="handleChangeTenant">
                切换租户
              </el-dropdown-item>
              <el-dropdown-item @click="handleLogout">
                退出登录
              </el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </el-row>
    </div>
    <el-dialog
      v-model="dialogVisible"
      title="请选择租户"
      width="400px"
      :before-close="handleClose"
    >
      <div class="radio">
        <el-radio-group v-model="selectTenant">
          <el-radio
            :label="list.tenantCode"
            v-for="list in tenantList"
            :key="list.tenantCode"
          >
            {{ list.tenantName }}
          </el-radio>
        </el-radio-group>
      </div>
      <template #footer>
        <span class="dialog-footer">
          <el-button type="primary" @click="confirm"> 确定</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>
<script>
import { reactive, ref } from "vue";
import Config from "@/config";
import { useRouter } from "vue-router";
import Cookies from "js-cookie";
import { logout, loginchange, getAvailablelist } from "@/api/system/login.js";
import store from "@/store";
import { ElMessage } from "element-plus";

export default {
  setup(props, { emit }) {
    /* 控制头部按钮的切换 */
    const isCollapse = ref(false);
    const handleLogo = (val) => {
      emit("isCollapse", val);
    };
    /* 用户信息 */
    const userInfo = JSON.parse(Cookies.get("userInfo")) || "";
    const config = ref(Config);
    const router = useRouter();
    const dialogVisible = ref(false);
    const selectTenant = ref(null);
    const tenantList = reactive([]);

    /* 退出登录 */
    const handleLogout = () => {
      logout().then(() => {
        Cookies.remove("phone");
        Cookies.remove("metaTitle");
        Cookies.remove("userInfo");
        Cookies.remove("routePath");
        Cookies.remove("password");
        localStorage.removeItem("token");
        store.dispatch("router/loadMenus", true);
        router.replace("/login");
        location.reload();
      });
    };

    /* 跳转到个人中心 */
    const handleGoPersonal = (path) => {
      router.push({ path, query: { userId: userInfo.userId } });
    };

    const handleChangeTenant = () => {
      selectTenant.value = userInfo.tenantCode;
      getAvailablelist(userInfo.phone).then((_res) => {
        tenantList.length = 0;
        _res.forEach((i) => {
          tenantList.push(i);
        });
        dialogVisible.value = true;
      });
    };

    // 取消
    const handleClose = () => {
      dialogVisible.value = false;
      selectTenant.value = null;
    };

    // 确定
    const confirm = async () => {
      if (selectTenant.value) {
        dialogVisible.value = false;
        await loginchange(selectTenant.value);
        router.replace({ path: "/home" });
        location.reload();
      } else {
        ElMessage({
          message: "请选择租户",
          type: "warning",
        });
      }
    };
    return {
      isCollapse,
      config,
      userInfo,
      handleLogo,
      handleLogout,
      handleGoPersonal,
      handleChangeTenant,
      handleClose,
      selectTenant,
      confirm,
      tenantList,
      dialogVisible,
    };
  },
};
</script>
<style lang="scss" scoped>
.header_left {
  display: flex;
}

.Navbar-wrapper {
  width: 100%;
  padding: 0.5rem;
  background: #fff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 1px 4px #00152914;
  overflow: hidden;
}

:deep(.el-radio-button__inner) {
  border: none !important;
  font-size: 24px;
}
.radio {
  :deep(.el-radio-group) {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }
}
</style>

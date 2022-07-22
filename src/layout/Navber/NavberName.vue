<!--
 * @Author: lihaoyu
 * @Date: 2022-04-01 23:17:57
 * @LastEditTime: 2022-07-21 23:29:32
 * @LastEditors: lihaoyu
 * @Description:
 * @FilePath: /sherly-vue3/src/layout/Navber/NavberName.vue
-->
<template>
  <div class="Navber-wrapper">
    <div style="font-size: 1.25rem" class="header_left">
      <el-radio-group v-model="isCollapse" @change="handleLogo">
        <el-radio-button :label="true" v-if="isCollapse == false">
          <fold style="width: 1em; height: 1em" />
        </el-radio-button>
        <el-radio-button :label="false" v-if="isCollapse == true">
          <expand style="width: 1em; height: 1em" />
        </el-radio-button>
        <div style="font-size: 1rem">{{ config.systemName }}</div>
        -->
      </el-radio-group>
      <!--      <el-row>-->
      <!--        <expand-->
      <!--            style="width: 1em; height: 1em; margin-right: 0.5rem"-->
      <!--            v-if="datas.isShow == 1"-->
      <!--            @click="handleSide"-->
      <!--        />-->
      <!--        <fold-->
      <!--            style="width: 1em; height: 1em; margin-right: 0.5rem"-->
      <!--            v-if="datas.isShow == 0"-->
      <!--            @click="handleSide"-->
      <!--        />-->
      <!--        <div style="font-size: 1rem">{{ config.systemName }}</div>-->
      <!--      </el-row>-->
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
              <el-dropdown-item @click="handleGoPersonal('/personal')"
                >个人中心</el-dropdown-item
              >
              <el-dropdown-item @click="logout">退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </el-row>
    </div>
  </div>
</template>
<script>
import { ref } from "vue";
import Config from "@/config";
import { useRouter } from "vue-router";
import Cookies from "js-cookie";
import server from "@/api/login.js";
import store from "@/store";

export default {
  setup(props, { emit }) {
    /**控制头部按钮的切换 */
    const isCollapse = ref(false);
    const handleLogo = (val) => {
      emit("isCollapse", val);
    };
    /**用户姓名 */
    console.log(Cookies.get("userInfo"));
    const userInfo = JSON.parse(Cookies.get("userInfo")) || "";
    const config = ref(Config);
    const router = useRouter();

    // 退出登录
    const logout = () => {
      server.logout().then(() => {
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

    // 跳转到个人中心
    const handleGoPersonal = (path) => {
      router.push({ path, query: { userId: userInfo.userId } });
    };
    return {
      isCollapse,
      handleLogo,
      config,
      userInfo,
      logout,
      handleGoPersonal,
    };
  },
};
</script>
<style lang="scss" scoped>
.header_left {
  display: flex;
}

.Navber-wrapper {
  width: 100%;
  padding: 0.5rem;
  background: #fff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 1px 4px #00152914;
  overflow: hidden;
}

:deep .el-radio-button__inner {
  border: none !important;
  font-size: 24px;
}
</style>

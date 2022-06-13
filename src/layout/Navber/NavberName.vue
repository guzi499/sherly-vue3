<!--
 * @Author: lihaoyu
 * @Date: 2022-04-01 23:17:57
 * @LastEditTime: 2022-06-12 19:52:07
 * @LastEditors: lihaoyu
 * @Description:
 * @FilePath: /sherly-vue3/src/layout/Navber/NavberName.vue
-->
<template>
  <div class="Navber-wrapper">
    <div style="font-size: 1.25rem" class="header_left">
      <el-row>
        <expand
          style="width: 1em; height: 1em; margin-right: 0.5rem"
          v-if="datas.isShow == 1"
          @click="handleSide"
        />
        <fold
          style="width: 1em; height: 1em; margin-right: 0.5rem"
          v-if="datas.isShow == 0"
          @click="handleSide"
        />
        <div style="font-size: 1rem">{{ config.systemName }}</div>
      </el-row>
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
              <el-dropdown-item>个人中心</el-dropdown-item>
              <el-dropdown-item @click="logout">退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </el-row>
    </div>
  </div>
</template>
<script>
import { reactive, ref } from "vue";
import Config from "@/config";
import { useRouter } from "vue-router";
import Cookies from "js-cookie";
import server from "@/api/login.js";

export default {
  setup() {
    /**用户姓名 */
    const userInfo = JSON.parse(Cookies.get("userInfo")) || "";
    const config = ref(Config);
    const router = useRouter();
    /**控制头部按钮的切换 */
    const datas = reactive({
      isShow: 0,
    });
    const handleSide = () => {
      datas.isShow == 0 ? (datas.isShow = 1) : (datas.isShow = 0);
    };

    // 退出登录
    const logout = () => {
      server.logout().then(() => {
        Cookies.remove("phone");
        Cookies.remove("metaTitle");
        Cookies.remove("userInfo");
        Cookies.remove("routePath");
        Cookies.remove("password");
        router.push("/login");
      });
    };
    return { datas, handleSide, config, userInfo, logout };
  },
};
</script>
<style lang="scss" scoped>
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
</style>

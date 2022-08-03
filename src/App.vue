<!--
 * @author: 李浩宇
 * @date: 2022-03-28
-->
<template>
  <el-config-provider :locale="locale">
    <router-view> </router-view>
  </el-config-provider>
</template>

<script>
import { onMounted } from "vue";
import store from "@/store";
import zhCn from "element-plus/lib/locale/lang/zh-cn";

export default {
  name: "App",
  setup() {
    onMounted(() => {
      store.dispatch("user/setApi", process.env.VUE_APP_URL);
    });
    return { locale: zhCn };
  },
};
</script>

<style></style>

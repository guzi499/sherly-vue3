<!--
 * @Author: lihaoyu
 * @Date: 2022-03-28 23:41:35
 * @LastEditTime: 2022-04-20 23:45:58
 * @LastEditors: lihaoyu
 * @Description:
 * @FilePath: /sherly-vue3/src/App.vue
-->
<template>
  <el-config-provider :locale="locale">
    <router-view>
    </router-view>
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
    return {locale: zhCn};
  },
};
</script>

<style></style>

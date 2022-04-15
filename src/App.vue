<!--
 * @Author: lihaoyu
 * @Date: 2022-03-28 23:41:35
 * @LastEditTime: 2022-04-14 23:29:22
 * @LastEditors: lihaoyu
 * @Description: 
 * @FilePath: /sherly-vue3/src/App.vue
-->
<template>
  <router-view />
</template>

<script>
import { onMounted } from "vue";
import store from "@/store";

export default {
  name: "App",
  setup() {
    onMounted(() => {
      console.log(process.env.VUE_APP_URL);
      store.dispatch("user/setApi", process.env.VUE_APP_URL);
    });
  },
};
</script>

<style></style>

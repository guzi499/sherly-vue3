<!--
 * @Author: lihaoyu
 * @Date: 2022-04-07 21:51:36
 * @LastEditTime: 2022-04-07 22:17:10
 * @LastEditors: lihaoyu
 * @Description: 
 * @FilePath: /sherly-vue3/src/layout/Sidebar/components/LogoBox.vue
-->
<template>
  <div class="logo-warpper">
    <img
      style="width: 32px; height: 32px"
      src="../../../assets/sherlyLogo.jpg"
    />
    <text>{{ config.systemName }}</text>
  </div>
</template>

<script>
import Config from "@/config";
import { ref } from "vue";
export default {
  setup() {
    const config = ref(Config);
    return {
      config,
    };
  },
};
</script>
<style lang="scss" scoped>
.logo-warpper {
  padding: 24px 0;
  color: #fff;
  font-weight: 500;
  font-size: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>

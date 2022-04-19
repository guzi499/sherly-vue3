<!--
 * @Author: lihaoyu
 * @Date: 2022-04-01 23:17:38
 * @LastEditTime: 2022-04-19 11:21:18
 * @LastEditors: lihaoyu
 * @Description: 
 * @FilePath: /sherly-vue3/src/layout/AppMain/AppMain.vue
-->
<template>
  <div class="AppMain-wrapper">
    <router-view />
  </div>
</template>
<script>
export default {
  setup() {},
};
</script>
<style lang="scss" scoped>
.AppMain-wrapper {
  flex: 1;
  margin: 12px;
  background: #fff;
  border-radius: 8px;
}
</style>

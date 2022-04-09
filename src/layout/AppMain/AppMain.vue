<!--
 * @Author: lihaoyu
 * @Date: 2022-04-01 23:17:38
 * @LastEditTime: 2022-04-09 01:58:51
 * @LastEditors: lihaoyu
 * @Description: 
 * @FilePath: /sherly-vue3/src/layout/AppMain/AppMain.vue
-->
<template>
  <div class="AppMain-warpper"><router-view /></div>
</template>
<script>
export default {
  setup() {},
};
</script>
<style lang="scss" scoped>
.AppMain-warpper {
  flex: 1;
  margin: 8px;
  border: 1px solid #ccc;
  text-align: center;
}
</style>

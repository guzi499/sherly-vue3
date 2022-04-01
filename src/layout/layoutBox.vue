<!--
 * @Author: lihaoyu
 * @Date: 2022-04-01 23:14:11
 * @LastEditTime: 2022-04-02 00:09:20
 * @LastEditors: lihaoyu
 * @Description: 
 * @FilePath: /sherly-vue3/src/layout/layoutBox.vue
-->
<template>
  <div class="sherly-warpper">
    <div class="sherly-warpper-Sidebar">
      <Sidebar />
    </div>
    <div class="sherly-warpper-content">
      <Navber />
      <TagsView />
      <AppMain />
    </div>
  </div>
</template>
<script>
import Navber from "./Navber/NavberName.vue";
import Sidebar from "./Sidebar/SidebarName.vue";
import TagsView from "./TagsView/TagsView.vue";
import AppMain from "./AppMain/AppMain.vue";

export default {
  components: {
    Navber,
    Sidebar,
    TagsView,
    AppMain,
  },
  setup() {},
};
</script>
<style lang="scss"></style>

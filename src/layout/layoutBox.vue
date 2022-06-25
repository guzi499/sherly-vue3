<!--
 * @Author: lihaoyu
 * @Date: 2022-04-01 23:14:11
 * @LastEditTime: 2022-04-02 00:09:20
 * @LastEditors: lihaoyu
 * @Description:
 * @FilePath: /sherly-vue3/src/layout/layoutBox.vue
-->
<template>
  <div class="sherly-wrapper">
    <div class="sherly-wrapper-Sidebar" :style="'width:' + width + 'px'">
      <Sidebar :isShow="isShow"/>
    </div>
    <div class="sherly-wrapper-content" style="width: 100%">
      <Navber @isCollapse="isCollapse"/>
      <TagsView/>
      <AppMain/>
    </div>
  </div>
</template>
<script>
import {ref, watch} from 'vue'
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
  setup() {
    const isShow = ref(false)
    const isCollapse = (val) => {
      isShow.value = val
    }
    const width = ref(200)
    watch(
        isShow,
        (val) => {
          val ? width.value = 64 : width.value = 200
        }
    )
    return {isShow, isCollapse, width}
  },
};
</script>
<style lang="scss">
.sherly-wrapper-Sidebar {
  transition: all 0.2s;
}
</style>

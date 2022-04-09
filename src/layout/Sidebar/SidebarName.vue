<!--
 * @Author: lihaoyu
 * @Date: 2022-04-01 23:22:23
 * @LastEditTime: 2022-04-09 11:59:57
 * @LastEditors: lihaoyu
 * @Description: 
 * @FilePath: /sherly-vue3/src/layout/Sidebar/SidebarName.vue
-->
<template>
  <div class="sidebar-warpper">
    <Logo />
    <el-tree :data="Tree" :props="defaultProps" @node-click="handleNodeClick" />
  </div>
</template>
<script>
// import Item from "./components/SidebarItem.vue";
import Logo from "./components/LogoBox.vue";
import { useStore } from "vuex";
// import server from "@/api/router";
import { onMounted, watch, computed } from "vue";
import { useRouter } from "vue-router";

export default {
  components: {
    Logo,
    // Item,
  },
  setup() {
    onMounted(() => {
      //
    });

    const Store = useStore();
    console.log(Store.state.router.menuList);
    const router = useRouter();
    let Tree = computed(() => {
      return Store.state.router.menuList;
    });
    watch(
      Tree,
      (newVal, oldVal) => {
        console.log("newVal, oldVal", newVal, oldVal);
      },
      { immediate: true, deep: true }
    );
    const defaultProps = {
      children: "children",
      label: "menuName",
    };
    const handleNodeClick = (data) => {
      if (data.link) {
        console.log(data.link);
        router.push({ path: data.link });
      }
    };

    return {
      Tree,
      defaultProps,
      handleNodeClick,
    };
  },
};
</script>
<style lang="scss" scoped>
.sidebar-warpper {
  height: 100%;
  background: #334154;
  text-align: center;
  width: 200px;
  & > .el-tree {
    background: #334154;
    color: #000;
    .el-tree-node__content:hover {
      background: #33415495;
    }
  }
}
</style>

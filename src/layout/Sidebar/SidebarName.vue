<!--
 * @Author: lihaoyu
 * @Date: 2022-04-01 23:22:23
 * @LastEditTime: 2022-04-13 00:35:07
 * @LastEditors: lihaoyu
 * @Description: 
 * @FilePath: /sherly-vue3/src/layout/Sidebar/SidebarName.vue
-->
<template>
  <div class="sidebar-warpper">
    <Logo />
    <div class="menu-box">
      <el-menu
        class="el-menu-vertical-demo"
        :collapse="isCollapse"
        @open="handleOpen"
        @close="handleClose"
        @select="handleselect"
        background-color="#334154"
        text-color="#fff"
      >
        <el-sub-menu
          v-for="item_1 in menu"
          :key="item_1.index"
          :index="item_1.index"
        >
          <template #title>
            <el-icon><location /></el-icon>
            <span>{{ item_1.menuName }}</span>
          </template>
          <el-menu-item-group>
            <el-menu-item
              v-for="item_2 in item_1.children"
              :key="item_2.index"
              :index="item_2.index"
              ><template #title>
                <el-icon><location /></el-icon>
                <span>{{ item_2.menuName }}</span>
              </template></el-menu-item
            >
          </el-menu-item-group>
        </el-sub-menu>
      </el-menu>
    </div>
  </div>
</template>
<script>
// import Item from "./components/SidebarItem.vue";
import Logo from "./components/LogoBox.vue";
import { useStore } from "vuex";
// import server from "@/api/router";
import { onMounted, watch, computed, ref, reactive, toRaw } from "vue";
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

    const router = useRouter();

    const isCollapse = ref(false);

    let Tree = computed(() => {
      return Store.state.router.menuList;
    });

    let menu = reactive([]);

    const formatMenu = (tree) => {
      const menu = [];
      tree.forEach((i, index) => {
        i.children = formatMenuchildren(i.children, index);
        const temp = Object.assign(i, { index: `${index + 1}` });
        menu.push(temp);
      });
      return menu;
    };

    const formatMenuchildren = (children, index) => {
      const _children = [];
      children.forEach((i, _index) => {
        i.children = formatMenuchildren(i.children, index);
        const _temp = Object.assign(i, {
          index: `${index + 1}-${_index + 1}`,
        });
        _children.push(_temp);
      });
      return _children;
    };

    watch(
      Tree,
      (newVal) => {
        menu = formatMenu(toRaw(newVal));
      },
      { immediate: true, deep: true }
    );

    const handleNodeClick = (data) => {
      if (data.link) {
        console.log(data.link);
        router.push({ path: data.link });
      }
    };

    const handleOpen = (key, keyPath) => {
      console.log(key, keyPath);
    };

    const handleClose = (key, keyPath) => {
      console.log(key, keyPath);
    };

    const handleselect = (index) => {
      const path = findPath(index, menu);
      router.push({ path });
    };

    const findPath = (index, lists) => {
      let link = "";
      lists.forEach((i) => {
        if (lists.find((j) => j.index === index)) {
          link = lists.find((j) => j.index === index).link;
        } else if (!link && i.children) {
          link = findPath(index, i.children);
        }
      });
      return link;
    };

    return {
      isCollapse,
      menu,
      handleNodeClick,
      handleClose,
      handleOpen,
      handleselect,
    };
  },
};
</script>
<style lang="scss" scoped>
.sidebar-warpper {
  height: 100vh;
  background: #334154;
  text-align: center;
  width: 200px;
  overflow: hidden;
  .menu-box {
    height: calc(100vh - 80px);
    width: 220px;
    overflow: scroll;
  }
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  border: none;
}
</style>

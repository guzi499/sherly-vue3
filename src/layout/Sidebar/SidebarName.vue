<!--
 * @Author: lihaoyu
 * @Date: 2022-04-01 23:22:23
 * @LastEditTime: 2022-07-21 21:35:55
 * @LastEditors: lihaoyu
 * @Description:
 * @FilePath: /sherly-vue3/src/layout/Sidebar/SidebarName.vue
-->
<template>
  <!--  <div class="sidebar-wrapper" ref="sideBar" :style="'width:'+ isShow ? 64 + 'px' : 200 + 'px'">-->
  <div class="sidebar-wrapper" ref="sideBar" :style="'width:' + width + 'px'">
    <Logo :isShow="isShow" />
    <div class="menu-box">
      <el-menu
        unique-opened
        class="el-menu-vertical-demo"
        :collapse="isShow"
        :collapse-transition="false"
        @open="handleOpen"
        @close="handleClose"
        @select="handleselect"
        background-color="#334154"
        text-color="#fff"
        style="border-right: 0"
      >
        <el-sub-menu
          v-for="item_1 in menu"
          :key="item_1.index"
          :index="item_1.index"
        >
          <template #title>
            <el-icon>
              <location />
            </el-icon>
            <span>{{ item_1.menuName }}</span>
          </template>
          <template v-for="item_2 in item_1.children" :key="item_2.index">
            <template v-if="item_2.children.length === 0">
              <el-menu-item :index="item_2.index">
                <template #title>
                  <el-icon><location /></el-icon>
                  <span>{{ item_2.menuName }}</span>
                </template>
              </el-menu-item>
            </template>
            <template v-else>
              <el-sub-menu :index="item_2.index">
                <template #title>
                  <el-icon><location /></el-icon>
                  <span>{{ item_2.menuName }}</span>
                </template>
                <el-menu-item
                  v-for="item_3 in item_2.children"
                  :key="item_3.index"
                  :index="item_3.index"
                >
                  <template #title>
                    <el-icon><location /></el-icon>
                    <span>{{ item_3.menuName }}</span>
                  </template></el-menu-item
                >
              </el-sub-menu></template
            >
          </template>
        </el-sub-menu>
      </el-menu>
    </div>
  </div>
</template>
<script>
import Logo from "./components/LogoBox.vue";
import { useStore } from "vuex";
import { onMounted, watch, computed, ref, reactive, toRaw, toRefs } from "vue";
import { useRouter } from "vue-router";

export default {
  components: {
    Logo,
  },
  props: {
    isShow: {
      type: Boolean,
      default: false,
    },
  },
  setup(props) {
    onMounted(() => {
      //
    });

    const { isShow } = toRefs(props);
    console.log(isShow);

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
        const temp = Object.assign(i, { index: `${index + 1}` });
        i.children = formatMenuchildren(i.children, temp.index);
        menu.push(temp);
      });
      return menu;
    };

    const formatMenuchildren = (children, index) => {
      const _children = [];
      children.forEach((i, _index) => {
        const _temp = Object.assign(i, {
          index: `${index}-${_index + 1}`,
        });
        i.children = formatMenuchildren(i.children, _temp.index);
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

    const width = ref(200);
    watch(
      () => props.isShow,
      (val) => {
        val ? (width.value = 64) : (width.value = 200);
      }
    );

    const handleNodeClick = (data) => {
      if (data.link) {
        router.push({ path: data.link });
      }
    };

    const handleOpen = (key, keyPath) => {
      console.log("open", key, keyPath);
    };

    const handleClose = (key, keyPath) => {
      console.log("close", key, keyPath);
    };

    const handleselect = (index) => {
      const path = "/" + findPath(index, menu);
      console.log("path", path);
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
      width,
    };
  },
};
</script>
<style lang="scss" scoped>
.sidebar-wrapper {
  height: 100vh;
  background: #334154;
  text-align: center;
  width: 200px;
  overflow: hidden;
  transition: all 0.2s;
  .menu-box {
    height: calc(100vh - 80px);
    width: 220px;
    //overflow: scroll;
  }
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  border: none;
}
</style>

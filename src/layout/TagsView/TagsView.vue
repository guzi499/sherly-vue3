<!--
 * @Author: lihaoyu
 * @Date: 2022-04-01 23:26:42
 * @LastEditTime: 2022-06-14 01:18:30
 * @LastEditors: lihaoyu
 * @Description:
 * @FilePath: /sherly-vue3/src/layout/TagsView/TagsView.vue
-->
<template>
  <div class="TagsView-wrapper">
    <el-scrollbar>
      <div class="scrollbar-flex-content">
        <div
          v-for="item in routePathList"
          :key="item.fullPath"
          class="scrollbar-demo-item"
          :class="isCurrentRouter(item) && 'scrollbar-demo-item-active'"
          @click="navigation(item.fullPath)"
          @contextmenu.prevent="openMenu($event, item)"
        >
          {{ item.meta?.title || "为命名" }}
          <template v-if="item.path !== '/home'">
            <img
              v-if="!isCurrentRouter(item)"
              src="@/assets/images/close.png"
              class="close"
              @click.stop="handleCloseRoute(item)"
            />
            <img
              v-if="isCurrentRouter(item)"
              src="@/assets/images/closeActive.png"
              class="close"
              @click.stop="handleCloseRoute(item)"
            />
          </template>
        </div>
      </div>
    </el-scrollbar>
    <div
      class="menu-box"
      v-if="visible"
      :style="{ top: top + 'px', left: left + 'px' }"
    >
      <div
        v-for="(cell, index) in operateList"
        :key="cell"
        @click="clickMenuCell(index)"
      >
        {{ cell }}
      </div>
    </div>
  </div>
</template>
<script>
import { useStore } from "vuex";
import { useRoute, useRouter } from "vue-router";
import { watch, reactive, ref } from "vue";
export default {
  setup() {
    const useRouterCurrent = reactive(useRouter());
    const store = useStore();
    const route = useRoute();
    const router = useRouter();
    const routePathList = store.state.tagViews.routePath;
    let visible = ref(false);
    let top = ref(0);
    let left = ref(0);
    let clickNote = reactive({});
    const operateList = [
      "关闭当前",
      "关闭其他",
      "关闭左侧",
      "关闭右侧",
      "全部关闭",
    ];
    watch(
      useRouterCurrent,
      (o) => {
        if (o) store.dispatch("UpdataRoutePath", o.currentRoute);
      },
      { immediate: true }
    );
    watch(visible, (o) => {
      if (o) {
        document.body.addEventListener("click", closeMenu);
      } else {
        document.body.removeEventListener("click", closeMenu);
      }
    });

    const navigation = (fullPath) => {
      router.push(fullPath);
    };

    //删除当前导航
    const handleCloseRoute = (item) => {
      const data = Object.assign({ ...item }, { bool: isCurrentRouter(item) });
      store.dispatch("delRoutePath", data).then((res) => {
        if (res.length > 0) {
          router.push(res[res.length - 1].fullPath);
        } else {
          router.push("/home");
        }
      });
    };

    // 删除其他导航
    const handleCloseOtherRoute = (item) => {
      store.dispatch("delOtherRoutePath", item).then(() => {
        if (item.fullPath !== route.fullPath) {
          navigation(item.fullPath);
        }
      });
    };

    // 删除左侧导航
    const handleDelLeftRoutePath = (item) => {
      store.dispatch("delLeftRoutePath", item).then((res) => {
        if (!res.find((i) => route.fullPath === i.fullPath)) {
          navigation(res[res.length - 1].fullPath);
        }
      });
    };

    // 删除右侧导航
    const handleDelRightRoutePath = (item) => {
      store.dispatch("delRightRoutePath", item).then((res) => {
        if (!res.find((i) => route.fullPath === i.fullPath)) {
          navigation(res[res.length - 1].fullPath);
        }
      });
    };

    // 删除全部导航
    const handleDelAllRoutePath = () => {
      store.dispatch("delAllRoutePath").then(() => {
        router.push("/home");
      });
    };

    const openMenu = (event, item) => {
      visible.value = true;
      top.value = event.clientY;
      left.value = event.clientX;
      Object.keys(item).forEach((i) => {
        clickNote[i] = item[i];
      });
    };

    const closeMenu = () => {
      visible.value = false;
    };

    const clickMenuCell = (index) => {
      switch (index) {
        case 0:
          handleCloseRoute(clickNote);
          break;
        case 1:
          handleCloseOtherRoute(clickNote);
          break;
        case 2:
          handleDelLeftRoutePath(clickNote);
          break;
        case 3:
          handleDelRightRoutePath(clickNote);
          break;
        case 4:
          handleDelAllRoutePath();
          break;
      }
    };

    const isCurrentRouter = (currentRouter) => {
      if (currentRouter.fullPath.split("?")[0] === route.path) {
        return true;
      }
    };

    return {
      navigation,
      handleCloseRoute,
      isCurrentRouter,
      openMenu,
      closeMenu,
      clickMenuCell,
      visible,
      clickNote,
      left,
      top,
      routePathList,
      operateList,
    };
  },
};
</script>
<style lang="scss" scoped>
a {
  text-decoration: none;
}

.TagsView-wrapper {
  height: 67px;
  width: 100%;
  padding: 8px;
  line-height: 100%;
  background: #fff;
  box-shadow: 0 1px 3px 0 #0000001f, 0 0 3px 0 #0000000a;
  border-bottom: 1px solid #d8dce5;

  .scrollbar-flex-content {
    display: flex;
  }
  .menu-box {
    position: absolute;
    box-shadow: 0 1px 3px 0 #0000001f, 0 0 3px 0 #0000000a;
    border-radius: 4px;
    background: #fff;
    padding: 4px 4px;
    font-size: 12px;
    z-index: 9;
    width: 64px;
    cursor: pointer;

    div {
      padding: 4px 4px;
      color: #333;
      border-radius: 4px;
      &:hover {
        background: #eee;
      }
    }
  }
  .scrollbar-demo-item {
    flex-shrink: 0;
    display: flex;
    align-items: center;
    height: 30px;
    margin: 10px;
    text-align: center;
    border-radius: 4px;
    background: #fff;
    color: #333;
    padding: 0 28px 0 12px;
    cursor: pointer;
    box-shadow: 0 1px 3px 0 #0000001f, 0 0 3px 0 #0000000a;
    position: relative;
  }
  .scrollbar-demo-item-active {
    background: var(--el-color-primary);
    color: #fff;
  }
  .close {
    height: 16px;
    width: 16px;
    border-radius: 50%;
    // background: #ccc;
    position: absolute;
    right: 8px;
    text-align: center;
    line-height: 12px;
    &:hover {
      background: #ccc;
    }
  }
}
</style>

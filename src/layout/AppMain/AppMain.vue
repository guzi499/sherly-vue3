<!--
 * @Author: lihaoyu
 * @Date: 2022-04-01 23:17:38
 * @LastEditTime: 2022-07-31 23:04:46
 * @LastEditors: lihaoyu
 * @Description:
 * @FilePath: /sherly-vue3/src/layout/AppMain/AppMain.vue
-->
<template>
  <div class="AppMain-wrapper">
    <div class="AppMain-wrapper-content">
      <div class="AppMain-wrapper-page">
        <!-- <transition> -->
        <router-view />
        <!-- </transition> -->
      </div>
    </div>
  </div>
</template>
<script>
// import { watch, ref } from "vue";
// import { useRouter } from "vue-router";

export default {
  setup() {
    // const router = useRouter();
    // let transitionName = ref("");
    // watch(
    //   () => router.currentRoute.value.path,
    //   (to, from) => {
    //     //要执行的方法
    //     transitionName = "slide-left";
    //     // if (to.meta.index > from.meta.index) {
    //     //   //设置动画名称
    //     //   transitionName = "slide-left";
    //     // } else {
    //     //   transitionName = "slide-right";
    //     // }
    //   },
    //   { immediate: true, deep: true }
    // );
    // return {
    //   transitionName,
    // };
  },
};
</script>
<style lang="scss" scoped>
.AppMain-wrapper {
  height: 0;
  flex: 1;
  position: relative;
  padding: 12px;

  .AppMain-wrapper-content {
    position: absolute;
    left: 12px;
    right: 12px;
    top: 12px;
    bottom: 12px;
    background: #fff;
    border-radius: 8px;
    overflow: hidden;
    padding: 12px;

    .AppMain-wrapper-page {
      height: 100%;
      overflow: auto;
    }
  }
}
.slide-right-enter-active,
.slide-right-leave-active,
.slide-left-enter-active,
.slide-left-leave-active {
  will-change: transform;
  transition: all 500ms;
  position: absolute;
}

.slide-right-enter {
  opacity: 0;
  transform: translate3d(-100%, 0, 0);
}

.slide-right-leave-active {
  opacity: 0;
  transform: translate3d(100%, 0, 0);
}

.slide-left-enter {
  opacity: 0;
  transform: translate3d(100%, 0, 0);
}

.slide-left-leave-active {
  opacity: 0;
  transform: translate3d(-100%, 0, 0);
}
</style>

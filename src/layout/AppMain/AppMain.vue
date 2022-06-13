<!--
 * @Author: lihaoyu
 * @Date: 2022-04-01 23:17:38
 * @LastEditTime: 2022-06-14 01:35:46
 * @LastEditors: lihaoyu
 * @Description: 
 * @FilePath: /sherly-vue3/src/layout/AppMain/AppMain.vue
-->
<template>
  <div class="AppMain-wrapper">
    <transition :name="transitionName">
      <router-view />
    </transition>
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
  flex: 1;
  margin: 12px;
  background: #fff;
  border-radius: 8px;
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

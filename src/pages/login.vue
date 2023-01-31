<template>
  <div class="">
    <button @click="() => router.push('/home')">登录成功</button>
  </div>
</template>

<script lang="ts" setup>
// import {
//   ref,
//   reactive,
//   toRefs,
//   computed,
//   onMounted,
//   watchEffect,
//   watch,
// } from "vue";
import { useRoute, useRouter } from "vue-router";
const router = useRouter();
// const data = reactive({
//   // 数据源的存放地
// });
// onMounted(() => {
//   // 初始化渲染
// });
</script>

<style scoped>
</style>

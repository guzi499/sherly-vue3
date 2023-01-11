<template>
  <div class="wrap-box">首页</div>
</template>

<script lang="ts" setup>
import {
  ref,
  reactive,
  toRefs,
  computed,
  onMounted,
  watchEffect,
  watch,
} from "vue";
import { useRoute, useRouter } from "vue-router";
import {useStore} from "@/store";
const store = useStore();
const route = useRoute();
const router = useRouter();
const data = reactive({
  // 数据源的存放地
});
onMounted(() => {
  // 初始化渲染
});
</script>

<style scoped>
.wrap-box {
}
</style>

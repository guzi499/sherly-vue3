<!--
 * @Author: lihaoyu
 * @Date: 2022-07-07 22:48:19
 * @LastEditTime: 2022-07-14 00:09:43
 * @LastEditors: lihaoyu
 * @Description: 
 * @FilePath: /sherly-vue3/src/pages/system/storage/storagePage.vue
-->
<template>
  <div class="sherly-page-wrapper">
    <el-tabs v-model="activeName" class="demo-tabs">
      <el-tab-pane label="存储内容" name="first"><StorageConfig /></el-tab-pane>
      <el-tab-pane label="内容管理" name="second"></el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import { ref } from "vue";
import StorageConfig from "./storageConfig.vue";
export default {
  components: { StorageConfig },
  setup() {
    const activeName = ref("first");
    return {
      activeName,
    };
  },
};
</script>

<style lang="scss" scoped></style>

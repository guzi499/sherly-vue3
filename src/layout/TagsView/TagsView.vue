<!--
 * @Author: lihaoyu
 * @Date: 2022-04-01 23:26:42
 * @LastEditTime: 2022-04-02 00:18:35
 * @LastEditors: lihaoyu
 * @Description: 
 * @FilePath: /sherly-vue3/src/layout/TagsView/TagsView.vue
-->
<template>
  <div class="TagsView-warpper">
    <el-dropdown trigger="contextmenu" @visible-change="handleVisible2">
      <el-scrollbar class="scrollbar_inner">
          <p
              v-for="item in $store.state.tagViews.metaTitle"
              :key="item"
              class="scrollbar-demo-item"
            >
              <i>{{ item.title }}</i>
              <i class="close" @click="handleCloseRoute">x</i>
            </p>
        </el-scrollbar>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item>刷新页面</el-dropdown-item>
          <el-dropdown-item>关闭当前</el-dropdown-item>
          <el-dropdown-item>关闭其他</el-dropdown-item>
          <el-dropdown-item>关闭左侧</el-dropdown-item>
          <el-dropdown-item>关闭右侧</el-dropdown-item>
          <el-dropdown-item>全部关闭</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>
<script>
export default {
  setup() {
    // 点击关闭存储的路由
    const handleCloseRoute = () => {
      console.log('关闭');
    }
    return {handleCloseRoute}
  },
};
</script>
<style lang="scss" scoped>
.TagsView-warpper {
  padding: 8px;
  border: 1px solid #ccc;
  line-height: 100%;
  cursor: pointer;
  .scrollbar-demo-item {
    i {
      font-style: normal;
      font-size: 0.5rem;
    }
    flex-shrink: 0;
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    width: 4rem;
    height: 1.3rem;
    margin: 0.1rem;
    border-radius: 0.3rem;
    background-color: #8cc5ff;
    .close {
      width: 1rem;
      height: 1rem;
      text-align: center;
      line-height: 1rem;
    }
    .close:hover {
      font-size: 1rem;
    }
  }
}
</style>

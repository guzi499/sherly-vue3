<!--
 * @Author: lihaoyu
 * @Date: 2022-04-01 23:26:42
 * @LastEditTime: 2022-04-19 11:16:18
 * @LastEditors: lihaoyu
 * @Description:
 * @FilePath: /sherly-vue3/src/layout/TagsView/TagsView.vue
-->
<template>
  <div class="TagsView-wrapper">
    <el-dropdown trigger="contextmenu">
      <el-scrollbar>
        <div class="scrollbar-flex-content">
          <p v-for="item in metaTitle" :key="item" class="scrollbar-demo-item">
            <a :href="(item.title).split('-')[1]">{{ (item.title).split('-')[0] }}</a>
            <a href="javascript:;" class="close" @click="handleCloseRoute">x</a>
          </p>
        </div>
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
import {useStore} from 'vuex'
import Cookies from 'js-cookie'

export default {
  setup() {
    const store = useStore()
    const metaTitle = (store.state.tagViews.metaTitle)
    console.log(metaTitle[0].title.split('-'))
    // 点击关闭存储的路由
    const handleCloseRoute = () => {
      console.log("关闭");
      // 点击关闭时清除浏览器缓存信息
      Cookies.remove("metaTitle")
      location.reload()
    };
    return {handleCloseRoute, metaTitle};
  },
};
</script>
<style lang="scss" scoped>
a {
  text-decoration: none;
}

.TagsView-wrapper {
  width: 100%;
  padding: 8px;
  line-height: 100%;
  background: #fff;
  box-shadow: 0 1px 3px 0 #0000001f, 0 0 3px 0 #0000000a;
  border-bottom: 1px solid #d8dce5;

  .scrollbar-flex-content {
    display: flex;
  }

  .scrollbar-demo-item {
    flex-shrink: 0;
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    width: 90px;
    height: 30px;
    margin: 10px;
    text-align: center;
    border-radius: 4px;
    background: var(--el-color-danger-light-9);
    color: var(--el-color-danger);
  }
}
</style>

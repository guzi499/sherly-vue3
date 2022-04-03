<!--
 * @Author: lihaoyu
 * @Date: 2022-04-01 23:17:57
 * @LastEditTime: 2022-04-02 00:18:37
 * @LastEditors: lihaoyu
 * @Description: 
 * @FilePath: /sherly-vue3/src/layout/Navber/NavberName.vue
-->
<template>
  <div class="Navber-warpper">
    <div style="font-size: 1.25rem" class="header_left">
      <el-row>
        <expand
          style="width: 1em; height: 1em; margin-right: 0.5rem"
          v-if="datas.isShow == 1"
          @click="handleSide"
        />
        <fold
          style="width: 1em; height: 1em; margin-right: 0.5rem"
          v-if="datas.isShow == 0"
          @click="handleSide"
        />
        <div style="font-size: 1rem">{{ route.meta.title }}</div>
      </el-row>
    </div>
    <div class="header_right">
      <el-row>
        <el-avatar :size="sizeList" :src="circleUrl" style="margin-right: 0.5rem"/>
        <el-dropdown style="margin: auto 0">
          <span class="el-dropdown-link">
            个人中心
            <el-icon class="el-icon--right">
              <arrow-down />
            </el-icon>
          </span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item>个人中心</el-dropdown-item>
              <el-dropdown-item>修改资料</el-dropdown-item>
              <el-dropdown-item>退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </el-row>
    </div>
  </div>
</template>
<script>
import { reactive, toRefs } from "vue";
import { useRoute } from "vue-router";
export default {
  setup() {
    /**获取路由xinxi */
    const route = useRoute();
    /**控制头部按钮的切换 */
    const datas = reactive({
      isShow: 0,
    });
    const handleSide = () => {
      datas.isShow == 0 ? (datas.isShow = 1) : (datas.isShow = 0);
    };
    /**头像 */
    const state = reactive({
      circleUrl:
        "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",
      sizeList: "small",
    });
    const { circleUrl, sizeList } = toRefs(state);
    return { route, datas, handleSide, circleUrl, sizeList };
  },
};
</script>
<style lang="scss" scoped>
.Navber-warpper {
  padding: 0.5rem;
  border: 0.0625rem solid #ccc;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>

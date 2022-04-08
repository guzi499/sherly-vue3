<!--
 * @Author: lihaoyu
 * @Date: 2022-04-01 23:22:23
 * @LastEditTime: 2022-04-08 00:14:03
 * @LastEditors: lihaoyu
 * @Description: 
 * @FilePath: /sherly-vue3/src/layout/Sidebar/SidebarName.vue
-->
<template>
  <div class="sidebar-warpper">
    <Logo />
    <el-tree :data="Tree" :props="defaultProps" @node-click="handleNodeClick">
      <Item />
    </el-tree>
  </div>
</template>
<script>
import Item from "./components/SidebarItem.vue";
import Logo from "./components/LogoBox.vue";
// import server from "@/api/router";
import { onMounted } from "vue-demi";

export default {
  components: {
    Logo,
    Item,
  },
  setup() {
    onMounted(() => {
      //
    });
    const Tree = [
      {
        label: "Level one 1",
        children: [
          {
            label: "Level two 1-1",
            children: [
              {
                label: "Level three 1-1-1",
              },
            ],
          },
        ],
      },
      // {
      //   label: "Level one 2",
      //   children: [
      //     {
      //       label: "Level two 2-1",
      //       children: [
      //         {
      //           label: "Level three 2-1-1",
      //         },
      //       ],
      //     },
      //     {
      //       label: "Level two 2-2",
      //       children: [
      //         {
      //           label: "Level three 2-2-1",
      //         },
      //       ],
      //     },
      //   ],
      // },
      // {
      //   label: "Level one 3",
      //   children: [
      //     {
      //       label: "Level two 3-1",
      //       children: [
      //         {
      //           label: "Level three 3-1-1",
      //         },
      //       ],
      //     },
      //     {
      //       label: "Level two 3-2",
      //       children: [
      //         {
      //           label: "Level three 3-2-1",
      //         },
      //       ],
      //     },
      //   ],
      // },
    ];
    const defaultProps = {
      children: "children",
      label: "label",
    };
    const handleNodeClick = (data) => {
      console.log(data);
    };

    return {
      Tree,
      defaultProps,
      handleNodeClick,
    };
  },
};
</script>
<style lang="scss" scoped>
.sidebar-warpper {
  height: 100%;
  background: #334154;
  text-align: center;
  width: 200px;
  & > .el-tree {
    background: #334154;
    color: #fff;
    .el-tree-node__content:hover {
      background: #33415495;
    }
  }
}
</style>

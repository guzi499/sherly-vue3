<!--
 * @Author: lihaoyu
 * @Date: 2022-05-06 21:29:37
 * @LastEditTime: 2022-06-14 01:34:30
 * @LastEditors: lihaoyu
 * @Description: 
 * @FilePath: /sherly-vue3/src/components/TreeSelect.vue
-->
<template>
  <div>
    <el-select
      ref="selectTree"
      v-model="treeSelectData.parentId"
      placeholder="请选择"
    >
      <el-option
        hidden
        :value="treeSelectData.parentId"
        :label="treeSelectData.treeDatas"
      ></el-option>
      <el-tree
        :data="treeList"
        :props="defaultProps"
        :expand-on-click-node="false"
        @node-click="nodeOnclick"
      />
    </el-select>
  </div>
</template>

<script>
import { reactive, toRefs, getCurrentInstance } from "vue";
export default {
  props: {
    treeList: Array,
    defaultProps: Object,
  },
  setup(props, { emit }) {
    const { proxy } = getCurrentInstance();
    const data = reactive({
      treeSelectData: {
        parentId: null,
        treeDatas: "",
      },
    });
    const nodeOnclick = (e) => {
      data.treeSelectData.parentId = e.parentId;
      data.treeSelectData.treeDatas = e.departmentName;
      emit("treeSelectList", e);
      proxy.$refs.selectTree.blur();
    };
    return { ...toRefs(data), nodeOnclick };
  },
};
</script>

<style scoped></style>

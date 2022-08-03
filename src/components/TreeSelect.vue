<!--
 * @author: 李浩宇
 * @date: 2022-05-06
-->

<template>
  <div>
    <el-select
      ref="selectTree"
      v-model="treeSelectData.parentId"
      placeholder="请选择"
      clearable
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
import { reactive, toRefs, getCurrentInstance, watch } from "vue";
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

    watch(
      () => data.treeSelectData.parentId,
      (val) => {
        // console.log(val, typeof(val))
        if (val === "") {
          data.treeSelectData.treeDatas = "";
        }
      }
    );
    return { ...toRefs(data), nodeOnclick };
  },
};
</script>

<style scoped></style>

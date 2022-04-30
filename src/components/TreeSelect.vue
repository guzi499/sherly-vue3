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
import {reactive, toRefs, getCurrentInstance} from 'vue'
export default {
  props: {
    treeList: Array,
    defaultProps: Object,
  },
  setup(props, {emit}) {
    const {proxy} = getCurrentInstance();
    const data = reactive({
      treeSelectData:{
        parentId: null,
        treeDatas: ''
      }
    })
    console.log('props === ', props)
    const nodeOnclick = (e) => {
      console.log(e)
      data.treeSelectData.parentId = e.parentId;
      data.treeSelectData.treeDatas = e.departmentName;
      emit('treeSelectList', e)
      proxy.$refs.selectTree.blur();
    };
    return {...toRefs(data), nodeOnclick}
  }
}
</script>

<style scoped>

</style>

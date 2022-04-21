<template>
  <div>
<!--    <el-select-->
<!--        ref="selectTree"-->
<!--        v-model="form.parentId"-->
<!--        placeholder="请选择"-->
<!--    >-->
<!--      <el-option-->
<!--          hidden-->
<!--          :value="form.parentId"-->
<!--          :label="treeDatas"-->
<!--      ></el-option>-->
<!--      <el-tree-->
<!--          :data="menuListSelect"-->
<!--          :props="defaultProps"-->
<!--          :expand-on-click-node="false"-->
<!--          @node-click="nodeOnclick"-->
<!--      />-->
<!--    </el-select>-->
  </div>
</template>

<script>
export default {
  name: "TreeSelect",
  setup() {
    // // 选中弹框中的树形数据
    // const nodeOnclick = (e) => {
    //   console.log(e);
    // };
    // return {nodeOnclick}
  }
}
</script>

<style scoped>

</style>

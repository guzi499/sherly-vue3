<template>
  <div>
    <el-button type="danger">
      清空日志
    </el-button>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="date" label="Date" width="180" />
      <el-table-column prop="name" label="Name" width="180" />
      <el-table-column prop="address" label="Address" />
    </el-table>
  </div>
</template>

<script>
export default {}
</script>

<style scoped>

</style>

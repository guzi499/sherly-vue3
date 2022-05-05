<!--<template>-->
<!--  <div>-->
<!--    <el-pagination-->
<!--        style="margin-top: 20px"-->
<!--        v-model:currentPage="pageNum"-->
<!--        v-model:page-size="pageSize"-->
<!--        :page-sizes="[10, 20, 30, 40]"-->
<!--        :small="small"-->
<!--        :disabled="disabled"-->
<!--        layout="total, sizes, prev, pager, next, jumper"-->
<!--        :total="total"-->
<!--        @size-change="handleSizeChange"-->
<!--        @current-change="handleCurrentChange"-->
<!--    />-->
<!--  </div>-->
<!--</template>-->

<!--<script>-->
<!--export default {-->
<!--  props: {-->
<!--    pageNum: Number,-->
<!--    pageSize: Number,-->
<!--    total: Number-->
<!--  },-->
<!--  computed: {-->
<!--    pageNum: {-->
<!--      get() {-->
<!--        return this.pageNum-->
<!--      },-->
<!--      set(pageNum) {-->
<!--        this.$emit('update:modelValue', pageNum)-->
<!--      }-->
<!--    }-->
<!--  },-->
<!--  setup() {-->
<!--    const handleSizeChange = (val) => {-->
<!--      console.log(`每页${val} 条`)-->
<!--    }-->
<!--    const handleCurrentChange = (val) => {-->
<!--      console.log(`当前页: ${val}`)-->
<!--    }-->
<!--    return {handleSizeChange, handleCurrentChange}-->
<!--  }-->
<!--}-->
<!--</script>-->

<!--<style scoped>-->

<!--</style>-->

<!--
 * @Author: lihaoyu
 * @Date: 2022-04-21 00:12:17
 * @LastEditTime: 2022-04-24 22:22:45
 * @LastEditors: lihaoyu
 * @Description: 
 * @FilePath: /sherly-vue3/src/components/SherlyTable.vue
-->
<template>
  <div class="sherlytable-header">
    <slot name="header"></slot>
  </div>
  <el-table v-bind="$attrs" :data="tableData">
    <slot name="table"></slot>
  </el-table>
  <div class="sherly-pagination-box" v-if="showPagination">
    <el-pagination
      background
      layout="total,prev,pager,next,sizes,jumper"
      :total="total"
      :current-page="current"
      :page-size="size"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      @prev-click="handlePrevClick"
      @next-click="handleNextClick"
    />
  </div>
</template>
<script>
export default {
  props: {
    tableData: {
      type: Array,
      default: () => [],
    },
    showPagination: {
      type: Boolean,
      default: false,
    },
    paginationTotal: {
      type: Number,
      default: 0,
    },
    paginationCurrent: {
      type: Number,
      default: 1,
    },
    paginationSize: {
      type: Number,
      default: 10,
    },
  },
  setup(props, context) {
    const handleSizeChange = (e) => {
      context.emit("handleCurrentChange", e);
    };
    const handleCurrentChange = (e) => {
      context.emit("handleCurrentChange", e);
    };
    const handlePrevClick = (e) => {
      context.emit("handleCurrentChange", e);
    };
    const handleNextClick = (e) => {
      context.emit("handleCurrentChange", e);
    };

    return {
      handleSizeChange,
      handleCurrentChange,
      handlePrevClick,
      handleNextClick,
    };
  },
};
</script>

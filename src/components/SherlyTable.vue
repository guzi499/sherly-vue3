<!--
 * @author: 李浩宇
 * @date: 2022-04-21
-->
<template>
  <div class="sherly-table-header">
    <slot name="header"></slot>
  </div>
  <el-table v-bind="$attrs" :data="tableData" v-loading="loading">
    <slot name="table"></slot>
  </el-table>
  <div class="sherly-pagination-box" v-if="showPagination">
    <el-pagination
        v-show="paginationTotal && paginationTotal > 0"
        background
        layout="total,sizes,prev,pager,next,jumper"
        :total="paginationTotal"
        :current-page="paginationCurrent"
        :page-size="paginationSize"
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
    loading: {
      type: Boolean,
      default: false,
    },
  },
  setup(props, {emit}) {
    const handleSizeChange = (e) => {
      emit("handleSizeChange", e);
    };
    const handleCurrentChange = (e) => {
      emit("handleCurrentChange", e);
    };
    const handlePrevClick = (e) => {
      emit("handleCurrentChange", e);
    };
    const handleNextClick = (e) => {
      emit("handleCurrentChange", e);
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

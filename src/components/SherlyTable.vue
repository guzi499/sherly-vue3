<!--
 * @Author: lihaoyu
 * @Date: 2022-04-21 00:12:17
 * @LastEditTime: 2022-04-21 11:31:15
 * @LastEditors: lihaoyu
 * @Description: 
 * @FilePath: /sherly-vue3/src/components/SherlyTable.vue
-->
<template>
  <div class="sherlytable-header">
    <slot name="header"></slot>
  </div>
  <el-table v-bind="$attrs" :data="_tableData.result">
    <slot name="table"></slot>
  </el-table>
  <div class="sherly-pagination-box" v-if="showPagination">
    <el-pagination
      background
      layout="prev,pager,next,jumper"
      :total="_tableData.total"
      :current-page="_tableData.current"
      :page-size="_tableData.size"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      @prev-click="handlePrevClick"
      @next-click="handleNextClick"
    />
  </div>
</template>
<script>
import { computed } from "vue-demi";
export default {
  props: {
    tableData: {
      type: Object,
      default: () => ({}),
    },
    showPagination: {
      type: Boolean,
      default: false,
    },
  },
  setup(props, context) {
    const _tableData = computed(() => {
      return Object.assign(
        { result: [], size: 10, total: 0, current: 1 },
        props.tableData
      );
    });
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
      _tableData,
      handleSizeChange,
      handleCurrentChange,
      handlePrevClick,
      handleNextClick,
    };
  },
};
</script>

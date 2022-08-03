<!--
 * @author: 李浩宇
 * @date: 2022-04-01
-->

<template>
  <div class="AppMain-wrapper">
    <div class="AppMain-wrapper-content">
      <div class="AppMain-wrapper-page">
        <router-view />
      </div>
    </div>
  </div>
</template>
<script>
export default {
  setup() {},
};
</script>
<style lang="scss" scoped>
.AppMain-wrapper {
  height: 0;
  flex: 1;
  position: relative;
  padding: 12px;

  .AppMain-wrapper-content {
    position: absolute;
    left: 12px;
    right: 12px;
    top: 12px;
    bottom: 12px;
    background: #fff;
    border-radius: 8px;
    overflow: hidden;
    padding: 12px;

    .AppMain-wrapper-page {
      height: 100%;
      overflow: auto;
    }
  }
}
</style>

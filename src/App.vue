<script setup lang="ts">
import HelloWorld from './components/index.vue'
</script>

<template>
  <div>
    <a href="https://vitejs.dev" target="_blank">
      <img src="/sherly.svg" class="logo" alt="Vite logo" />
    </a>
  </div>
  <HelloWorld msg="Sherl后台管理系统" />
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>

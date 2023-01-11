<template>
  <h1>{{ msg }}</h1>

  <div class="card">
    <button type="button" @click="count++">count is {{ count }}</button>
    <p>
      <a href="https://gitee.com/guzi499/sherly-vue3" target="_blank"
      >open sherl-Vue3</a
      >
      git
      <code>components/index.vue</code> to
    </p>
  </div>
</template>

<script setup lang="ts">
import {ref} from 'vue'

defineProps<{ msg: string }>()

const count = ref(0)
</script>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>

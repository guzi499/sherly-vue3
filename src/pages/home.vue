<template>
  <h1>{{ msg }}</h1>

  <div class="card">
    <button type="button" @click="count++">count is {{ count }}</button>
    <button type="button" @click="store.count++">store.count is {{ store.count }}</button>
    <button type="button" @click="store.$reset()">重置pinia</button>
    <p>open
      <a href="https://gitee.com/guzi499/sherly-vue3" target="_blank"
      >sherl-Vue3</a
      >
      git
      <code>index.vue</code> to
    </p>
  </div>
</template>

<script setup lang="ts">
import {ref} from 'vue'
import {useStore} from "@/store";

defineProps<{ msg: string }>()

const store = useStore()

const count = ref(0)
</script>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>

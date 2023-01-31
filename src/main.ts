import { createApp } from 'vue'
import { createPinia } from 'pinia'
import router from './router/router'
import '@/assets/style/index.scss'
import App from './App.vue'

const app = createApp(App);

app.use(createPinia()).use(router)

app.mount('#app')

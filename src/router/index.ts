import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import HomeView from '@/pages/index.vue'

const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        name: 'index',
        component: HomeView,
    },
    {
        path: '/home',
        name: 'home',
        component: () => import('@/pages/home.vue')
    }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

export default router

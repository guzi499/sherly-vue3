import { createRouter, createWebHashHistory } from 'vue-router'
import Login from '@/pages/login.vue'

const routes: Array<any> = [
    {
        path: '/',
        name: 'index',
        component: Login,
        meta: { title: "登录" }
    },
    {
        path: '/login',
        component: Login,
        hidden: true,
        meta: { title: "登录" }
    },
    {
        path: '/home',
        name: 'home',
        component: () => import('@/pages/home.vue'),
        meta: { title: "首页" }
    }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

export default router

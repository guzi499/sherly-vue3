import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'

import {resolve} from 'path'

// https://vitejs.dev/config/
export default defineConfig({
    // lintOnSave:false,
    server: {
        port: 8001,
        host: true,
        open: true,
        proxy: {
            // https://cn.vitejs.dev/config/#server-proxy
            '/api': {
                target: 'http://123.249.17.195',
                changeOrigin: true,
                rewrite: (p) => p.replace(/^\/api/, '')
            }
        }
    },
    plugins: [vue()],
    resolve: {
        alias: {
            // 设置路径别名
            '~': resolve(__dirname, './'),
            '@': resolve(__dirname, 'src'),
            '@components': resolve(__dirname, '/src/components')
        },
        extensions: ['.js', '.json', '.ts', '.vue', '.jsx', '.tsx']
    }
})

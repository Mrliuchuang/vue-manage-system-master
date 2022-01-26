import vue from '@vitejs/plugin-vue'

export default {
    base: './',
    plugins: [vue()],
    optimizeDeps: {
        include: ['schart.js']
    },
    server:{
        host:"0.0.0.0",
        proxy:{
            '/api':{
                target:'http://pv.sohu.com/',
                changeOrigin: true,
                rewrite: path => path.replace(/^\/api/,''),
            }
        }
    }

}


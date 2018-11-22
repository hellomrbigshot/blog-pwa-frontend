const path = require('path')
function resolve (dir) {
    return path.join(__dirname,dir)
}
module.exports = {
    configureWebpack: {
        resolve: {
            extensions: ['.js', '.vue', '.json', '.ts'],
            alias: {
                '@': resolve('src'),
                'vue$':'vue/dist/vue.js'
            }
        },
        externals: {
            
        }
    },
    devServer: {
        port: '8081',
        proxy: {
            '/api': {
                target: 'http://www.hellomrbigbigshot.xyz',
                changeOrigin: true
            }
        }
    }
}
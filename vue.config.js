const path = require('path')
function resolve (dir) {
    return path.join(__dirname,dir)
}
module.exports = {
    configureWebpack: {
        resolve: {
            extensions: ['.js', '.vue', '.json', '.ts'],
            alias: {
                '@': resolve('src')
            }
        },
        externals: {
            
        }
    },
    devServer: {
        port: '8081',
        proxy: {
            '/api': {
                target: 'http://localhost:4600/api',
                changeOrigin: true,
                ws: true,
                pathRewrite: {
                  '^/api': ''
                }
            }
        }
    }
}
const path = require('path')
const SkeletonWebpackPlugin =  require('vue-skeleton-webpack-plugin')
function resolve (dir) {
    return path.join(__dirname,dir)
}
module.exports = {
    configureWebpack: {
        plugins: [
            new SkeletonWebpackPlugin({
            webpackConfig: {
                entry: {
                app: path.join(__dirname, './src/entry-skeleton.js'),
                },
            },
            minimize: true,
            quiet: true,
            }),
        ],
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
                target: 'http://m.hellomrbigbigshot.xyz',
                changeOrigin: true
            }
        }
    }
}
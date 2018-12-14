const path = require('path')
const SkeletonWebpackPlugin =  require('vue-skeleton-webpack-plugin')
function resolve (dir) {
    return path.join(__dirname,dir)
}
module.exports = {
    pwa: {
        name: '世说新语',
        themeColor: '#33ccff',
        msTileColor: '#fff',
        appleMobileWebAppCapable: 'yes',
        appleMobileWebAppStatusBarStyle: 'black',
        manifestPath: 'manifest.json',
    
        // configure the workbox plugin
        workboxPluginMode: 'InjectManifest',
        workboxOptions: {
          // swSrc is required in InjectManifest mode.
          swSrc: 'src/service-worker.js',
          // ...other Workbox options...
        }
    },
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
                target: 'https://m.hellomrbigbigshot.xyz',
                changeOrigin: true
            }
        }
    }
}
const path = require('path')
const SkeletonWebpackPlugin = require('vue-skeleton-webpack-plugin')

function resolve(dir) {
  return path.join(__dirname, dir)
}
module.exports = {
  pwa: {
    name: '世说新语',
    themeColor: '#33ccff',
    msTileColor: '#fff',
    appleMobileWebAppCapable: 'yes',
    appleMobileWebAppStatusBarStyle: 'black',
    manifestPath: 'manifest.json',
    workboxPluginMode: 'InjectManifest',
    workboxOptions: {
      swSrc: 'src/service-worker.js'
    }
  },
  configureWebpack: {
    plugins: [
      new SkeletonWebpackPlugin({
        webpackConfig: {
          entry: {
            app: path.join(__dirname, './src/entry-skeleton.js')
          }
        },
        minimize: true,
        quiet: true
      })
    ],
    resolve: {
      extensions: ['.js', '.vue', '.json', '.ts'],
      alias: {
        '@': resolve('src'),
        vue$: 'vue/dist/vue.js'
      }
    },
    externals: {}
  },
  devServer: {
    // host: '172.20.4.38',
    // host: '192.168.124.12',
    // host: '192.168.100.39',
    port: '8088',
    proxy: {
      '/api': {
        target: 'http://localhost:8081',
        // target: 'https://hellomrbigbigshot.xyz',
        ws: true,
        changeOrigin: true
      }
    }
  }
}

const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  publicPath: '/samdory-archive/',
  // devServer: {
  //   proxy: {
  //     '/webapi': {
  //       target: 'http://samdory.synology.me:5000',
  //       changeOrigin: true,
  //       pathRewrite: { '^/webapi': '' },
  //     },
  //   },
  // },
})

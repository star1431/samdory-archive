const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
    transpileDependencies: true,
    publicPath: '/samdory-archive/',
    chainWebpack: (config) => {
        config.module
            .rule('markdown')
            .test(/\.md$/)
            .use('raw-loader')
            .loader('raw-loader')
            .end();
    },
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

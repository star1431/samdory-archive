const { defineConfig } = require('@vue/cli-service')
const path = require('path')  // path 모듈 추가

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
        config.module
            .rule('files')
            .test(/\.(zip|doc|docx|pdf|txt|pptx|hwp)$/)
            .use('file-loader')
            .loader('file-loader')
            .options({
                name: '[name].[hash].[ext]',
                outputPath: 'assets/files/'
            })
            .end();
    },
    configureWebpack: {
        resolve: {
            alias: {
                '@': path.resolve(__dirname, 'src')
            }
        }
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

const { defineConfig } = require('@vue/cli-service')
const path = require('path')  // path 모듈 추가
const webpack = require('webpack')

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
                outputPath: 'assets/file/'
            })
            .end();
    },
    configureWebpack: {
        resolve: {
            alias: {
                '@': path.resolve(__dirname, 'src')
            }
        },
        // 삼도리 배포시 제거
        plugins: [
            new webpack.IgnorePlugin({
                resourceRegExp: /assets\/file/, // 빌드 전체에서 제외
            }),
        ],
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

const Dotenv = require('dotenv-webpack')
const webpack = require('webpack')
module.exports = {
    lintOnSave: false,
    chainWebpack: config => {
        config.module
            .rule('html')
            .test(/\.html$/)
            .use('html-loader')
            .loader('html-loader')
    },
    devServer: {
        proxy: 'http://localhost:8080',
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
            "Access-Control-Allow-Headers": "X-Requested-With, content-type, Authorization",
            "Access-Control-Allow-Credentials": "true"
        }
    },
    configureWebpack: {
        plugins: [
            new Dotenv(),
            new webpack.ProvidePlugin({
                Buffer: ['buffer', 'Buffer'],
            }),
        ]
    }
}
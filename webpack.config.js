
const path = require('path');

//
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {

    // 入口文件
    entry: "./src/index.js",

    // 出口文件
    output: {
        filename: "index.js",
        path: path.resolve(__dirname, 'dist'),
    },

    // 模式 production (生产模式)
    mode: 'development',


    // 模块配置
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader'
                ]
            }
        ]
    },

    // 插件配置
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html'
        }),
    ]

};

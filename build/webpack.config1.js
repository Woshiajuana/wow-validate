
const path = require('path');

//
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {

    // 入口文件
    entry: "./src/main.js",

    // 出口文件
    output: {
        filename: "index.js",
        // publicPath: 'dist',
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
            },
            // 图片 loader
            {
                test: /\.(jpg|png|gif)$/,
                loader: 'url-loader',
                // 图片小于8kb， base64处理
                options: {
                    limit: 8 * 1024,
                    // url-loader 的 es6 模块化解析关掉
                    esModule: false,
                    // 取 hash 前十位
                    name: '[hash:10].[ext]',
                }
            },
            {
                test: /\.html$/,
                loader: 'html-loader',
            }
        ]
    },

    // 插件配置
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html'
        }),
    ],

    // devServer
    devServer: {
        // 项目构建路径
        contentBase: path.resolve(__dirname, 'dist'),
        // 启动 gizp 压缩
        compress: true,
        // 端口号
        port: 3000,
        // 自动打开浏览器
        open: true,
    }

};

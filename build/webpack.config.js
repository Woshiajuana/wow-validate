
const path = require('path');

module.exports = {

    // 入口文件
    entry: "./src/main.js",

    // 出口文件
    output: {
        filename: "index.js",
        // publicPath: 'dist',
        path: path.resolve(__dirname, '../dist'),
    },

    // 模式 production (生产模式)
    mode: 'development',


    // 模块配置
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: [
                    'ts-loader'
                ]
            },
        ]
    },

};

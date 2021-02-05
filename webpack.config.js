'use stric'
const path = require('path');
const htmlWebpack = require('html-webpack-plugin');
const miniCssExtract = require('mini-css-extract-plugin');
const dev = process.env.NODE_ENV !== 'production';

module.exports = {
    entry: './front/app.js',
    output: {
        path: path.join(__dirname, 'back/public'),
        filename: 'js/bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.css/,
                use: [
                    dev ? 'style-loader' : miniCssExtract.loader,
                    'css-loader'
                ]
            }
        ]
    },
    plugins: [
        new htmlWebpack({
            template: './front/index.html',
            minify: {
                collapseWhitespace: true,
                removeComments: true,
                removeRedundantAttributes: true,
                removeScriptTypeAttributes: true,
                removeStyleLinkTypeAttributes: true,
                useShortDoctype: true
            }
        }),
        new miniCssExtract({
            filename: 'css/bundle.css'
        })
    ],
    devtool: 'source-map'
}
'use strict';

const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const Merge = require('webpack-merge');
const CommonConfig = require('./webpack.config.js');

module.exports=Merge(CommonConfig, {
    output: {
        path: __dirname + '/_build',
        filename: 'js/[name].devBundle.js'
    },
    devServer: {
        contentBase: __dirname
    },
    plugins: [
        new HtmlWebpackPlugin({
            title:'农机在线平台',
            filename:'index.html',
            template:'index.html'
        }),
        new ExtractTextPlugin('style.bundle.css',{
            allChunks : true
        })
    ]
});
/**
 * Created by qoder on 16-12-8.
 */
'use strict';
let path = require('path');
let webpack = require('webpack');
let baseConfig = require('./webpack.config.base');
let defaultSettings = require('./webpack.config.defaults');
let ExtractTextPlugin = require("extract-text-webpack-plugin");
let BowerWebpackPlugin = require('bower-webpack-plugin');
let autoprefixer = require('autoprefixer');

let config = Object.assign({}, baseConfig, {
    entry: {
        buddle: path.join(__dirname, '../src/index'),
        vendor: ['react', 'react-dom']
    },
    cache: false,
    plugins: [
        new BowerWebpackPlugin({
            searchResolveModulesDirectories: false
        }),
        new webpack.DefinePlugin({
            __DEVCLIENT__: true,
            __DEVSERVER__: false,
            __DEVTOOLS__: false,
            __DEVLOGGER__: false,
            'process.env': {
                'NODE_ENV': JSON.stringify('production')
            }
        }),
        new webpack.optimize.UglifyJsPlugin(),
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.optimize.AggressiveMergingPlugin(),
        new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.[hash].js'),
        new webpack.NoErrorsPlugin(),
        new ExtractTextPlugin('style.[hash].css')
    ],
    module: defaultSettings.getDefaultModules(),
    postcss: [autoprefixer]
})


config.module.loaders.push({
    test: /\.(js|jsx)$/,
    loader: 'babel',
    include: [].concat(
        config.additionalPaths,
        [path.join(__dirname, '/../src')]
    )
});

//remove  old files
module.exports = config;

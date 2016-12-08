/**
 * Created by qoder on 16-12-8.
 */
'use strict';
let path = require('path');
let defaultSettings = require('./webpack.config.defaults');

let additionalPaths = [];

module.exports = {
    additionalPaths,
    port: defaultSettings.port,
    debug: true,
    devtool: 'eval',
    output: {
        path: path.join(__dirname, '/../dist/assets'),
        filename: process.env.NODE_ENV === 'development' ? 'app.js' : 'app.[hash].js',
        chunkFilename: '[name].[hash].js',
        publicPath: defaultSettings.publicPath
    },
    devServer: {
        contentBase: '../src/',
        historyApiFallback: true,
        hot: true,
        port: defaultSettings.port,
        publicPath: defaultSettings.publicPath,
        noInfo: false
    },
    resolve: {
        extensions: ['', '.js', '.jsx'],
        alias: {
            actions: `${defaultSettings.srcPath}/actions/`,
            components: `${defaultSettings.srcPath}/components/`,
            sources: `${defaultSettings.srcPath}/sources/`,
            stores: `${defaultSettings.srcPath}/stores/`,
            styles: `${defaultSettings.srcPath}/styles/`,
            config: `${defaultSettings.srcPath}/config/` + process.env.NODE_ENV
        }
    },
    module:{}
}

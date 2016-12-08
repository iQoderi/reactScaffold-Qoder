/**
 * Created by qoder on 16-12-8.
 */
'use strict';
let path = require('path');
let webpack = require('webpack');
let baseConfig = require('../webpack.config.base.js');
let defaultSettings = require('../webpack.config.defaults.js');
let BowerWebpackPlugin = require('bower-webpack-plugin');


let config = Object.assign({}, baseConfig, {
    entry: [
        'webpack-dev-server/client?http://127.0.0.1:' + defaultSettings.port,
        'webpack/hot/only-dev-server',
        '../../src/index'
    ],
    cache: true,
    devtool: 'eval-source-map',
    plugins: [
        new webpack.DefinePlugin({
            __DEVCLIENT__: true,
            __DEVSERVER__: false,
            __DEVTOOLS__: false,
            __DEVLOGGER__: true,
            'process.env': {
                'NODE_ENV': JSON.stringify('development')
            }
        }),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin(),
        new BowerWebpackPlugin({
            searchResolveModulesDirectories: false
        })
    ],
    module: defaultSettings.getDefaultModules()
})

config.module.loaders.push({
    test: /\.(js|jsx)$/,
    loader: 'react-hot!babel-loader',
    include: [].concat(
        config.additionalPaths,
        [path.join(__dirname, '../../src')]
    )
})

module.exports = config;
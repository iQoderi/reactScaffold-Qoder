/**
 * Created by qoder on 16-10-19.
 */
'use strict';

let webpack = require("webpack");
let path = require("path");
let ExtractTextPlugin = require("extract-text-webpack-plugin");
let autoprefixer=require('autoprefixer');


module.exports = {
    // The configuration for the server-side rendering
    name: "server-side rendering",
    context: path.join(__dirname),
    target: "node",
    // devTool:false,
    entry: {
        server: ['babel-polyfill', path.join(__dirname,'../../src/server.js')]
    },
    output: {
        path: '../../dist',
        filename: "server.js",
        publicPath: "http://odr4tn94d.bkt.clouddn.com/",
        libraryTarget: "commonjs2"
    },
    plugins: [
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.optimize.UglifyJsPlugin({
            compressor: {
                warnings: false
            }
        }),
        new ExtractTextPlugin('style.[hash].css'),
        new webpack.DefinePlugin({
            __DEVCLIENT__: false,
            __DEVSERVER__: false,
            'process.env': {
                'NODE_ENV': JSON.stringify('production')
            }
        }),
        new webpack.NoErrorsPlugin(),
        new webpack.IgnorePlugin(/vertx/),
    ],
    module: {
        preLoaders: [
            {test: /\.js$|\.jsx$/, loader: "eslint-loader", exclude: /node_modules/}
        ],
        loaders: [
            {
                test: /\.js$|\.jsx$/,
                loader: 'babel',
                include: path.join(__dirname, '../../src'),
                exclude: /node_modules/,
            },
            {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract('style-loader', 'css-loader')
            },
            {
                test: /\.sass/,
                loader: 'style-loader!css-loader!sass-loader?outputStyle=expanded&indentedSyntax'
            },
            {
                test: /\.scss/,
                loader: ExtractTextPlugin.extract('style-loader', 'css!postcss!sass')
            },
            {
                test: /\.less/,
                loader: ExtractTextPlugin.extract('style-loader', 'css!postcss!less')
            },
            {
                test: /\.styl/,
                loader: 'style-loader!css-loader!stylus-loader'
            },
            {test: /\.json$/, loader: "json-loader"},
            {
                test: /\.(jpe?g|png|gif)$/i,
                loaders: [
                    'url?limit=10000&name=assets/[hash:8].[name].[ext]',
                    'image-webpack?{progressive:true, optimizationLevel: 7, interlaced: false, pngquant:{quality: "65-90", speed: 4}}'
                ]
            }
        ],
    },
    postcss: [autoprefixer],
    resolve: {
        extensions: ['', '.js', '.jsx', '.css'],
        modulesDirectories: [
            "src", "node_modules"
        ]
    }
};



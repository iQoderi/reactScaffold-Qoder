/**
 * Created by qoder on 16-12-8.
 */
'use strict';

let path = require('path');
let srcPath = path.join(__dirname, '/../src');
let ExtractTextPlugin = require("extract-text-webpack-plugin");
let deltPort = 9090;


/**
 * default modules
 */

let getDefaultModules = ()=> {
    return {
        preLoaders: [
            {
                test: /\.(js|jsx)$/,
                include: srcPath,
                loader: 'eslint-loader'
            }
        ],
        loaders: [
            {
                test: /\.css$/,
                loader: process.env.NODE_ENV === 'dev' ? 'style-loader!css-loader!postcss-loader' : ExtractTextPlugin.extract('style-loader', 'css-loader', 'postcss-loader')
            },
            {
                test: /\.sass/,
                loader: 'style-loader!css-loader!sass-loader?outputStyle=expanded&indentedSyntax'
            },
            {
                test: /\.scss$/,
                loader: process.env.NODE_ENV === 'dev' ? 'style-loader!css-loader!sass-loader?outputStyle=expanded' : ExtractTextPlugin.extract('style', 'css!postcss!sass')
            },
            {
                test: /\.less/,
                loader: 'style-loader!css-loader!less-loader'
            },
            {
                test: /\.styl/,
                loader: 'style-loader!css-loader!stylus-loader'
            },
            {
                test: /\.(png|jpg|gif|woff|woff2)$/,
                loaders: [
                    'url?limit=10000&name=assets/[hash:8].[name].[ext]',
                    'image-webpack?{progressive:true, optimizationLevel: 7, interlaced: false, pngquant:{quality: "65-90", speed: 4}}'
                ]
            },
            {
                test: /\.(mp4|ogg|svg)$/,
                loader: 'file-loader'
            }
        ]
    }
}


module.exports = {
    srcPath,
    publicPath: process.env.NODE_ENV == 'development' ? '/assets/' : 'http://odr4tn94d.bkt.clouddn.com/',
    port:deltPort,
    getDefaultModules
}
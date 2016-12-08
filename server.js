/**
 * Created by qoder on 16-12-8.
 */
'use strict';
require('core-js/fn/object/assign');
let webpack = require('webpack');
let webpackDevServer = require('webpack-dev-server');
let config = require('./webpack/webpack.config.dev.client');
let open = require('open');

new webpackDevServer(webpack(config), config.devServer)
    .listen(config.port, 'localhost', (err)=> {
        if (err) {
            console.log(err)
        }
        console.log('Listening at localhost:' + config.port);
        console.log('Opening your system browser...');
        console.log('Application Crashed...😏 😏 😏 😏 😏 😏');
        open('http://localhost:' + config.port + '/webpack-dev-server/');
    })



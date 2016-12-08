/**
 * Created by qoder on 16-12-8.
 */
'use strict';
let clientConfig=require('./webpack.config.prod.client');
let serverConfig=require('./webpack.config.prod.server');

module.exports=[clientConfig,serverConfig];
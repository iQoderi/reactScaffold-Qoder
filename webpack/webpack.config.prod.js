/**
 * Created by qoder on 16-12-8.
 */
'use strict';
let clientConfig=require('./client/webpack.config.prod.client.js');
let serverConfig=require('./server/webpack.config.prod.server.js');

module.exports=[clientConfig,serverConfig];
/**
 * Created by qoder on 16-12-8.
 */
'use strict';
require('./setup');
var path = require('path');
var express = require('express');
var ejs = require('ejs');
var favicon = require('serve-favicon');
var serverRender = require('./dist/server.js');
var app = express();
var isDev = process.env.NODE_ENV === 'development';
var defaultPort = isDev ? 3000 : 8200;
var port = process.env.PORT || defaultPort;

app.use(express.static(path.join(__dirname, 'dist')));

if (isDev) {
    app.use(favicon(path.join(__dirname, 'src', 'favicon.ico')));
    app.set('views', path.join(__dirname, 'src'));
    app.set('view engine', 'html');
    app.engine('.html', ejs.__express);
} else {
    app.use(favicon(path.join(__dirname, 'dist', 'favicon.ico')));
    app.set('views', path.join(__dirname, 'dist'));
    app.set('view engine', 'html');
    app.engine('.html', ejs.__express);
}

app.get('*', function (req, res, next) {
    serverRender.default(req, res);
});

app.listen(port, function (err) {
    if (err) {
        console.error(err)
    } else {
        console.info("==> 🌎  Listening on port %s. Open up http://localhost:%s/ in your browser.", port, port)
    }
});

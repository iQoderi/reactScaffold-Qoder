/**
 * Created by qoder on 16-12-8.
 */
import React from 'react';
import {renderToString} from 'react-dom/server';
import App from './components/App';

export default function (req, res) {
    let componentHTML = renderToString(App);
    res.set('Content-Type', 'text/html');
    res.render('index', {html: componentHTML});
}
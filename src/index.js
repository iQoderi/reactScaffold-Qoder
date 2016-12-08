/**
 * Created by qoder on 16-12-8.
 */
'use strict';
import 'core-js/fn/object/assign';
import './styles/Main.less';
import React from 'react';
import App from 'components/App';
import {render} from 'react-dom';

const rootElement = document.getElementById("app");

render(<App/>, rootElement);


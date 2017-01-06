import React from 'react';
import { Router, browserHistory } from 'react-router';
import { render } from 'react-dom';
// import createHistory from 'history/createBrowserHistory';
import routes from './routes';

// This one is pure service module. It injects our markup into the page, shouldn't be changed

// let history = createHistory();

render((
    <Router history={browserHistory}>{routes}</Router>
), document.getElementById('app'));

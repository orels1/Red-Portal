import React from 'react';
import {Route} from 'react-router';
import App from './components/App';
import Home from './components/Home';
import CogsList from './components/CogsList';
import Cog from './components/Cog';
import Repo from './components/Repo';
import About from './components/About';

// You can read more here: https://github.com/reactjs/react-router

export default (
    <Route component={App}>
        <Route path="/" component={Home} />
        <Route path="/cogs/" component={CogsList} />
        <Route path="/cogs/:author/:repoName/:cogName/" component={Cog} />
        <Route path="/cogs/:author/:repoName/" component={Repo} />
        <Route path="/about/" component={About} />
        <Route path="*" component={Home} />
    </Route>
);

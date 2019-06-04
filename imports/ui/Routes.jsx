import React from 'react';
import { Router, Route, Switch } from 'react-router';
import { createBrowserHistory } from 'history';

import Dashboard from './pages/Dashboard';
import App from './App';
import DefaultLayout from './DefaultLayout';
import Home from './pages/Home';

const browserHistory = createBrowserHistory();

export const renderRoutes = () => (
    <Router history={ browserHistory }>
        <Switch>
            <DefaultLayout exact path='/' component={Home} title="Home"/>
            <DefaultLayout path='/dashboard' component={Dashboard} title="Dashboard"/>
        </Switch>
    </Router>
);
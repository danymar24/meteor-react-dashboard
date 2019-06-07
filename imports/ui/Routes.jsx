import React from 'react';
import { Router, Route, Switch, Redirect } from 'react-router';
import { createBrowserHistory } from 'history';
import { withTracker } from 'meteor/react-meteor-data';

import Dashboard from './pages/Dashboard';
import App from './App';
import DefaultLayout from './DefaultLayout';
import Home from './pages/Home';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import UsersContainer from './pages/users/Users';

const browserHistory = createBrowserHistory();

export const renderRoutes = () => (
    <Router history={ browserHistory } user={Meteor.user()}>
        <Switch>
            <Route path='/signin' component={SignIn} />
            <Route path='/signup' component={SignUp} />
            <DefaultLayout exact path='/' component={Home} title="Home"/>
            <DefaultLayout path='/dashboard' component={Dashboard} title="Dashboard"/>
            <DefaultLayout path='/users' component={UsersContainer} />
        </Switch>
    </Router>
);

export const RoutesContainer = withTracker(() => {
    return {
        user: Meteor.user()
    };
})(renderRoutes);
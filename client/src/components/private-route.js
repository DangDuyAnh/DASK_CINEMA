import React from 'react';
import { Route, Redirect } from 'react-router-dom';

import { authenticationService } from '../utility/authenticationService';

export const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route
        {...rest}
        render={props => {
            const currentUser = authenticationService.getUser();
            if (!currentUser) {
                // not logged in so redirect to login page with the return url
                return (
                    <Redirect
                        to={{pathname: "/login", backURL: document.location.href}}
                    />
                );
            }

            // authorised so return component
            return <Component {...props} />;
        }}
    />
);

export const NestedPrivateRoute = ({children, ...rest}) => {
    const currentUser = authenticationService.getUser();
    if (!currentUser) {
        return (
            <Redirect
                // to={{pathname: "/login", backURL: window.location.pathname}}
                to={{pathname: "/login", backURL: document.location.href}}
            />
        );
    } else {
        return (
            <Route {...rest}>
                {children}
            </Route>
        )
    }
}

export const AdminRoute = ({ component: Component, ...rest }) => (
    <Route
        {...rest}
        render={props => {
            const currentUser = authenticationService.getAdmin();
            if (!currentUser) {
                // not logged in so redirect to login page with the return url
                return (
                    <Redirect
                        to={{pathname: "/"}}
                    />
                );
            }

            // authorised so return component
            return <Component {...props} />;
        }}
    />
);
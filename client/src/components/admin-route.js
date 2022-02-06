import React from 'react';
import { Route, Redirect } from 'react-router-dom';

import { authenticationService } from '../utility/authenticationService';

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
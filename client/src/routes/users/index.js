import React, {useEffect, useState} from 'react';
import './index.css';
import { get } from "../../utility/api";
import { API_URL } from '../../config/Constants';
import { Switch, Route, useRouteMatch, Link, Redirect } from 'react-router-dom';
import Account from './Account';
import History from './History';
import Detail from './Detail';

export default function User(props) {
    let { path } = useRouteMatch();
    return(
        <>
        <Switch>
            <Route path={`${path}/history`}>
              <History />
            </Route>
            <Route path={`${path}/account`}>
              <Account />
            </Route>
            <Route path={`${path}/detail`}>
              <Detail />
            </Route>
            <Redirect to='/404' />
        </Switch>
        </>
        );
}
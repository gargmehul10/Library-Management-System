import React, { Component } from 'react'
import { Route, Redirect } from 'react-router-dom'
import SigninService, { ROLE_SESSION_ATTRIBUTE_NAME } from '../services/SigninService';

class LoginRoute extends Component {

    render() {
        if (!SigninService.isUserLoggedIn()) {
            return <Route {...this.props} />
        } else {
            if(localStorage.getItem(ROLE_SESSION_ATTRIBUTE_NAME) < 'ROLE_USER')
            return <Redirect to="/home" />
            else
            return <Redirect to="/reserve-book" />
        }

    }
}

export default LoginRoute;

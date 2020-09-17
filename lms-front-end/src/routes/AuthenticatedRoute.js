import React, { Component } from 'react'
import { Route, Redirect } from 'react-router-dom'
import SigninService from '../services/SigninService';

class AuthenticatedRoute extends Component {

    render() {
        if (SigninService.isUserLoggedIn()) {
            return <Route {...this.props} />
        } else {
            return <Redirect to="/login" />
        }

    }
}

export default AuthenticatedRoute;

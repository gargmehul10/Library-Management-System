import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import SigninService, { ROLE_SESSION_ATTRIBUTE_NAME } from '../services/SigninService';

class RedirectRoute extends Component {

    render() {
        if (!SigninService.isUserLoggedIn()) {
            return <Redirect to="/login" />
        } else {
            if(localStorage.getItem(ROLE_SESSION_ATTRIBUTE_NAME) < 'ROLE_USER')
            return <Redirect {...this.props} />
            else
            return <Redirect to="/reserve-book" />
        }

    }
}

export default RedirectRoute;

import React, { Component } from 'react';
import HeaderComponent from './HeaderComponent';
import FooterComponent from './FooterComponent';
import { Switch } from 'react-router-dom';
import AddUserComponent from './AddUserComponent';
import AddBookComponent from './AddBookComponent';
import HomeComponent from './HomeComponent';
import ViewUsersComponent from './ViewUsersComponent';
import LoginComponent from './LoginComponent';
import AuthenticatedRoute from '../routes/AuthenticatedRoute';
import UpdateUserComponent from './UpdateUserComponent';
import ReserveBookComponent from './ReserveBookComponent';
import MyBooksComponent from './MyBooksComponent';
import SigninService, { ROLE_SESSION_ATTRIBUTE_NAME } from '../services/SigninService';
import LoginRoute from '../routes/LoginRoute';
import RedirectRoute from '../routes/RedirectRoute';

class MainComponent extends Component {

    constructor(props) {
        
        super(props);

        this.state = {
            isUserLoggedIn: false,
            role: '',
        }
    }

    handleLogin = (result, email) => {
        
        this.setState({
            isUserLoggedIn: result,
        });
    }

    handleRole = (resultRole) => {

        this.setState({
            role: resultRole,
        });
    }

    handleLogout = () => {

        this.setState({
            isUserLoggedIn: SigninService.isUserLoggedIn(),
            role: localStorage.getItem(ROLE_SESSION_ATTRIBUTE_NAME),
        });
    }

    componentDidMount() {
        
        this.setState({
            isUserLoggedIn: SigninService.isUserLoggedIn(),
            role: localStorage.getItem(ROLE_SESSION_ATTRIBUTE_NAME),
        });
    }

    render() {
        return (
            <div>
                <HeaderComponent isUserLoggedIn={this.state.isUserLoggedIn} hasRole={this.state.role} hasLoggedOut={this.handleLogout} />
                <br />
                <Switch>
                    <LoginRoute path="/login" component={() => <LoginComponent isLoggedIn={this.handleLogin} roleOfUser={this.handleRole} />} />
                    { this.state.role > 'ROLE_ADMIN' && <AuthenticatedRoute path="/reserve-book" component={ReserveBookComponent} /> }
                    { this.state.role > 'ROLE_ADMIN' && <AuthenticatedRoute path="/my-books" component={MyBooksComponent} /> }
                    { this.state.role < 'ROLE_USER' && <AuthenticatedRoute exact path="/home" component={HomeComponent} /> }
                    { this.state.role < 'ROLE_USER' && <AuthenticatedRoute exact path="/add-user" component={AddUserComponent} /> }
                    { this.state.role < 'ROLE_USER' && <AuthenticatedRoute exact path="/view-users" component={ViewUsersComponent} /> }
                    { this.state.role < 'ROLE_USER' && <AuthenticatedRoute exact path="/update-user/:id" component={UpdateUserComponent} /> }
                    { this.state.role < 'ROLE_USER' && <AuthenticatedRoute exact path="/add-book" component={AddBookComponent} /> }
                    <RedirectRoute to="/home" />
                </Switch>
                <br />
                <FooterComponent isUserLoggedIn={this.state.isUserLoggedIn} hasRole={this.state.role} />
            </div>
        );
    }
}

export default MainComponent;

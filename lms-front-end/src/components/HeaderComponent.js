import React, { Component } from 'react';
import { Navbar, NavbarBrand, Nav, NavbarToggler, Collapse, NavItem, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { NavLink } from 'react-router-dom';
import SigninService, { USER_NAME_SESSION_ATTRIBUTE_NAME } from '../services/SigninService';
import  { withRouter } from 'react-router-dom';

class HeaderComponent extends Component {

    constructor(props) {
        
        super(props);
        
        this.state = {
            isNavOpen: false,
            // isUserLoggedIn: SigninService.isUserLoggedIn(), 
        }

        this.toggleNav = this.toggleNav.bind(this);
        this.logoutPressed = this.logoutPressed.bind(this);
    }
    
    toggleNav() {

        this.setState({
            isNavOpen: !this.state.isNavOpen,
        });
    }

    logoutPressed() {

        // if(SigninService.isUserLoggedIn())
            SigninService.logout();
            this.props.hasLoggedOut();
            // this.setState({
            //     isUserLoggedIn: false,
            // });
        // else
        // {
        //     this.setState({
        //         isModalOpen: true,
        //     });
        // }
    }

    render() {

        return (
            <React.Fragment>
                <Navbar dark expand="md">
                    <NavbarBrand className="mr-auto" href="/">
                        <img src="assets/images/lms.png" height="45" width="200" alt="Library-Management-System"></img>
                    </NavbarBrand>
                    { this.props.isUserLoggedIn && <NavbarToggler onClick={this.toggleNav} className="mr-2"/> }
                    { 
                        this.props.isUserLoggedIn && 
                        <Collapse isOpen={this.state.isNavOpen} navbar>
                            { 
                                this.props.hasRole < 'ROLE_USER' ? ( 
                                <Nav navbar style={{marginLeft: "20px"}}>
                                    <NavItem>
                                        <NavLink className="nav-link" to="/home" onClick={this.toggleModal}>
                                            <span className="fa fa-home fa-lg"></span> Home
                                        </NavLink>
                                    </NavItem>
                                    <NavItem>
                                        <NavLink className="nav-link" to="/add-book" onClick={this.toggleModal}>
                                            <span className="fa fa-book fa-lg"></span> Add Book
                                        </NavLink>
                                    </NavItem>
                                    <NavItem>
                                        <NavLink className="nav-link" to="/view-users" onClick={this.toggleModal}>
                                            <span className="fa fa-users fa-lg"></span> View Users
                                        </NavLink>
                                    </NavItem>
                                    <NavItem>
                                        <NavLink className="nav-link" to="/add-user" onClick={this.toggleModal}>
                                            <span className="fa fa-user-plus fa-lg"></span> Add User
                                        </NavLink>
                                    </NavItem>
                                </Nav> 
                                ) : ( 
                                <Nav navbar style={{marginLeft: "20px"}}>
                                    <NavItem>
                                        <NavLink className="nav-link" to="/reserve-book" onClick={this.toggleModal}>
                                            <span className="fa fa-home fa-lg"></span> Reserve Book
                                        </NavLink>
                                    </NavItem>
                                    <NavItem>
                                        <NavLink className="nav-link" to="/my-books" onClick={this.toggleModal}>
                                            <span className="fa fa-cart-arrow-down fa-lg"></span> My Books
                                        </NavLink>
                                    </NavItem>
                                </Nav> )
                            }
                            <Nav navbar className="ml-auto">
                                <UncontrolledDropdown nav inNavbar>
                                    <DropdownToggle nav caret>
                                        {localStorage.getItem(USER_NAME_SESSION_ATTRIBUTE_NAME)}
                                    </DropdownToggle>
                                    <DropdownMenu right>
                                        <DropdownItem to="/login" onClick={this.logoutPressed}>
                                            <span className="fa fa-sign-out fa-lg"></span> Logout
                                        </DropdownItem>
                                    </DropdownMenu>
                                </UncontrolledDropdown>
                            </Nav>
                        </Collapse> 
                    }
                </Navbar>
            </React.Fragment>
        );
    }
}

export default withRouter(HeaderComponent);

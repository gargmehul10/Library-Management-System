import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class FooterComponent extends Component {

    constructor(props) {
        
        super(props);
        
        this.state = {

        }
    }

    render() {
        return (
            <div className="footer">
                <div className="container">
                    <div className="row">             
                        { 
                            this.props.isUserLoggedIn && 
                            <div className="col-4 offset-1 col-sm-2">
                                <h5>Links</h5>
                                { 
                                    this.props.hasRole < 'ROLE_USER' ? (
                                    <ul className="list-unstyled">
                                        <li><Link to="/home"><u>Home</u></Link></li>
                                        <li><Link to="/add-book"><u>Add Book</u></Link></li>
                                        <li><Link to="/view-users"><u>View Users</u></Link></li>
                                        <li><Link to="/add-user"><u>Add User</u></Link></li>
                                    </ul>
                                    ) : (
                                    <ul className="list-unstyled">
                                        <li><Link to="/reserve-book"><u>Reserve Book</u></Link></li>
                                        <li><Link to="/my-books"><u>My Books</u></Link></li>
                                    </ul> )
                                }
                            </div> 
                        }
                        { 
                            this.props.isUserLoggedIn &&
                            <div className="col-10 offset-1 col-sm-7">
                                <h5>About</h5>
                                <p style={{ textAlign: "justify", textJustify: "inter-word" }}>Launched in 2020, LMS facilitates the working of a library. It allows the librarian to 
                                    maintain library resources in a more operative manner that will not only help save  
                                    time but will also be useful for students to keep a constant track of the availability 
                                    of all books in the library. </p>
                            </div>
                        }
                        { 
                            !this.props.isUserLoggedIn &&
                            <div className="col-10 offset-1 col-sm-11">
                                <h5>About</h5>
                                <p style={{ textAlign: "justify", textJustify: "inter-word" }}>Launched in 2020, LMS facilitates the working of library. It allows the librarian to 
                                    maintain library resources in a more operative manner that will not only help save  
                                    time but will also be useful for students to keep a constant track of the availability 
                                    of all books in the library. </p>
                            </div>
                        }
                    </div>
                    <div className="row justify-content-center">             
                        <div className="col-auto">
                            <p>© Copyright 2020 Library-Management-System (LMS)</p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default FooterComponent;

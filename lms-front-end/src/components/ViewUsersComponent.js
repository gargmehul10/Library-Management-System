import React, { Component } from 'react';
import { Breadcrumb, BreadcrumbItem, Table, Button } from 'reactstrap';
import { Link } from 'react-router-dom';
import AdminService from '../services/AdminService';
import { Spring } from 'react-spring/renderprops';

class ViewUsersComponent extends Component {

    constructor(props) {
        
        super(props);
        
        this.state = {
            users: [],
        }

        this.editUser = this.editUser.bind(this);
        this.deleteUser = this.deleteUser.bind(this);
    }

    
    
    editUser(id) {

        // call put rest api to update user email or password 
         this.props.history.push(`/update-user/${id}`);
    }

    deleteUser(id) {

        // do this inside rest api 
        AdminService.deleteUserById(id).then((res) => {
            
            this.setState({
                users: this.state.users.filter((user) => user.id !== id),
            })
        });
    }

    componentDidMount() {

        // fetch get request here 
        AdminService.getAllUsers().then((res) => {
            this.setState({
                users: res.data,
            })
            this.setState({
                users: this.state.users.filter((user) => user.role > 'ROLE_ADMIN'),
            })
        });
    }

    render() {
        return (
            <Spring
                from={{opacity: 0, padding: 20, }}
                to={{opacity: 1, padding: 0, }}>
                    { props => (
                        <div className="container content">
                            <div className="row">
                                <Breadcrumb>
                                    <BreadcrumbItem><Link to='/home'>Home</Link></BreadcrumbItem>
                                    <BreadcrumbItem active>View Users</BreadcrumbItem>
                                </Breadcrumb>
                                <div className="col-12">
                                    <h3>View Users</h3>
                                    <hr />
                                </div>
                            </div>
                            <div style={props} className="row col-auto">
                                <Table hover borderless>
                                    <thead>
                                        <tr>
                                            <th>Email ID</th>
                                            <th>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            this.state.users.map((user) => 
                                                <tr key={user.id}>
                                                    <td style={{width: "80%"}}>{user.emailId}</td>
                                                    <td style={{width: "20%"}}>
                                                        <Button outline color="primary" onClick={() => this.editUser(user.id)}>Update</Button>
                                                        <Button outline color="danger" style={{marginLeft: "10px"}} onClick={() => this.deleteUser(user.id)}>Delete</Button> 
                                                    </td>
                                                </tr>
                                            )
                                        }
                                    </tbody>
                                </Table>
                            </div>
                        </div>
                    )}
            </Spring>
        );
    }
}

export default ViewUsersComponent;

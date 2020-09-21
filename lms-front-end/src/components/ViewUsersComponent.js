import React, { Component } from 'react';
import { Breadcrumb, BreadcrumbItem, Table, Button, ButtonGroup } from 'reactstrap';
import { Link } from 'react-router-dom';
import AdminService from '../services/AdminService';
import { Spring } from 'react-spring/renderprops';
import { ToastContainer, toast, Flip } from 'react-toastify';

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

        AdminService.getUserById(id).then((response) => {

            if(response.data.books.length === 0) {

                AdminService.deleteUserById(id).then((res) => {
            
                    this.setState({
                        users: this.state.users.filter((user) => user.id !== id),
                    })

                    toast.success('☑️ User deleted successfully!');
                });
            }
            else {

                toast.error('❌ Unable to delete!', { autoClose: 2000 });
                toast.warn('⚠️ ' + response.data.emailId + ' has ' + response.data.books.length + ' books reserved.', { delay: 1000 });
            }
        });   
    }

    componentDidMount() {

        // fetch get request here 
        AdminService.getAllUsers().then((res) => {
            this.setState({
                users: res.data.filter((user) => user.role > 'ROLE_ADMIN'),
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
                                                        <ButtonGroup>
                                                            <Button outline color="primary" onClick={() => this.editUser(user.id)}>Update</Button>
                                                            <Button outline color="danger" onClick={() => this.deleteUser(user.id)}>Delete</Button> 
                                                        </ButtonGroup>
                                                    </td>
                                                </tr>
                                            )
                                        }
                                    </tbody>
                                </Table>
                            </div>
                            <ToastContainer
                                position="top-right"
                                autoClose={5000}
                                hideProgressBar={false}
                                newestOnTop={false}
                                closeOnClick
                                rtl={false}
                                pauseOnFocusLoss
                                draggablePercent={60}
                                pauseOnHover={false}
                                transition={Flip}
                            />
                        </div>
                    )}
            </Spring>
        );
    }
}

export default ViewUsersComponent;

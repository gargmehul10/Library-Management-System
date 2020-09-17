import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Breadcrumb, BreadcrumbItem, Button, Row, Col, Label, Alert } from 'reactstrap';
import { Control, LocalForm, Errors } from 'react-redux-form';
import AdminService from '../services/AdminService';
import { Spring } from 'react-spring/renderprops';

const required = (val) => val && val.length;
const maxLength =  (len) => (val) => !required(val) || val.length <= len;
const minLength =  (len) => (val) => !required(val) || val.length >= len;
const validEmail = (val) => !required(val) || /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(val);

class UpdateUserComponent extends Component {

    constructor(props) {
        
        super(props);
        
        this.state = {
            hasUpdateUserFailed: false,
            id: this.props.match.params.id,
            user: {
                emailId: '',
                password: '',
            },
        }

        this.handleSubmit = this.handleSubmit.bind(this);
        this.onDismiss = this.onDismiss.bind(this);
    }
    
    handleSubmit(values) {

        AdminService.updateUser(values, this.state.id).then((res) => {
            this.props.history.push('/view-users');
        }).catch(() => {
            this.setState({ hasUpdateUserFailed: true });
        });
    }

    onDismiss() {
        
        this.setState({
            hasUpdateUserFailed: false,
        });
    }

    componentDidMount() {

        AdminService.getUserById(this.state.id).then((res) => {
            this.setState({
                user: res.data,
            })
        }).catch(() => {
            this.setState({ hasUpdateUserFailed: true });
        });
    }

    render() {
        return (
            <Spring
                from={{opacity: 0, boxShadow: '0px 100px 150px -10px #2D3747', }}
                to={{opacity: 1, boxShadow: '0px 10px 20px 0px rgba(0,0,0,0.4)', }}>
                    { props => (
                        <div className="container content">
                            <div className="row">
                                <Breadcrumb>
                                    <BreadcrumbItem><Link to='/home'>Home</Link></BreadcrumbItem>
                                    <BreadcrumbItem><Link to='/view-users'>View Users</Link></BreadcrumbItem>
                                    <BreadcrumbItem active>Update User ({this.state.user.emailId})</BreadcrumbItem>
                                </Breadcrumb>
                                <div className="col-12">
                                    <h3>Update User</h3>
                                    <hr />
                                </div>
                            </div>
                            <div className="row justify-content-center">
                                <div style={props} className="card col-md-6">
                                    <div className="card-body">
                                        <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
                                            <Alert isOpen={this.state.hasUpdateUserFailed} toggle={this.onDismiss} color="danger">
                                                Some error occured!
                                            </Alert>
                                            <Row className="form-group">
                                                <Label htmlFor="emailId" md={12}>Email</Label>
                                                <Col md={12}>
                                                    <Control.text model=".emailId" id="emailId" name="emailId" 
                                                                placeholder={this.state.user.emailId} className="form-control" 
                                                                validators={{
                                                                    required, validEmail, 
                                                                }} />
                                                    <Errors 
                                                        className="text-danger"
                                                        model=".emailId"
                                                        show="touched"
                                                        component={(props) => <Alert color="danger" className="error">{props.children}</Alert>}
                                                        messages={{
                                                            required: 'Required', 
                                                            validEmail: 'Invalid Email Address', 
                                                        }}
                                                    />
                                                </Col>
                                            </Row>
                                            <Row className="form-group">
                                                <Label htmlFor="password" md={12}>Password</Label>
                                                <Col md={12}>
                                                    <Control type="password" model=".password" id="password" name="password"
                                                        placeholder="Password" className="form-control" 
                                                        validators={{
                                                            required, minLength: minLength(6), maxLength: maxLength(15), 
                                                        }}
                                                        />
                                                    <Errors 
                                                        className="text-danger"
                                                        model=".password"
                                                        show="touched"
                                                        component={(props) => <Alert color="danger" className="error">{props.children}</Alert>}
                                                        messages={{
                                                            required: 'Required ', 
                                                            minLength: 'Password length must be greater than 6 ', 
                                                            maxLength: 'Password length must be less than or equal to 15', 
                                                        }}
                                                    />
                                                </Col>
                                            </Row>
                                            <Row className="form-group float-right">
                                                <Col>
                                                    <Button type="submit" color="primary">
                                                        Update
                                                    </Button>
                                                </Col>
                                            </Row>
                                        </LocalForm>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
            </Spring>
        );
    }
}

export default UpdateUserComponent;

import React, { Component } from 'react'
import { Button, Row, Col, Label, Alert, Card, CardBody, CardTitle } from 'reactstrap';
import { Control, LocalForm } from 'react-redux-form';
import { Spring } from 'react-spring/renderprops';
import SigninService from '../services/SigninService';
import  { withRouter } from 'react-router-dom';

class LoginComponent extends Component {

    constructor(props) {

        super(props)

        this.state = {

            hasLoginFailed: false,
        }

        this.handleSubmit = this.handleSubmit.bind(this);
        this.onDismiss = this.onDismiss.bind(this);
    }

    handleSubmit(values) {

        // AuthenticationService.executeBasicAuthenticationService(values.emailId, values.password).then(() => {
        //     AuthenticationService.registerSuccessfulLogin(values.emailId, values.password);
        //     this.props.history.push('/home');
        // }).catch(() => {
        //     this.setState({ hasLoginFailed: true });
        // });

        SigninService.executeBasicAuthenticationService(values).then((res) => {
            var role = res.data;
            if(role < 'ROLE') {
                this.setState({ hasLoginFailed: true });
                // this.props.isLoggedIn(false);
                // this.props.roleOfUser('');
            }
            else {
                SigninService.registerSuccessfulLogin(values.emailId, role);
                this.props.isLoggedIn(true);
                this.props.roleOfUser(role);
                if(role < 'ROLE_USER')
                    this.props.history.push('/home');
                else
                    this.props.history.push('/reserve-book');
            }
        });
    }

    onDismiss() {
        
        this.setState({
            hasLoginFailed: false,
        });
    }

    render() {

        return (
            <Spring
                from={{opacity: 0, boxShadow: '0px 100px 150px -10px #2D3747', }}
                to={{opacity: 1, boxShadow: '0px 10px 20px 0px rgba(0,0,0,0.4)', }}>
                    { props => (
                        <div className="container">
                            <br />
                            <div className="row justify-content-center">
                                <Card style={props} className="col-md-5">
                                    <CardBody>
                                        <CardTitle className="text-center">
                                            LOGIN
                                        </CardTitle>
                                        <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
                                            <Alert isOpen={this.state.hasLoginFailed} toggle={this.onDismiss} color="danger">
                                                Invalid Credentials
                                            </Alert>
                                            <Row className="form-group">
                                                <Label htmlFor="emailId" md={12}>Email</Label>
                                                <Col md={12}>
                                                    <Control.text model=".emailId" id="emailId" name="emailId" 
                                                                placeholder="Email" className="form-control" />
                                                </Col>
                                            </Row>
                                            <Row className="form-group">
                                                <Label htmlFor="password" md={12}>Password</Label>
                                                <Col md={12}>
                                                    <Control type="password" model=".password" id="password" name="password"
                                                            placeholder="Password"
                                                            className="form-control" />
                                                </Col>
                                            </Row>
                                            {/* <Row className="form-group">
                                                <Col md={6}>
                                                    <Label><Control.radio model=".loginType" value="admin" /> Admin</Label>
                                                </Col>
                                                <Col md={6}>
                                                    <Label><Control.radio model=".loginType" value="user" /> User</Label>
                                                </Col>
                                            </Row> */}
                                            <Row className="form-group float-right">
                                                <Col>
                                                    <Button outline size="lg" type="submit" color="success" style={{width: "100%"}}>
                                                        Login
                                                    </Button>
                                                </Col>
                                            </Row>
                                        </LocalForm>
                                    </CardBody>
                                </Card>
                            </div>
                            <br />
                        </div>
                    )}
            </Spring>
        )
    }
}

export default withRouter(LoginComponent);

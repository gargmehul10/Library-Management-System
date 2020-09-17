import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Breadcrumb, BreadcrumbItem, Button, Row, Col, Label, Alert } from 'reactstrap';
import { Control, LocalForm, Errors } from 'react-redux-form';
import AdminService from '../services/AdminService';
import { Spring } from 'react-spring/renderprops';

const required = (val) => val && val.length;
const isNumber = (val) => !required(val) || !isNaN(Number(val));
const greaterThanZero = (val) => !required(val) || !isNumber(val) || val>0;

class AddBookComponent extends Component {

    constructor(props) {
        
        super(props);
        
        this.state = {
            hasAddBookFailed: false,
        }

        this.handleSubmit = this.handleSubmit.bind(this);
        this.onDismiss = this.onDismiss.bind(this);
    }
    
    handleSubmit(values) {

        AdminService.createBook(values).then((res) => {
            this.props.history.push('/view-books');
        }).catch(() => {
            this.setState({ hasAddBookFailed: true });
        });

        // console.log("Created Book: " + JSON.stringify(values));
        // alert("Created Book: " + JSON.stringify(values));
    }

    onDismiss() {
        
        this.setState({
            hasAddBookFailed: false,
        });
    }

    render() {
        return (
            <div className="container content">
                <div className="row">
                    <Breadcrumb>
                        <BreadcrumbItem><Link to='/home'>Home</Link></BreadcrumbItem>
                        <BreadcrumbItem active>Add Book</BreadcrumbItem>
                    </Breadcrumb>
                </div>
                <Spring
                    from={{opacity: 0, boxShadow: '0px 100px 150px -10px #2D3747', }}
                    to={{opacity: 1, boxShadow: '0px 10px 20px 0px rgba(0,0,0,0.4)', }}>
                        { props => (
                            <div className="row justify-content-center">
                                <div className="col-12">
                                    <h3>Add Book</h3>
                                    <hr />
                                </div>
                                <div style={props} className="card col-sm-6">
                                    <div className="card-body">
                                        <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
                                            <Alert isOpen={this.state.hasAddBookFailed} toggle={this.onDismiss} color="danger">
                                                Some error occured!
                                            </Alert>
                                            <Row className="form-group">
                                                <Label htmlFor="name" md={12}>Name</Label>
                                                <Col md={12}>
                                                    <Control.text model=".name" id="name" name="name" 
                                                                placeholder="Name" className="form-control" 
                                                                validators={{
                                                                    required, 
                                                                }} />
                                                    <Errors 
                                                        className="text-danger"
                                                        model=".name"
                                                        show="touched"
                                                        component={(props) => <Alert color="danger" className="error">{props.children}</Alert>}
                                                        messages={{
                                                        required: 'Required', 
                                                    }}
                                                    />
                                                </Col>
                                            </Row>
                                            <Row className="form-group">
                                                <Label htmlFor="category" md={12}>Category</Label>
                                                <Col md={12}>
                                                    <Control.text model=".category" id="category" name="category"
                                                        placeholder="Category"
                                                        className="form-control"
                                                        validators={{
                                                            required, 
                                                        }}
                                                        />
                                                    <Errors 
                                                        className="text-danger"
                                                        model=".category"
                                                        show="touched"
                                                        component={(props) => <Alert color="danger" className="error">{props.children}</Alert>}
                                                        messages={{
                                                            required: 'Required ', 
                                                        }}
                                                    />
                                                </Col>
                                            </Row>
                                            <Row className="form-group">
                                                <Label htmlFor="quantity" md={12}>Quantity</Label>
                                                <Col md={12}>
                                                    <Control.text model=".quantity" id="quantity" name="quantity" 
                                                                placeholder="Quantity" className="form-control" 
                                                                validators={{
                                                                    required, isNumber, greaterThanZero, 
                                                                }} />
                                                    <Errors 
                                                        className="text-danger"
                                                        model=".quantity"
                                                        show="touched"
                                                        component={(props) => <Alert color="danger" className="error">{props.children}</Alert>}
                                                        messages={{
                                                            required: 'Required', 
                                                            isNumber: 'Must be a number', 
                                                            greaterThanZero: 'Must be greater than zero', 
                                                        }}
                                                    />
                                                </Col>
                                            </Row>
                                            <Row className="form-group float-right">
                                                <Col>
                                                    <Button type="submit" color="primary">
                                                        Add
                                                    </Button>
                                                </Col>
                                            </Row>
                                        </LocalForm>
                                    </div>
                                </div>
                            </div>
                        )}
                </Spring>
            </div>
        );
    }
}

export default AddBookComponent;

import React, { Component } from 'react';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import { Spring } from 'react-spring/renderprops';
import { Button, Alert } from 'reactstrap';
import AdminService from '../services/AdminService';
import { USER_NAME_SESSION_ATTRIBUTE_NAME } from '../services/SigninService';
import UserService from '../services/UserService';

class ReserveBookComponent extends Component {

    constructor(props) {
        
        super(props);
        
        this.state = {
            data: [],
            isBookFinished: false,
            isReserved: false,
            onReserveText: '',
            reservedBooksCount: 0,
        }

        this.onDismissBookFinished = this.onDismissBookFinished.bind(this);
        this.onDismissReserved = this.onDismissReserved.bind(this);
    }

    componentDidMount() {

        AdminService.getAllBooks().then((res) => {

            // this.setState({
            //     data: res.data,
            // })
            UserService.getUserByEmailId(localStorage.getItem(USER_NAME_SESSION_ATTRIBUTE_NAME)).then((response) => {

                this.setState({
                    data: res.data.filter((book) => !response.data.books.includes(book.id)),
                    reservedBooksCount: response.data.books.length,
                })
            })
        });
    }

    onClickProductSelected(row){

        if(row.quantity === 0 || this.state.reservedBooksCount === 3) {
            this.setState({
                isBookFinished: true,
            });
        }
        else {
            // reserve book api
            UserService.reserveBook(row.id, localStorage.getItem(USER_NAME_SESSION_ATTRIBUTE_NAME)).then((res) => {

                this.setState({
                    // data: this.state.data.forEach((obj) => {
                    //     if(obj.id === row.id) {
                    //         obj["quantity"]--;
                    //     }
                    // }),
                    data: this.state.data.filter((book) => book.id !== row.id),
                    isReserved: true,
                    onReserveText: row.name,
                    reservedBooksCount: this.state.reservedBooksCount+1,
                })
            });
        }
    }
     
    cellButton(cell, row, enumObject, rowIndex) {

         return (
            <Button outline color="success" onClick={() => this.onClickProductSelected(row)}>Reserve</Button>
         )
    }

    createCustomClearButton = (onClick) => {
        
        return (
          <Button color="warning" onClick={ onClick } style={{marginLeft: "1px"}}>Clear</Button>
        );
    }

    onDismissBookFinished() {
        
        this.setState({
            isBookFinished: !this.state.isBookFinished,
        });
    }

    onDismissReserved() {
        
        this.setState({
            isReserved: !this.state.isReserved,
        });
    }

    render() {

        const options = {
            searchDelayTime: 100,
            clearSearch: true,
            clearSearchBtn: this.createCustomClearButton,
            prePage: 'Previous',
            nextPage: 'Next',
          };

        return (
            <Spring
                from={{opacity: 0, padding: 20, }}
                to={{opacity: 1, padding: 0, }}>
                    { props => (
                        <div style={props} className="container content">
                            <Alert isOpen={this.state.isBookFinished} toggle={this.onDismissBookFinished} color="danger">
                                { this.state.reservedBooksCount !== 3 ? ( <h5>This book is currently unavailable. Please check later!</h5> ) : ( <h5>You can only reserve a maximum of 3 books.</h5> ) } 
                            </Alert>
                            <Alert isOpen={this.state.isReserved} toggle={this.onDismissReserved} color="success">
                                <h5>{this.state.onReserveText} has been reserved successfully!</h5>
                                <hr />
                                <p>Please note that this book can be reserved only for a maximum of 2 weeks.</p>
                            </Alert>
                            <BootstrapTable 
                                data={this.state.data} 
                                version='4'   
                                hover 
                                bordered={false}
                                search={true} 
                                multiColumnSearch={true} 
                                options={options} 
                                pagination={true}>
                                <TableHeaderColumn width="90" isKey dataField='id'>Book ID</TableHeaderColumn>
                                <TableHeaderColumn width="600" dataField='name' dataSort={true}>Name</TableHeaderColumn>
                                <TableHeaderColumn width="200" dataField='category' dataSort={true}>Category</TableHeaderColumn>
                                <TableHeaderColumn width="110" dataField='quantity' dataSort={true}>Quantity</TableHeaderColumn>
                                <TableHeaderColumn width="100" dataField='button' dataFormat={this.cellButton.bind(this)}>Action</TableHeaderColumn>
                            </BootstrapTable>
                        </div>
                    )}
            </Spring>
        );
    }
}

export default ReserveBookComponent;
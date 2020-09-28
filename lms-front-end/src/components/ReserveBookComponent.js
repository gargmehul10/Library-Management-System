import React, { Component } from 'react';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import { Spring } from 'react-spring/renderprops';
import { Button, Alert } from 'reactstrap';
import AdminService from '../services/AdminService';
import { USER_NAME_SESSION_ATTRIBUTE_NAME } from '../services/SigninService';
import UserService from '../services/UserService';
import { ToastContainer, toast, Flip } from 'react-toastify';

class ReserveBookComponent extends Component {

    constructor(props) {
        
        super(props);
        
        this.state = {
            data: [],
            isReserved: false,
            onReserveText: '',
            reservedBooksCount: 0,
        }

        this.onDismissReserved = this.onDismissReserved.bind(this);
    }

    componentDidMount() {

        AdminService.getAllBooks().then((res) => {

            UserService.getUserByEmailId(localStorage.getItem(USER_NAME_SESSION_ATTRIBUTE_NAME)).then((response) => {

                this.setState({
                    data: res.data.filter((book) => !response.data.books.some((reservedBook) => book.id === reservedBook.id)),
                    reservedBooksCount: response.data.books.length,
                })
            })
        });
    }

    onClickProductSelected(row){

        if(row.quantity === 0 ) {
            
            toast.error('This book is currently unavailable. Please check later!');
        } else if(this.state.reservedBooksCount === 3) {

            toast.error('You can only reserve a maximum of 3 books.');
        }
        else {
            // reserve book api
            UserService.reserveBook(row.id, localStorage.getItem(USER_NAME_SESSION_ATTRIBUTE_NAME)).then((res) => {

                toast.success('☑️ Book reserved successfully!');
                
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
            sizePerPageList: [ 5, 10, 25, 30, 50 ], 
          };

        return (
            <Spring
                from={{opacity: 0, padding: 20, }}
                to={{opacity: 1, padding: 0, }}>
                    { props => (
                        <div style={props} className="container content">
                            <Alert isOpen={this.state.isReserved} toggle={this.onDismissReserved} color="warning">
                                <span role="img" aria-label="waring">⚠️</span> Please note that {this.state.onReserveText} can be reserved only for a maximum of 2 weeks.
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

export default ReserveBookComponent;
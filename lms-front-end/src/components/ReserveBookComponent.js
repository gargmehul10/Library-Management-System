import React, { Component } from 'react';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import { Spring } from 'react-spring/renderprops';
import { Button, Alert } from 'reactstrap';
import AdminService from '../services/AdminService';

class ReserveBookComponent extends Component {

    constructor(props) {
        
        super(props);
        
        this.state = {
            data: [],
            isBookFinished: false,
        }

        this.onDismiss = this.onDismiss.bind(this);
    }

    componentDidMount() {
        AdminService.getAllBooks().then((res) => {

            this.setState({
                data: res.data,
            })
        });
    }

    onClickProductSelected(row){

        if(row.quantity == 0) {
            this.setState({
                isBookFinished: true,
            });
        }
        else {
            // reserve book api
            alert('Book reserved: ' + JSON.stringify(row));
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

    onDismiss() {
        
        this.setState({
            isBookFinished: false,
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
                            <Alert isOpen={this.state.isBookFinished} toggle={this.onDismiss} color="danger">
                                This book is currently unavailable. Please check later! 
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
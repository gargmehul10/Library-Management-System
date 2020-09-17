import React, { Component } from 'react';
import { MDBDataTable } from 'mdbreact';
import AdminService from '../services/AdminService';
import { Spring } from 'react-spring/renderprops';

class HomeComponent extends Component {

    constructor(props) {
        
        super(props);
        
        this.state = {
            data: {}
        }
    }
    
    componentDidMount() {

        // fetch get request here 
        AdminService.getAllBooks().then((res) => {
            this.setState({
                data: { 
                    columns: [
                        {
                            label: 'Name',
                            field: 'name',
                            sort: 'asc',
                            width: 270,
                        },
                        {
                            label: 'Category',
                            field: 'category',
                            sort: 'asc',
                            width: 150,
                        },
                        {
                            label: 'Quantity', 
                            field: 'quantity',
                            sort: 'asc', 
                            width: 100,
                        }
                    ],
                    rows: res.data,
                }
            })

             // this.setState({
            //     rows: this.state.data.rows.forEach(element => {
            //        element.action = <Button outline color="warning" onClick={this.handleClick(element.id)}>Reserve</Button>
            //     }),
            // })
        });
    }

    render() {
        return (
            <Spring
                from={{opacity: 0, padding: 20, }}
                to={{opacity: 1, padding: 0, }}>
                    { props => (
                        <div style={props} className="container content">
                            <MDBDataTable striped bordered data={this.state.data} />
                        </div>
                    )}
            </Spring>
        );
    }
}

export default HomeComponent;
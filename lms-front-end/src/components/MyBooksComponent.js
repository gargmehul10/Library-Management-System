import React, { Component } from 'react';
import { Spring } from 'react-spring/renderprops';
import { Badge, Button, Table } from 'reactstrap';
import AdminService from '../services/AdminService';
import { USER_NAME_SESSION_ATTRIBUTE_NAME } from '../services/SigninService';
import UserService from '../services/UserService';
import { ToastContainer, toast, Flip } from 'react-toastify';
import moment from 'moment'

class MyBooksComponent extends Component {

    constructor(props) {
        
        super(props);
        
        this.state = {
            reservedBooks: [],
        }

        this.returnBook = this.returnBook.bind(this);
    }
    
    returnBook(id) {

        UserService.returnBook(id, localStorage.getItem(USER_NAME_SESSION_ATTRIBUTE_NAME)).then((res) => {
            
            this.setState({

                reservedBooks: this.state.reservedBooks.filter((book) => book.id !== id),
            });

            toast.success('☑️ Book returned successfully!');
        });
    }

    componentDidMount() {

        AdminService.getAllBooks().then((res) => {

            UserService.getUserByEmailId(localStorage.getItem(USER_NAME_SESSION_ATTRIBUTE_NAME)).then((response) => {

                // this.setState({
                //     // reservedBooks: res.data.filter((book) => response.data.books.includes(book.id)),
                //     reservedBooks: res.data.filter((book) => response.data.books.some((reservedBook) => book.id === reservedBook.id)),  
                // })

                this.setState({
                    reservedBooks: response.data.books.map((reservedBook) => ({...res.data.find((book) => (book.id === reservedBook.id) && book), ...reservedBook})),
                })
            })
        })
    }

    calculateDays(reservedDate) { 

        return 14 - moment().diff(moment(reservedDate, 'YYYY/M/D'), 'days');
    }

    render() {
        return (
            <Spring
                from={{opacity: 0, padding: 20, }}
                to={{opacity: 1, padding: 0, }}>
                    { props => (
                        <div style={props} className="container content">
                            <div className="row">
                                <div className="col-12">
                                    <h3>My Books</h3>
                                    <hr />
                                </div>
                            </div>
                            <div className="row col-auto">
                                <Table hover borderless>
                                    <thead>
                                        <tr>
                                            <th>Name</th>
                                            <th>Category</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            this.state.reservedBooks.map((book) => 
                                                <tr key={book.id}>
                                                    <td style={{width: "62%"}}>{book.name} { this.calculateDays(book.reserveDate)>0 ? ( <Badge color="success" pill>{this.calculateDays(book.reserveDate)} days left</Badge> ) : ( <Badge color="danger">Time up!</Badge> ) }</td>
                                                    <td style={{width: "30%"}}>{book.category}</td>
                                                    <td style={{width: "8%"}}>
                                                        <Button outline color="danger" onClick={() => this.returnBook(book.id)}>Return</Button>
                                                    </td>
                                                </tr>
                                            )
                                        }
                                    </tbody>
                                </Table>
                            </div>
                            <ToastContainer
                                position="top-right"
                                autoClose={3000}
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

export default MyBooksComponent;
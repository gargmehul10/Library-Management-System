import React, { Component } from 'react';
import { Spring } from 'react-spring/renderprops';
import { Button, Table } from 'reactstrap';
import AdminService from '../services/AdminService';
import { USER_NAME_SESSION_ATTRIBUTE_NAME } from '../services/SigninService';
import UserService from '../services/UserService';
import { ToastContainer, toast, Flip } from 'react-toastify';

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

                this.setState({
                    reservedBooks: res.data.filter((book) => response.data.books.includes(book.id)),
                })
            })
        });
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
                                                    <td style={{width: "62%"}}>{book.name}</td>
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

export default MyBooksComponent;
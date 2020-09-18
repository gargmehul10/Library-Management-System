import React, { Component } from 'react';
import { Spring } from 'react-spring/renderprops';
import { Button, Table } from 'reactstrap';

class MyBooksComponent extends Component {

    constructor(props) {
        
        super(props);
        
        this.state = {
            reservedBooks: [
                {
                    id: 7,
                    name: 'Pro Spring',
                    category: 'Spring',
                },
                {
                    id: 10,
                    name: 'Head First Java',
                    category: 'Java',
                },
                {
                    id: 14,
                    name: 'Introduction to Docker',
                    category: 'Docker',
                }
            ],
        }

        this.returnBook = this.returnBook.bind(this);
    }
    
    returnBook(id) {

        this.setState({

            reservedBooks: this.state.reservedBooks.filter((book) => book.id !== id),
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
                        </div>
                    )}
            </Spring>
        );
    }
}

export default MyBooksComponent;
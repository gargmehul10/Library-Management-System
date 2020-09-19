import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api/user';

class UserService {

    reserveBook(bookId, emailId) {

        return axios.post(API_BASE_URL + '/reserve/' + bookId, { emailId: emailId });
    }

    getUserByEmailId(emailId) {

        let user = { emailId: emailId };
        return axios.post(API_BASE_URL + '/mybooks', user);
    }

    returnBook(bookId, emailId) {

        return axios.post(API_BASE_URL + '/return/' + bookId, { emailId: emailId });
    }
}

export default new UserService();

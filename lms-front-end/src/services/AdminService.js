import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api/admin';

class AdminService {

    getAllUsers() {
        return axios.get(API_BASE_URL + '/users');
    }

    createUser(user) {
        return axios.post(API_BASE_URL + '/users', user); 
    }

    deleteUserById(id) {
        return axios.delete(API_BASE_URL + '/users/' + id);
    }

    getUserById(id) {
        return axios.get(API_BASE_URL + '/users/' + id);
    }

    updateUser(user, userId) {
        return axios.put(API_BASE_URL + '/users/' + userId, user);
    }

    createBook(book) {
        return axios.post(API_BASE_URL + '/books', book);
    }

    getAllBooks() {
        return axios.get(API_BASE_URL + '/books');
    }
}

export default new AdminService();

import axios from 'axios';

const API_URL = 'http://localhost:8080/api';
export const USER_NAME_SESSION_ATTRIBUTE_NAME = 'username';
export const ROLE_SESSION_ATTRIBUTE_NAME = 'role';

class SigninService {

    executeBasicAuthenticationService(user) {

        return axios.post(`${API_URL}/signin`, user);
    }

    registerSuccessfulLogin(username, role) {
        
        localStorage.setItem(USER_NAME_SESSION_ATTRIBUTE_NAME, username);
        localStorage.setItem(ROLE_SESSION_ATTRIBUTE_NAME, role);
    }

    isUserLoggedIn() {

        let user = localStorage.getItem(USER_NAME_SESSION_ATTRIBUTE_NAME);
        if (user === null) 
        return false;
        return true;
    }

    logout() {

        localStorage.removeItem(USER_NAME_SESSION_ATTRIBUTE_NAME);
        localStorage.removeItem(ROLE_SESSION_ATTRIBUTE_NAME);
    }
}

export default new SigninService();

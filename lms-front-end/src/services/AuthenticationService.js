import axios from 'axios';

const API_URL = 'http://localhost:8080';
export const USER_NAME_SESSION_ATTRIBUTE_NAME = 'authenticatedUser';
export const AUTHORIZATION_HEADER_ATTRIBUTE_NAME = 'TOKEN';

class AuthenticationService {

    executeBasicAuthenticationService(username, password) {

        return axios.get(`${API_URL}/basicauth`, { headers: { authorization: this.createBasicAuthToken(username, password) } });
    }

    createBasicAuthToken(username, password) {

        // encode in base 64 
        return 'Basic ' + window.btoa(username + ":" + password);
    }

    setupAxiosInterceptors(token) {

        axios.interceptors.request.use(
            (config) => {
                console.log(config);
                if (this.isUserLoggedIn()) {
                    config.headers.authorization = token;
                }
                return config;
            }
        )
    }

    registerSuccessfulLogin(username, password) {
        
        sessionStorage.setItem(USER_NAME_SESSION_ATTRIBUTE_NAME, username);
        sessionStorage.setItem(AUTHORIZATION_HEADER_ATTRIBUTE_NAME, this.createBasicAuthToken(username, password));
        this.setupAxiosInterceptors(this.createBasicAuthToken(username, password));
    }

    logout() {
        sessionStorage.removeItem(USER_NAME_SESSION_ATTRIBUTE_NAME);
        sessionStorage.removeItem(AUTHORIZATION_HEADER_ATTRIBUTE_NAME);
    }

    isUserLoggedIn() {
        let user = sessionStorage.getItem(USER_NAME_SESSION_ATTRIBUTE_NAME);
        if (user === null) 
        return false;
        return true;
    }

    // getLoggedInUserName() {
    //     let user = sessionStorage.getItem(USER_NAME_SESSION_ATTRIBUTE_NAME);
    //     if (user === null) return '';
    //     return user;
    // }
}

export default new AuthenticationService();

class User {
    static isAuthenticated() {
        return localStorage.getItem('token') != null
    }

    static saveUser(token) {
        localStorage.setItem('token', token);
    }

    static getToken() {
        return localStorage.getItem('token');
    }
}


export default User;

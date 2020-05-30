class User {
    static isAuthenticated() {
        return localStorage.getItem('token') != null
    }

    static saveUser(token) {
        localStorage.setItem('token', token);
    }
}


export default User;

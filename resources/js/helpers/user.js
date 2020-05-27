class User {
    static isAuthenticated() {
        if (localStorage.getItem('access_token') == null) {
            return false;
        }
        return true;
    }

    static saveUser(token) {
        localStorage.setItem('access_token', token);
    }
}


export default User;

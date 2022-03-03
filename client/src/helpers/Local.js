// Functions related to local storage

const Local = {

    saveUserInfo(token, user) {
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(user));
    },
    
    removeUserInfo() {
        console.log("The local storage function got called")
        localStorage.removeItem('token');
        localStorage.removeItem('user');
    },

    getUserId() {
        let userjson = localStorage.getItem('user');
        if (!userjson) {
            return '';
        }
        let user = JSON.parse(userjson);
            return user.userid;
    },

    getToken() {
        return (localStorage.getItem('token') || '');
    },

    saveUserInfo(token, user) {
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(user));
    },

    getUser() {
        let userjson = localStorage.getItem('user');
        return userjson ? JSON.parse(userjson) : null;
    },

    getUserId() {
        let userjson = localStorage.getItem('user');
        if (!userjson) {
            return '';
        }
        let user = JSON.parse(userjson);
        return user.userid;
    },

    getUsername() {
        let userjson = localStorage.getItem('user');
        if (!userjson) {
            return '';
        }
        let user = JSON.parse(userjson);
        return user.username;
    }
}

export default Local;
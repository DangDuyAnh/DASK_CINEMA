function logout() {
    localStorage.removeItem('user');
    localStorage.removeItem('userToken');
}

function login(user, token){
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('userToken', token);
}

function changeUser(user){
    localStorage.setItem('user', JSON.stringify(user));
}

function getUser() {
    return JSON.parse(localStorage.getItem('user'));
}

function getUserToken() {
    return localStorage.getItem('userToken')
}

export const authenticationService = {logout, login, getUser, getUserToken, changeUser};

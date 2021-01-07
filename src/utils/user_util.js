export function saveUser(user) {
    sessionStorage.setItem('user', user);
}

export function getUser() {
    return sessionStorage.getItem('user');
}

export function removeUser() {
    sessionStorage.removeItem('user');
}
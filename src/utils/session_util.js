export function saveJwt(jwt) {
    sessionStorage.setItem('token', jwt);
}

export function getJwt() {
    return sessionStorage.getItem('token');
}

export function deleteJwt() {
    sessionStorage.removeItem('token');
}

export function isLoggedIn() {
    const jwt = getJwt();
    return jwt !== null;
}
export function getHeaders(jwt) {
    return {
        headers: {
            Authorization:
                'Bearer ' + jwt
        },
    }
}

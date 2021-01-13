export function saveOrder(order) {
    sessionStorage.setItem('order', JSON.stringify(order));
}

export function getOrder() {
    return JSON.parse(sessionStorage.getItem('order'));
}

export function hasOrder() {
    const order = getOrder();
    return order !== null;
}
export function removeOrder() {
    sessionStorage.removeItem('order');
}
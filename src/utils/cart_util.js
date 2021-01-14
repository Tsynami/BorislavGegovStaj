export function getCartItems() {
    return JSON.parse(sessionStorage.getItem( 'cart'));
}

export function findCartItem(item) {
    let cartItems = getCartItems();
    if (!cartItems) {
        return null;
    }
    return cartItems.find(cartItem => cartItem.id == item.id);
}

export function findCartItemIndex(item) {
    let cartItems = getCartItems();
    if (!cartItems) {
        return -1;
    }
    return cartItems.findIndex(cartItem => cartItem.id == item.id);
}

export function addCartItem(item) {
    let cartItems = getCartItems();
    if (!cartItems) {
        cartItems = [item];
    }
    else
    {
        const isItemFound = findCartItem(item);
        if (!isItemFound){
            cartItems.push(item);
        }
    }
    sessionStorage.setItem('cart', JSON.stringify(cartItems));
}

export function removeCartItem(item) {
    let cartItems = getCartItems();
    if (!cartItems)
    {
        return;
    }
    else
    {
        const itemIndex = findCartItemIndex(item);
        if (itemIndex > -1)
        {
            cartItems.splice(itemIndex, 1);
        }
    }
    sessionStorage.setItem('cart', JSON.stringify(cartItems));
}

export function updateCartItem(item) {
    let cartItems = getCartItems();
    if (!cartItems)
    {
        return;
    }
    else
    {
        const itemIndex = findCartItemIndex(item);
        if (itemIndex > -1)
        {
            cartItems[itemIndex] = Object.assign(item);
        }
    }
    sessionStorage.setItem('cart', JSON.stringify(cartItems));
}

export function getCountCartItems() {
    let cartItems = getCartItems();
    return cartItems ? cartItems.length : 8;
}

export function clearCart() {
    sessionStorage.removeItem('cart');
}
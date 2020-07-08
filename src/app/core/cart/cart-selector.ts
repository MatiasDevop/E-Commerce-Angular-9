import { CartState } from './cart-state';

export const getCartItemsCount = (state: CartState) =>{
    const cartItems = state.cartItems;
    const totalCartCount = cartItems.reduce(
        (totalCount, currentItem) => totalCount + 
        currentItem.quantity,
        0
    );
    return totalCartCount;
}
import { Injectable } from '@angular/core';
import { CartState, initialState } from './cart-state';
import { Store } from '@core/store';
import { LogService } from '@core/log.service';
import { CartItem } from './cart-item';

@Injectable({ providedIn: 'root'})
export class CartStore extends Store<CartState> {
   
    constructor(private logService: LogService) {
        super(initialState);
    }

    addCartItem = (cartItemToAdd: CartItem) => {
        this.logService.log("[Cart] Add Item", cartItemToAdd);// you can add this service onto all CRUD

        this.setState({
            ...this.state,
            cartItems: [].concat(this.state.cartItems, cartItemToAdd)
        });
        // const . = {
        //     ... this.state, // cartItems,this instruction just is to update
        //     cartItems: [].concat(this.state.cartItems, cartItemToAdd)
        // };

        // this.setState(newState); 
    };

    clearCart() {
        console.log('[Cart] Clear cart item');
        const newState = initialState;
         
        this.setState(newState);
    }

    restoreCart(stateToRestore: CartState) {
        console.log('[CArt] Restore cart cart item');

        this.setState(stateToRestore);
    }
    
    removeCartItem(cartItemToRemove: import("./cart-item").CartItem) {
        console.log('[Cart] Remove cart item');
        const newState = {
            ... this.state, // cartItems
            cartItems: this.state.cartItems.filter(cartItem => cartItem.id != cartItemToRemove.id)
        };

        this.setState(newState); 
    }
    updateCartItem(cartItemToUpdate: CartItem) {
        console.log('[Cart] Update cart item');
        const newState = {
            ... this.state, // cartItems[1, 3]
            cartItems: this.state.cartItems.map(cartItem => 
                cartItem.id === cartItemToUpdate.id ? 
                cartItemToUpdate
                : cartItem)
        };
        
        this.setState(newState);
    }
}

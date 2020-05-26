import { Injectable } from '@angular/core';
import { CartState, initialState } from './cart-state';
import { Store } from '@core/store';
import { LogService } from '@core/log.service';

@Injectable({ providedIn: 'root'})
export class CartStore extends Store<CartState> {
    
    constructor(private logService: LogService) {
        super(initialState);
    }

    addCartItem(cartItemToAdd: import("./cart-item").CartItem) {
        console.log('[Cart] Add cart item');
     const newState = {
        ... this.state, // cartItems,this instruction just is to update
        cartItems: [].concat(this.state.cartItems, cartItemToAdd)
     };

     this.setState(newState);
       
    }
  
}

import { Injectable } from '@angular/core';
import { LogService } from '@core/log.service';
import { CartStore } from './cart-store';
import { Product } from '@core/products/product';
import { of } from 'rxjs';
import { CartItem } from './cart-item';

export const ALLOWED_PRODUCT_QUANTITIES = Array.from(
  { length: 30 },
  (v, i) => i + 1
  );

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private logService: LogService, private cartStore: CartStore) { }

  addToCart(product: Product, quantity: number){
    this.logService.log('[Cart] Add item');
    const cartItemToAdd = {
      ...product,
      quantity,
      itemTotal:product.price * quantity
    }
    this.cartStore.addCartItem(cartItemToAdd);
    return of(cartItemToAdd)
  }

  updateCartItem(cartItemToUpdate: CartItem){
    cartItemToUpdate = {
      ...cartItemToUpdate,
      itemTotal : cartItemToUpdate.price * cartItemToUpdate.quantity,
    };

    this.cartStore.updateCartItem(cartItemToUpdate);

    return of(cartItemToUpdate);
  }

  removeCartItem(itemToRemove: CartItem){
    this.cartStore.removeCartItem(itemToRemove);

    return of(itemToRemove);
  }
}

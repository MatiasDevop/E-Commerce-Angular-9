import { Component, OnInit } from '@angular/core';
import { CartStore } from '@core/cart/cart-store';
import { Observable } from 'rxjs';
import { getCartItemsCount, getCartItems } from '@core/cart/cart-selector';
import { CartItem } from '@core/cart/cart-item';
import { ALLOWED_PRODUCT_QUANTITIES } from '@core/cart/cart.service';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss']
})
export class ShoppingCartComponent implements OnInit {

  cartItemsCount: Observable<number>;
  cartItems: Observable<CartItem[]>;
  availableQuantities: number[];
  displayedColumns = ["imgUrl", "name", "price", "quantity", "remove"];
  constructor(private cartStore: CartStore) { }

  ngOnInit(): void {
    
    this.availableQuantities = ALLOWED_PRODUCT_QUANTITIES;
    this.cartItemsCount = this.cartStore.select(getCartItemsCount); 
    this.cartItems = this.cartStore.select(getCartItems);

  }

  updateCartItem($event:{value: number}, cartItem: CartItem){
    console.log("Attempting to update quantity from cart page");
  }

  removeCartItem(cartItem: CartItem){
    console.log("Attempting to remove item from cart page");
  }

}

import { Component, OnInit } from '@angular/core';
import { CartStore } from '@core/cart/cart-store';
import { Observable } from 'rxjs';
import { getCartSubTotal, getCartItemsCount, getShippingCost, getEstimatedTax, getOrderTotal } from '@core/cart/cart-selector';

@Component({
  selector: 'app-cart-summary',
  templateUrl: './cart-summary.component.html',
  styleUrls: ['./cart-summary.component.scss']
})
export class CartSummaryComponent implements OnInit {
  cartSubTotal: Observable<number>;
  cartItemsCount: Observable<number>;
  shippingCost: Observable<number>;
  estimatedTax: Observable<number>;
  orderTotal: Observable<number>;

  constructor(private cartStore: CartStore) { }

  ngOnInit(): void {
    this.cartSubTotal = this.cartStore.select(getCartSubTotal);
    this.cartItemsCount = this.cartStore.select(getCartItemsCount);
    this.shippingCost = this.cartStore.select(getShippingCost);
    this.estimatedTax = this.cartStore.select(getEstimatedTax);
    this.orderTotal = this.cartStore.select(getOrderTotal);
  }

}

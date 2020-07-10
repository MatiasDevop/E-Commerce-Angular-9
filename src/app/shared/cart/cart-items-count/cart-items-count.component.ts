import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs';
import { CartStore } from '@core/cart/cart-store';
import { getCartItemsCount } from '@core/cart/cart-selector';

@Component({
  selector: 'app-cart-items-count',
  templateUrl: './cart-items-count.component.html',
  styleUrls: ['./cart-items-count.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CartItemsCountComponent implements OnInit {
  totalItemsInCart$: Observable<number>;
  constructor(private cartStore: CartStore) { }

  ngOnInit(): void {
    this.totalItemsInCart$ = this.cartStore.select(getCartItemsCount);
  }

}

import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';
import { CartStore } from '@core/cart/cart-store';
import { CartService, ALLOWED_PRODUCT_QUANTITIES } from '@core/cart/cart.service';
import { Product } from '@core/products/product';
import { Observable } from 'rxjs';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { getIsItemAlreadyInCart } from '@core/cart/cart-selector';

@Component({
  selector: 'app-add-to-cart',
  templateUrl: './add-to-cart.component.html',
  styleUrls: ['./add-to-cart.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddToCartComponent implements OnInit {

  @Input() product: Product;
  availableQuantities: number[];
  quantity:number;
  isItemAlreadyInCart: Observable<boolean>;

  constructor(private cartStore: CartStore, private cartService: CartService) { }

  ngOnInit(): void {
    this.availableQuantities = ALLOWED_PRODUCT_QUANTITIES; // CART SERVICE;
    this.isItemAlreadyInCart = this.cartStore.select(
      getIsItemAlreadyInCart(this.product.productId)
    );
    this.quantity = 1;
  }
  addItemToCart() {
    this.cartService
      .addToCart(this.product, this.quantity)
      .subscribe((cartItem) => console.log("added to cart", cartItem));
  }

}

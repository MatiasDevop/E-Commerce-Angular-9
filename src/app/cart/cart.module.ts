import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CartRoutingModule } from './cart-routing.module';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';


@NgModule({
  declarations: [ShoppingCartComponent],
  imports: [
    CommonModule,
    CartRoutingModule
  ]
})
export class CartModule { }

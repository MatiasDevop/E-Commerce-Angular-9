import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SharedRoutingModule } from './shared-routing.module';
import { RouterModule } from '@angular/router';
import { PmMaterialModule } from './material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
//import { AddToCartDialogComponent } from './cart/add-to-cart-dialog/add-to-cart-dialog.component';
import { CartItemsCountComponent } from './cart/cart-items-count/cart-items-count.component';
import { AddToCartComponent } from './cart/add-to-cart/add-to-cart.component';

@NgModule({
  declarations:[CartItemsCountComponent, AddToCartComponent],
  imports: [
    CommonModule,
    SharedRoutingModule,
    RouterModule,
    PmMaterialModule
  ],
  exports:[
    PmMaterialModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    FlexLayoutModule,
    CartItemsCountComponent,
    AddToCartComponent
  ]
})
export class SharedModule { }

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './blocks/root/app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from './shared/shared.module';
import { BlocksModule } from './blocks/blocks.module';
import { CoreModule } from '@angular/flex-layout';
import { CartItemsCountComponent } from './shared/cart/cart-items-count/cart-items-count.component';
import { AddToCartComponent } from './shared/cart/add-to-cart/add-to-cart.component';

@NgModule({
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedModule,
    HttpClientModule,
    BlocksModule,
    CoreModule
  ],
  
  bootstrap: [AppComponent]
})
export class AppModule { }

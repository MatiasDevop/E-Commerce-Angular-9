import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';

import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';

import { CartService } from '@core/cart/cart.service';
import { ProductDataService } from '@core/index';
import { Product } from '@core/products/product';


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit, OnDestroy {

  dataSource = new MatTableDataSource<Product>();
  loading = true;
  subscriptions = [];
  displayedColumns = ['imgUrl', 'name', 'price', 'action'];
  
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private productDataService: ProductDataService,
                private cartService: CartService) { }

  ngOnInit(){
    this.subscriptions.push(
      this.productDataService
          .getAllProducts()
          .subscribe((products) => this.onDataLoad(products))
    );
  }
  
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(s => s.unsubscribe());
  }

  addItemToCart(product) {
    this.cartService.addToCart(product, 2);
  }
  
  onDataLoad(products: Product[]){
    this.loading = false;
    this.dataSource.sort = this.sort;// this before to get data to improve the performance 
    this.dataSource.paginator = this.paginator;
    this.dataSource.data = products; 
    
  }

 
  
}

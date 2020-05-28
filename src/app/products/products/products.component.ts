import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { ProductDataService } from '@core/index';
import { MatTableDataSource } from '@angular/material/table';
import { Product } from '@core/products/product';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit, OnDestroy {

  dataSource = new MatTableDataSource<Product>();
  loading = true;
  subscriptions = [];
  displayedColumns = ['imgUrl', 'name', 'price', 'addToCart'];
  
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor(private productDataService: ProductDataService) { }

  ngOnInit(){
    this.subscriptions.push(
      this.productDataService
          .getAllProducts()
          .subscribe(products => this.onDataLoad(products))
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(s => s.unsubscribe());
  }
  
  onDataLoad(products: Product[]){
    this.loading = false;
    this.dataSource.sort = this.sort;// this before to get data to improve the performance 
    this.dataSource.paginator = this.paginator;
    this.dataSource.data = products; 
    
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}

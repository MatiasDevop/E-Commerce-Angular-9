import { Component, OnInit } from '@angular/core';
import { ProductDataService } from '@core/index';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  products: Observable<any>;

  constructor(private productDataService: ProductDataService) { }

  ngOnInit(){
    this.products = this.productDataService.getAllProducts();
    console.log(this.products);
  }

}

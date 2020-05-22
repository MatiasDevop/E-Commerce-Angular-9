import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from './product';
import { delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductDataService {
  
  constructor(private $http:HttpClient) { }

  getAllProducts(): Observable<Product>{
    return this.$http.get('products.json').pipe(delay(2000)) as Observable<Product>;
  }
}

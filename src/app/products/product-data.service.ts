import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductDataService {
  
  constructor(private $http:HttpClient) { }

  getAllProducts(){
   return this.$http.get('products.json');
  }
}

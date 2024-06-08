import { Injectable } from '@angular/core';
import { HttpClientService } from './http-client.service';
import { Product_Create } from '../../contracts/product_create';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private httpClient : HttpClientService) { }

  addProduct(product : Product_Create, successCallBack? : () => void, errorCallBack? : () => void){
      this.httpClient.post({
        controller : "products"
      },product).subscribe( result => {
        successCallBack();
      }, error => {
        errorCallBack();
      });
      
  }





}

import { Injectable } from '@angular/core';
import { HttpClientService } from './http-client.service';
import { Product_Create } from '../../contracts/product_create';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  

  constructor(private httpClient : HttpClientService) { }

  addProduct(product : Product_Create, successCallBack? : () => void, errorCallBack? : (errorMessage : string) => void){
    this.httpClient.post({
      controller : "products"
    },product).subscribe(result => {
      successCallBack();
    }, (errorResponse : HttpErrorResponse) => {
      
        const _error : Array<{key : string, value : Array<string>}> = errorResponse.error;
        let message =  "";
        _error.forEach((v,i) => {
          v.value.forEach((v,i) => {
            message += `${v}\n\n`;
          });
        });
        errorCallBack(message);
    });

   
  }
 




}

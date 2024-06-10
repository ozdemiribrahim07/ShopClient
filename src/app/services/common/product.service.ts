import { Injectable } from '@angular/core';
import { HttpClientService } from './http-client.service';
import { Product_Create } from '../../contracts/product_create';
import { HttpErrorResponse } from '@angular/common/http';
import { Product_List } from '../../contracts/product_list';
import { Observable, catchError, firstValueFrom, map, of } from 'rxjs';

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
            message += `${v}<br>`;
          });
        });
        errorCallBack(message);
    });
  }


  async read(page : number = 0, size : number = 5,successCallBack?: () => void, errorCallBack?: (errorMessage: string) => void): Promise<{total : number , products : Product_List[]}> {

    const promiseData: Promise<{total : number , products : Product_List[]}> = this.httpClient.get<{total : number , products : Product_List[]}>({
      controller: "products",
      queryString : `page=${page}&size=${size}`
    }).toPromise();
  
      promiseData.then(d=> successCallBack())
      .catch((errorResponse: HttpErrorResponse) => errorCallBack(errorResponse.message))
  
      return await promiseData;

  }

   
    async delete(id :string, successCallBack? : () => void, errorCallBack? : (errorMessage : string) => void){
      const observable : Observable<any> = this.httpClient.delete<any>({
          controller : "products"
        },id)
        

       await firstValueFrom(observable)
    }

  
}
  
   

 






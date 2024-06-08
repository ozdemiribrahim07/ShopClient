import { Component, OnInit } from '@angular/core';
import { BaseComponent, SpinnerType } from '../../../base/base.component';
import { NgxSpinnerService } from 'ngx-spinner';
import { HttpClientService } from '../../../services/common/http-client.service';
import { Product } from '../../../contracts/product';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent  extends BaseComponent implements OnInit {

  constructor(spinner : NgxSpinnerService, private httpClient : HttpClientService){
    super(spinner);
  }

  ngOnInit(): void {

    this.showSpinner(SpinnerType.BallScaleMultiple);
    this.httpClient.get<Product[]>({
      controller : "products"
    }).subscribe(data => console.log(data));

    
   this.httpClient.delete({
     controller : "products"
   }, "04921580-a30c-4511-b600-68aace691783").subscribe();
    
  }

}

import { Component } from '@angular/core';
import { ProductService } from '../../../../services/common/product.service';
import { Product_Create } from '../../../../contracts/product_create';
import { BaseComponent, SpinnerType } from '../../../../base/base.component';
import { NgxSpinnerService } from 'ngx-spinner';
import { CustomToastrService, ToastrMessagePosition, ToastrMessageType } from '../../../../services/common/custom-toastr.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrl: './create.component.css'
})
export class CreateComponent extends BaseComponent {

constructor(spinner : NgxSpinnerService,private productService : ProductService, private toastr : CustomToastrService){
  super(spinner);
}
 

create(productName : HTMLInputElement,productPrice : HTMLInputElement,productStock : HTMLInputElement){

  this.showSpinner(SpinnerType.BallScaleMultiple);
  const create_product : Product_Create = new Product_Create();
  create_product.productname = productName.value,
  create_product.productprice = parseFloat(productPrice.value),
  create_product.productstock = parseInt(productStock.value)

  this.productService.addProduct(create_product, () => {
    this.hideSpinner(SpinnerType.BallScaleMultiple);
    this.toastr.message(`${productName.value} başarılı şekilde eklendi !`, "Başarılı", {
      messageType: ToastrMessageType.Success,
      position: ToastrMessagePosition.TopRight
    })
  }, () => {
    this.hideSpinner(SpinnerType.BallScaleMultiple);
    this.toastr.message("Ürün eklenemedi", "Hata", {
      messageType: ToastrMessageType.Error,
      position: ToastrMessagePosition.TopRight
    })
  });

}

}

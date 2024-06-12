import { Component, Inject, Input, OnInit, Output } from '@angular/core';
import { BaseDialog } from '../base/base-dialog';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FileUploadOptions } from '../../services/common/file-upload/file-upload.component';
import { ProductService } from '../../services/common/product.service';
import { Product_Images_List } from '../../contracts/product_images_list';
import { CustomToastrService, ToastrMessagePosition, ToastrMessageType } from '../../services/common/custom-toastr.service';
import { DialogService } from '../../services/common/dialog.service';
import { DeleteDialogComponent, DeleteState } from '../delete-dialog/delete-dialog.component';

declare var  $  : any;

@Component({
  selector: 'app-select-product-image-dialog',
  templateUrl: './select-product-image-dialog.component.html',
  styleUrl: './select-product-image-dialog.component.css'
})
export class SelectProductImageDialogComponent extends BaseDialog<SelectProductImageDialogComponent> implements OnInit {

  constructor(
    dialogRef : MatDialogRef<SelectProductImageDialogComponent>,
     @Inject (MAT_DIALOG_DATA) public data: SelectProductImageState | string,
      private productService : ProductService,
      private toastr: CustomToastrService,
      private dialog : DialogService
    ) 
    {
      super(dialogRef);
    }
  
  @Output() options : Partial<FileUploadOptions> = {
    acceptedFiles: ".png, .jpg, .jpeg",
    action : "upload",
    controller : "products",
    queryString : `id=${this.data}`,
    explanation :"Ürün resmi seçin.."
  }

  images : Product_Images_List[];

  async ngOnInit() {
    this.images = await this.productService.getProductImages(this.data as string);
  }


  deleteImage(imageId : string,  event : any) {

    this.dialog.openDialog({
      componentType: DeleteDialogComponent,
      data : DeleteState.Yes,
      afterClosed : () => {
        this.productService.deleteImage(this.data as string, imageId,() => {
          this.toastr.message("Resim Silindi", "Resim Silindi", {
            messageType : ToastrMessageType.Success,
            position : ToastrMessagePosition.TopRight
          })
          var card = $(event.srcElement).parent().parent().parent();
          card.fadeOut(500);
        }, (errorMessage) => {
          this.toastr.message(errorMessage, "Hata", {
            messageType : ToastrMessageType.Error,
            position : ToastrMessagePosition.TopRight
          })  
        });
      }
    })

  }
  

  
}



export enum SelectProductImageState {
  Close
}
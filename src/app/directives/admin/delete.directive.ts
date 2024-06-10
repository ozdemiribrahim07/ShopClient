import { Directive, ElementRef, EventEmitter, HostListener, Input, Output, Renderer2 } from '@angular/core';
import { HttpClientService } from '../../services/common/http-client.service';
import { ProductService } from '../../services/common/product.service';
import { CustomToastrService, ToastrMessagePosition, ToastrMessageType } from '../../services/common/custom-toastr.service';
import { MatDialog } from '@angular/material/dialog';
import { DeleteDialogComponent, DeleteState } from '../../dialogs/delete-dialog/delete-dialog.component';
import { HttpErrorResponse } from '@angular/common/http';
import { DialogService } from '../../services/common/dialog.service';


declare var $ :any;

@Directive({
  selector: '[appDelete]'
})
export class DeleteDirective {

  constructor(private elementRef : ElementRef, private _renderer :Renderer2, private httpClient : HttpClientService, private toastr : CustomToastrService, public dialog : MatDialog, private dialogService : DialogService) {

    const img = this._renderer.createElement('img');
    this._renderer.setAttribute(img, 'src', 'delete.png');
    this._renderer.setStyle(img, 'cursor', 'pointer');
    _renderer.appendChild(elementRef.nativeElement, img);

   }

   @Input() controller : string;
   @Input() id : string;
   @Output() callback :  EventEmitter<any> = new EventEmitter(); 

   @HostListener('click')
   async onClick(){
    this.dialogService.openDialog({
      componentType : DeleteDialogComponent,
      data : DeleteState.Yes,
      afterClosed : async() => {
        const tableTd : HTMLTableCellElement = this.elementRef.nativeElement;
        this.httpClient.delete({
          controller : this.controller
        },this.id).subscribe(() => {
          $(tableTd.parentElement).fadeOut(1000, () => {
            this.callback.emit();
            this.toastr.message("Başarılı şekilde silindi", "Silindi !", {
              messageType: ToastrMessageType.Success,
              position: ToastrMessagePosition.TopRight
            })
          })
          }, (error : HttpErrorResponse) => {
            this.toastr.message("Beklenmeyen bir hata ile karsılasıldı", "Hata !", {
              messageType: ToastrMessageType.Error,
              position: ToastrMessagePosition.TopRight
          });
        })
      }
    })
   } 





}



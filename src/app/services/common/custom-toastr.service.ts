import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class CustomToastrService {

  constructor(private toastr : ToastrService) {
      
   }

   message(message : string, title : string, toastrOptions : Partial<ToastrOptions>){
    
    this.toastr[toastrOptions.messageType](message, title, {
      positionClass: toastrOptions.position,
    });
   }
}


export enum ToastrMessageType{
  Success = "success",
  Error = "error",
  Info = "info",
  Warning = "warning"
}

export enum ToastrMessagePosition{
  TopRight = "toast-top-right",
  BottomRight = "toast-bottom-right",
  TopCenter = "toast-top-center",
  BottomCenter = "toast-bottom-center",
  TopLeft = "toast-top-left",
  BottomLeft = "toast-bottom-left",
}


export class ToastrOptions{
  position : ToastrMessagePosition = ToastrMessagePosition.TopRight;
  messageType : ToastrMessageType;
}
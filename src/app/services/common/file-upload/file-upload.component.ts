import { Component, Input } from '@angular/core';
import { FileSystemFileEntry, NgxFileDropEntry } from 'ngx-file-drop';
import { HttpClientService } from '../http-client.service';
import { HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { CustomToastrService, ToastrMessagePosition, ToastrMessageType } from '../custom-toastr.service';
import { MatDialog } from '@angular/material/dialog';
import { FileUploadDialogComponent } from '../../../dialogs/file-upload-dialog/file-upload-dialog.component';
import { DialogService } from '../dialog.service';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrl: './file-upload.component.css'
})
export class FileUploadComponent {

  constructor(private httpClient : HttpClientService, private toastr: CustomToastrService, private dialogRef : MatDialog, private dialogService : DialogService) {

  }

  public files: NgxFileDropEntry[] ;

  @Input() options : Partial<FileUploadOptions>

  public dropped(files: NgxFileDropEntry[]) {
    this.files = files 

    const fileData = new FormData();
    for(const file of files) {
      (file.fileEntry as FileSystemFileEntry ).file((fileEntry: File) => {
        fileData.append(file.relativePath, fileEntry, fileEntry.name); 
      });
    }

    this.dialogService.openDialog({
      componentType : FileUploadDialogComponent,
      data : FileUploadDialogState.Yes,
      afterClosed : () => {
        this.httpClient.post({
          controller : this.options.controller,
          action : this.options.action,
          queryString : this.options.queryString,
          headers : new HttpHeaders({"responseType" : "blob"})
        }, fileData).subscribe(data => {
          this.toastr.message("Dosya veya dosyalar başarılı şekilde yüklendi", "Başarılı !", {
            messageType : ToastrMessageType.Success,
            position : ToastrMessagePosition.TopRight
          })
        },(errorResponse : HttpErrorResponse) => {
          this.toastr.message("Beklenemedik bir hata gerçekleşti", "Hata !", {
            messageType : ToastrMessageType.Error,
            position : ToastrMessagePosition.TopRight
          })
        })
      }
    })
  }
}

export class FileUploadOptions {
  controller? : string;
  action? : string;
  queryString? : string;
  explanation? : string;
  acceptedFiles? : string;
}

export enum FileUploadDialogState {
  Yes,
  No
}
import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/common/auth.service';
import { CustomToastrService, ToastrMessagePosition, ToastrMessageType } from './services/common/custom-toastr.service';
import { Router } from '@angular/router';

declare var  $  : any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {

  constructor(public authService : AuthService, private toastr :CustomToastrService, private router : Router){
    authService.identityCheck();
  }

  ngOnInit(): void {
    
  }
  

  signOut(){
    localStorage.removeItem("accessToken");
    this.authService.identityCheck();
    this.router.navigate([""])
    this.toastr.message("Çıkış Yapıldı","Başarılı", {
      messageType : ToastrMessageType.Warning,
      position : ToastrMessagePosition.TopRight
    })
  }
}


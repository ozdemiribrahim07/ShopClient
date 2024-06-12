import { Component } from '@angular/core';
import { UserService } from '../../../services/common/user.service';
import { User_Login } from '../../../contracts/user_login';
import { CustomToastrService, ToastrMessagePosition, ToastrMessageType } from '../../../services/common/custom-toastr.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  constructor(private userService : UserService,private toastr : CustomToastrService) {

  }

  async login(emailorusername : string, password : string){
    await this.userService.loginUser(emailorusername,password, () => {
      this.toastr.message("Giriş Yapıldı !", "Başarılı !", {
        messageType : ToastrMessageType.Success,
        position : ToastrMessagePosition.TopRight
      })
    }, () => {
      this.toastr.message("Giriş Yapılamadı !", "Hata !", {
        messageType : ToastrMessageType.Error,
        position : ToastrMessagePosition.TopRight
      })
    })
  }


}

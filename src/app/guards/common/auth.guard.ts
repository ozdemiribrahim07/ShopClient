import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import {JwtHelperService} from '@auth0/angular-jwt';
import { CustomToastrService, ToastrMessagePosition, ToastrMessageType } from '../../services/common/custom-toastr.service';
import { AuthService, _isAuthenticated } from '../../services/common/auth.service';


export const authGuard: CanActivateFn = (route, state) => {

  const router: Router = inject(Router); 
  const toastr: CustomToastrService = inject(CustomToastrService); 


  if(!_isAuthenticated){
    router.navigate(["login"], {queryParams : { returnUrl : state.url }});
    toastr.message("Giriş Yapılması Gerekiyor !", "Hata !", {
      messageType : ToastrMessageType.Error,
      position: ToastrMessagePosition.TopRight
    })
  }

  return true;




};

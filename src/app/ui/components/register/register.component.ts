import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { User } from '../../../contracts/user';
import { UserService } from '../../../services/common/user.service';
import { User_Create } from '../../../contracts/user_create';
import { CustomToastrService, ToastrMessagePosition, ToastrMessageType } from '../../../services/common/custom-toastr.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit {

  constructor(private formBuilder : FormBuilder , private userService : UserService, private toastr : CustomToastrService) {

   }

   frm : FormGroup;
  ngOnInit(): void {
    this.frm = this.formBuilder.group({
      fullname : ["", [Validators.required, Validators.maxLength(50), Validators.minLength(5)]],
      username : ["", [Validators.required,Validators.minLength(5),Validators.maxLength(50)]],
      email : ["", [Validators.email,Validators.required]],
      password : ["", [Validators.required]],
      passwordAgain : ["", [Validators.required]]
    }, {
      validators : (group : AbstractControl) : ValidationErrors | null => {
        let password = group.get("password").value;
        let passwordAgain = group.get("passwordAgain").value;
        return password === passwordAgain ? null : {notSame : true}
      }
    })
  }

  submitted : boolean = false;
  get component(){
    return this.frm.controls;
  }

  
      async onSubmit(data : User){
        this.submitted  = true;
        if(this.frm.invalid)
          return;
      
      const result : User_Create = await this.userService.addUser(data);
      if(result.succeeded)
        this.toastr.message(result.message, "Başarılı !", {
          messageType : ToastrMessageType.Success,
          position : ToastrMessagePosition.TopRight
        })
      else
        this.toastr.message(result.message, "Hata !", {
          messageType : ToastrMessageType.Error,
          position : ToastrMessagePosition.TopRight 
        })
      } 
}

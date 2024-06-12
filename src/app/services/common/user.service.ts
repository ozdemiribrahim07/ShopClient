import { Injectable } from '@angular/core';
import { HttpClientService } from './http-client.service';
import { User } from '../../contracts/user';
import { Observable, catchError, firstValueFrom, map, of } from 'rxjs';
import { User_Create } from '../../contracts/user_create';
import { User_Login } from '../../contracts/user_login';
import { Token } from '../../contracts/token';
import { Token_Base } from '../../contracts/token_base';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient : HttpClientService) { }


  async addUser(data: User) : Promise<User_Create>{
    const obs : Observable<User_Create | User> = this.httpClient.post<User_Create | User>({
      controller : "users",
    },data)

    return  await firstValueFrom(obs) as User_Create;
  }


  async loginUser(emailorusername : string, password : string, successCallback?: () => void, errorCallback?: () => void) {
    const obs = this.httpClient.post<any | Token_Base>({
      controller : "users",
      action : "login"
    }, { emailorusername, password })

    const tokenBase : Token_Base = await firstValueFrom(obs) as Token_Base;

    if(tokenBase){
      localStorage.setItem("accessToken", tokenBase.token.accessToken);
      successCallback();
    }
    else{
      errorCallback();
    }

  }

}


import { Injectable } from '@angular/core';
import { LoginModel } from '../models/loginModel';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SingleResponseModel } from '../models/singleResponseModel';
import { LoginResponse } from '../models/loginResponse';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private httpClient : HttpClient
  ) { }

  apiUrl = "https://localhost:7286/api/";

  login( loginModel : LoginModel) : Observable<SingleResponseModel<LoginResponse>>
  {
    let requestUrl = this.apiUrl + "Auth/Login";
    return this.httpClient.post<SingleResponseModel<LoginResponse>>(requestUrl,loginModel);
  }
  register ( registerModel : any) : Observable<SingleResponseModel<LoginResponse>>
  {
    let requestUrl = this.apiUrl + "Auth/Register";
    return this.httpClient.post<SingleResponseModel<LoginResponse>>(requestUrl,registerModel);
  }

  isAuthenticated(){
    let token = localStorage.getItem("login");

    return !!token;
  }

  getAuthInfo()
  {
    let text = localStorage.getItem("login")??"";
    let json;

    if(text !=null && text !="")
    {
       json = JSON.parse(text);
    }


    return json;
  }

  logout()
  {
    localStorage.removeItem("login");
  }

}

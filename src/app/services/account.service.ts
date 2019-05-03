import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpHeaders } from "@angular/common/http";
import { Login } from '../services/login';
import { Register } from '../services/register';
import { ChangePassword} from '../interfaces/changepassword';
import { baseURIConfig, providedInConfig } from './dataconfig';
import { ForgotPassword } from './forgot-password';
import { ResetPassword } from './reset-password';
import { ValidationErrors } from '@angular/forms';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { WtpResponse } from '../interfaces/wtpresponse';
import { Tokenresponse } from './tokenresponse';

@Injectable({
  providedIn: providedInConfig
})
export class AccountService {

  constructor(private http: HttpClient) { }

  //Data from dataconfig file
  readonly BaseURI = baseURIConfig;

  //Check existence JWT in local storage
  checkExistenceToken(){
    if (localStorage.getItem('token') != null){
      return true;
    }
    return false;
  }

  //Get single item from localStorage
  getItem(name: string){
    return localStorage.getItem(name);
  }

  //Set single item to localStorage
  setItem(name: string, item: string){
    localStorage.setItem(name, item);
  }

//Set JWT in local storage
setAuthInfo(body: Tokenresponse){
  localStorage.setItem('token', body.accessToken.token);
  localStorage.setItem('expiration', body.accessToken.expiration);
  localStorage.setItem('refresh_token', body.accessToken.refresh_token);
  localStorage.setItem('userName', body.accessToken.userName);
  localStorage.setItem('photo', body.accessToken.photo);
}

//Remove JWT from local storage
removeAuthInfo(){
  localStorage.removeItem('token');
  localStorage.removeItem('expiration');
  localStorage.removeItem('refresh_token');
  localStorage.removeItem('userName');
  localStorage.removeItem('photo');
}

  //Send data from register form to API
  register(body: Register) {
    let formData = {
      UserName: body.UserName,
      Email: body.Email,
      Password: body.Passwords.Password
    };
    return this.http.post(this.BaseURI + '/Account/Register', formData);
  }

  //Send data from login form to API
  login(body: Login) {
    let formData = {
      Email: body.Email,
      Password: body.Password,
      GrantType: "password"
    };
    // return this.http.post(this.BaseURI + '/Account/Login', body);
    return this.http.post(this.BaseURI + '/Token/Auth', formData)
  }

  //Get user profile info from API
  getUserProfile() {
    return this.http.get(this.BaseURI + '/UserProfile');
  }

  // Send data from forgot password form to API
  forgotPassword(body: ForgotPassword) {
    return this.http.post(this.BaseURI + '/Account/ForgotPassword', body);
  }

  // Send data from reset password form to API
  resetPassword(body: ResetPassword) {
    return this.http.post(this.BaseURI + '/Account/ResetPassword', body);
  }

  //Send data from changePassword form to API
  changePassword(body: ChangePassword) : Observable<WtpResponse> {
    let formData = {
        CurrentPassword : body.Passwords.CurrentPassword,
        NewPassword : body.Passwords.NewPassword,
    };
    return this.http.post<WtpResponse>(this.BaseURI + '/Account/ChangePassword', formData);
  }

  // Method to get new refresh token
  getNewRefreshToken() {
    let username = localStorage.getItem('userName');
    let refreshToken = localStorage.getItem('refresh_token');
    const grantType = "refresh_token";

    return this.http.post(this.BaseURI + '/Token/Auth', {username, refreshToken,  grantType});
  }
}

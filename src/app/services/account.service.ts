import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpHeaders } from "@angular/common/http";
import { Login } from './login';
import { Register } from './register';
import { ChangePassword} from './changepassword';
import { baseURIConfig, providedInConfig } from './dataconfig';
import { ForgotPassword } from './forgot-password';
import { ResetPassword } from './reset-password';
import { ValidationErrors } from '@angular/forms';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

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

  //Set JWT in local storage
  setToken(token: string){
    localStorage.setItem('token', token);
  }

  //Remove JWT from local storage
  removeToken(){
    localStorage.removeItem('token');
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
    return this.http.post(this.BaseURI + '/Account/Login', body);
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
  changePassword(body: ChangePassword) {
    let formData = {
        CurrentPassword : body.Passwords.CurrentPassword,
        NewPassword : body.Passwords.NewPassword,
    };
    return this.http.post(this.BaseURI + '/Account/ChangePassword', formData);
  }
}

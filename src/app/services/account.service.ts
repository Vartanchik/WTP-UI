import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Login } from '../interfaces/login';
import { Register } from '../interfaces/register';
import { ChangePassword} from '../interfaces/changepassword';
import { baseURIConfig, providedInConfig } from './dataconfig';
import { ForgotPassword } from '../interfaces/forgot-password';
import { ResetPassword } from '../interfaces/reset-password';
import { Observable } from 'rxjs';
import { WtpResponse } from '../interfaces/wtpresponse';
import { Tokenresponse } from '../interfaces/tokenresponse';

@Injectable({
  providedIn: providedInConfig
})
export class AccountService {

  constructor(private http: HttpClient) { }

  //Data from dataconfig file
  readonly BaseURI = baseURIConfig;

  //Check existence JWT in local storage
  checkExistenceToken() {
    if (localStorage.getItem('token') != null) {
      return true;
    }
    return false;
  }

  //Get single item from localStorage
  getItem(name: string) {
    return localStorage.getItem(name);
  }

  //Set single item to localStorage
  setItem(name: string, item: string) {
    localStorage.setItem(name, item);
  }

  //Set JWT in local storage
  setAuthInfo(body: Tokenresponse) {
    localStorage.setItem('token', body.accessToken.token);
    localStorage.setItem('expiration', body.accessToken.expiration);
    localStorage.setItem('refresh_token', body.accessToken.refresh_token);
    localStorage.setItem('userName', body.accessToken.userName);
    localStorage.setItem('photo', body.accessToken.photo);
  }
  
  //Remove JWT from local storage
  removeAuthInfo() {
    localStorage.removeItem('token');
    localStorage.removeItem('expiration');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('userName');
    localStorage.removeItem('photo');
  }

  //Send data from register form to API
  register(body: Register) : Observable<WtpResponse> {
    let formData = {
      userName: body.userName,
      email: body.email,
      password: body.passwords.password
    };
    return this.http.post<WtpResponse>(this.BaseURI + '/Account/Register', formData);
  }

  //Send data from login form to API
  login(body: Login) : Observable<WtpResponse>{
    let formData = {
      email: body.email,
      password: body.password,
      grantType: "password"
    };
    // return this.http.post(this.BaseURI + '/Account/Login', body);
    return this.http.post<WtpResponse>(this.BaseURI + '/Token/Auth', formData)
  }

  //Get user profile info from API
  getUserProfile() {
    return this.http.get(this.BaseURI + '/UserProfile');
  }

  // Send data from forgot password form to API
  forgotPassword(body: ForgotPassword) : Observable<WtpResponse> {
    return this.http.post<WtpResponse>(this.BaseURI + '/Account/ForgotPassword', body);
  }

  // Send data from reset password form to API
  resetPassword(body: ResetPassword) : Observable<WtpResponse> {
    return this.http.post<WtpResponse>(this.BaseURI + '/Account/ResetPassword', body);
  }

  //Send data from changePassword form to API
  changePassword(body: ChangePassword) : Observable<WtpResponse> {
    return this.http.post<WtpResponse>(this.BaseURI + '/Account/ChangePassword', body);
  }

  // Method to get new refresh token
  getNewRefreshToken() {
    let username = localStorage.getItem('userName');
    let refreshToken = localStorage.getItem('refresh_token');
    const grantType = "refresh_token";

    return this.http.post(this.BaseURI + '/Token/Auth', {username, refreshToken,  grantType});
  }
}

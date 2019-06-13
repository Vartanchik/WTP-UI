import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Login} from '../interfaces/login';
import {Register} from '../interfaces/register';
import {ChangePassword} from '../interfaces/change-password';
import {baseURIConfig, providedInConfig} from './dataconfig';
import {ForgotPassword} from '../interfaces/forgot-password';
import {ResetPassword} from '../interfaces/reset-password';
import {Observable, of} from 'rxjs';
import {WtpResponse} from '../interfaces/wtp-response';
import {TokenResponse} from '../interfaces/token-response';
import {User} from '../interfaces/user';
import {CommunicationService} from './communication.service';
import { IconInfo } from '../interfaces/icon-info';
import * as jwt_decode from "jwt-decode";

@Injectable({
  providedIn: providedInConfig
})
export class AccountService {

  constructor(private http: HttpClient, private svc: CommunicationService) {
  }

  //Data from dataconfig file
  readonly BaseURI = baseURIConfig;

  //Check existence JWT in local storage
  checkExistenceToken() {
    let is = localStorage.getItem('token');
    return is === null || is === undefined
      ? false
      : true;
  }

  checkExistenceTokenAsync() {
    this.svc.setLoginValue(localStorage.getItem('token') !== null);
  }

  //Get single item from localStorage
  getItem(name: string) {
    return localStorage.getItem(name);
  }

  //Set single item to localStorage
  setItem(name: string, value: string) {
    localStorage.setItem(name, value);
  }

  //Set JWT in local storage
  setAuthInfo(body: TokenResponse) {
    localStorage.setItem('token', body.token);
    localStorage.setItem('refreshToken', body.refreshToken);
  }

  //Remove JWT from local storage
  removeAuthInfo() {
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('userName');
    localStorage.removeItem('photo');
  }

  //Send data from register form to API
  register(body: Register): Observable<WtpResponse> {
    let formData = {
      userName: body.userName,
      email: body.email,
      password: body.passwords.password
    };

    return this.http.post<WtpResponse>(this.BaseURI + '/Account/Register', formData);
  }

  //Send data from login form to API
  login(body: Login): Observable<TokenResponse> {
    return this.http.post<TokenResponse>(this.BaseURI + '/Token/GetAccess', body);
  }

  //Get user profile info from API
  getUserProfile(): Observable<User | WtpResponse> {
    return this.http.get<User | WtpResponse>(this.BaseURI + '/UserProfile');
  }

  // Send data from forgot password form to API
  forgotPassword(body: ForgotPassword): Observable<WtpResponse> {
    return this.http.post<WtpResponse>(this.BaseURI + '/Account/ForgotPassword', body);
  }

  // Send data from reset password form to API
  resetPassword(body: ResetPassword): Observable<WtpResponse> {
    return this.http.post<WtpResponse>(this.BaseURI + '/Account/ResetPassword', body);
  }

  //Send data from changePassword form to API
  changePassword(body: ChangePassword): Observable<WtpResponse> {
    return this.http.post<WtpResponse>(this.BaseURI + '/Account/ChangePassword', body);
  }

  // Method to get new refresh token
  getNewRefreshToken(): Observable<TokenResponse> {
    let refreshToken = localStorage.getItem('refreshToken');

    return this.http.post<TokenResponse>(this.BaseURI + '/Token/RefreshAccess', refreshToken);
  }

  getPhotoAndName(): Observable<IconInfo> {
    const photo = this.getItem('photo');
    const userName = this.getItem('userName');
    const token = localStorage.getItem('token');

    if ((photo == undefined || userName == undefined) && token !== undefined) {
      //Get user info for navBar - avatar and userName
      return this.getIconInfo(jwt_decode(token).UserID);
    } else {
      const icon: IconInfo = {
        userName: userName,
        photo: photo
      }
      return of(icon);
    }
  }

  deleteAccount(): Observable<WtpResponse> {
    return this.http.delete<WtpResponse>(this.BaseURI + '/Account/Delete');
  }

  // @Nazariy - why did you make a  controller action with POST method that required empty body but 1 query parameter?!
  restoreAccount(email: string) {
    return this.http.post(this.BaseURI + '/Account/Restore', {}, {
      params: new HttpParams().set('email', email)
    });
  }

  getIconInfo(userId: string): Observable<IconInfo> {
    return this.http.get<IconInfo>(`${this.BaseURI}/Info/UserIcon/${userId}`);
  }

}

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
import {TokenResponse, Token} from '../interfaces/token-response';
import {User} from '../interfaces/user';
import {CommunicationService} from './communication.service';

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
    return localStorage.getItem('token') == null
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
  setItem(name: string, item: string) {
    localStorage.setItem(name, item);
  }

  //Set JWT in local storage
  setAuthInfo(body: Token) {
    localStorage.setItem('token', body.token);
    localStorage.setItem('expiration', body.expiration);
    localStorage.setItem('refresh_token', body.refresh_token);
    localStorage.setItem('userName', body.userName);
    localStorage.setItem('photo', body.photo);
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
    let formData = {
      email: body.email,
      password: body.password,
      grantType: 'password'
    };

    return this.http.post<TokenResponse>(this.BaseURI + '/Token/Auth', formData);
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
  getNewRefreshToken() {
    let username = localStorage.getItem('userName');
    let refreshToken = localStorage.getItem('refresh_token');
    const grantType = 'refresh_token';

    return this.http.post(this.BaseURI + '/Token/Auth', {username, refreshToken, grantType});
  }

  getPhotoAndName(): Observable<User | WtpResponse> {
    const photo = this.getItem('photo');
    const userName = this.getItem('userName');

    if (photo == undefined || userName == undefined) {
      //Get user info for navBar - avatar and userName
      return this.getUserProfile();
    } else {
      const usr: User = {
        id: 0,
        userName: userName,
        email: '',
        photo: photo,
        gender: {id: 0, name: ''},
        dateOfBirth: '',
        country: {id: 0, name: ''},
        steam: '',
        languages: [{id: 0, name: ''}],
        players: [],
        teams: []
      };
      return of(usr);
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

}

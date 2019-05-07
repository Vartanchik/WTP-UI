import { Injectable } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { HttpClient } from "@angular/common/http";
import { baseURIConfig, providedInConfig } from './dataconfig';
import { User } from '../interfaces/user';
import { Observable } from 'rxjs';
import { WtpResponse } from '../interfaces/wtp-response';

@Injectable({
  providedIn: providedInConfig
})
export class UserprofileService {

  constructor(private fb: FormBuilder, private http: HttpClient) { }
  
  //Data from dataconfig file
   readonly BaseURI = baseURIConfig;

  //Check existence JWT in local storage
  checkExistenceToken() {
    if (localStorage.getItem('token') != null) {
      return true;
    }
    return false;
  }
  
   //Get user profile info from API
  getUserProfile() {
    return this.http.get(this.BaseURI + '/UserProfile');
  }

  //Send data from userUpdate form to API
  updateUserProfile(body: User) : Observable<WtpResponse> {
    body.dateOfBirth = body.dateOfBirth.formatted || body.dateOfBirth;
    
    return this.http.put<WtpResponse>(this.BaseURI + '/UserProfile', body);
  }

  //update photo and userName in localStorage
  updatePhotoAndUserNameInStorage(photo: string, userName: string) {
    localStorage.removeItem('userName');
    localStorage.removeItem('photo');
    localStorage.setItem('userName', userName);
    localStorage.setItem('photo', photo);
  }

}

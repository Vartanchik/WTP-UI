import { Injectable } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { baseURIConfig, providedInConfig } from './dataconfig';

@Injectable({
  providedIn: providedInConfig
})
export class UserprofileService {

  constructor(private fb: FormBuilder, private http: HttpClient) { }
  
  //Data from dataconfig file
   readonly BaseURI = baseURIConfig;

   //Check existence JWT in local storage
   checkExistenceToken(){
    if (localStorage.getItem('token') != null){
      return true;
    }
    return false;
  }
  
   //Get user profile info from API
  getUserProfile() {
    return this.http.get(this.BaseURI + '/UserProfile');
  }

  //Send data from userUpdate form to API
  updateUserProfile(body) {
    let formData = {
      Photo: body.Photo,
      UserName: body.UserName,
      Gender: body.Gender[0],
      DateOfBirth: body.DateOfBirth.formatted || body.DateOfBirth, 
      Languages: body.Languages,
      Country: body.Country[0],
      Steam: body.Steam
    };
    return this.http.put(this.BaseURI + '/UserProfile', formData);
  }


  //update photo and userName in localStorage
  updatePhotoAndUserNameInStorage(photo: string, userName: string){
    localStorage.removeItem('userName');
    localStorage.removeItem('photo');
    localStorage.setItem('userName', userName);
    localStorage.setItem('photo', photo);
  }

}

import { Injectable } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private fb: FormBuilder, private http: HttpClient) { }
  readonly BaseURI = 'http://localhost:61836/api';

  formModel = this.fb.group({
    confirmCheckbox:  ['', Validators.required],
    UserName: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(30)]],
    Email: ['', [Validators.required, Validators.email]],
    Passwords: this.fb.group({
      Password: ['', [Validators.required, Validators.minLength(6), Validators.pattern("^([0-9A-Za-z]{1,16})$")]],
      ConfirmPassword: ['', Validators.required]
    }, { validator: this.comparePasswords })
  });

  formModelLogin = this.fb.group({
    Email: ['', [Validators.required, Validators.email]],
    Password: ['', [Validators.required, Validators.minLength(6), Validators.pattern("^([0-9A-Za-z]{1,16})$")]]
  });

  formModelUser = this.fb.group({
    Photo: [],
    UserName: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(30)]],
    Gender:  ['', Validators.required],
    DateOfBirth: ['', Validators.required],
    Languages: ['', Validators.required],
    Country: ['', Validators.required],
    Steam: []
  });

  formModelForgotPassword = this.fb.group({
    Email: ['', [Validators.required, Validators.email]]
  });

  comparePasswords(fb: FormGroup) {
    let confirmPswrdCtrl = fb.get('ConfirmPassword');
    //passwordMismatch
    //confirmPswrdCtrl.errors={passwordMismatch:true}
    if (confirmPswrdCtrl.errors == null || 'passwordMismatch' in confirmPswrdCtrl.errors) {
      if (fb.get('Password').value != confirmPswrdCtrl.value)
        confirmPswrdCtrl.setErrors({ passwordMismatch: true });
      else
        confirmPswrdCtrl.setErrors(null);
    }
  }

  register() {
    var body = {
      UserName: this.formModel.value.UserName,
      Email: this.formModel.value.Email,
      Password: this.formModel.value.Passwords.Password
    };
    return this.http.post(this.BaseURI + '/Account/Register', body);
  }
  
  login() {
    var body = {
      Email: this.formModelLogin.value.Email,
      Password: this.formModelLogin.value.Password
    };
    return this.http.post(this.BaseURI + '/Account/Login', body);
  }

  getUserProfile() {
    return this.http.get(this.BaseURI + '/UserProfile');
  }

  updateUserProfile() {
    var body = {
      Photo: this.formModelUser.value.Photo,
      UserName: this.formModelUser.value.UserName,
      Gender: this.formModelUser.value.Gender[0],
      DateOfBirth: this.formModelUser.value.DateOfBirth.formatted || this.formModelUser.value.DateOfBirth, 
      Languages: this.formModelUser.value.Languages,
      Country: this.formModelUser.value.Country[0],
      Steam: this.formModelUser.value.Steam
    };
    return this.http.put(this.BaseURI + '/UserProfile', body);
  }

  forgotPassword() {
    var body = {
      Email: this.formModelForgotPassword.value.Email
    };
    return this.http.post(this.BaseURI + '/Account/ForgotPassword', body);
  }

}
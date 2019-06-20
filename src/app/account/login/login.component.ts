import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AccountService } from 'src/app/services/account.service';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { CommunicationService } from 'src/app/services/communication.service';
import * as jwt_decode from 'jwt-decode';
import {TaskQueue} from 'typescript-task-queue';
import { mergeMap } from 'rxjs/operators';
import { TokenResponse } from 'src/app/interfaces/token-response';
import {IsUserService} from '../../services/is-user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(
    private service: AccountService, 
    private router: Router, 
    private toastr: ToastrService, 
    private fb: FormBuilder, 
    private svc: CommunicationService,
    private isUserSvc: IsUserService)
  { }

  ngOnInit() {

    if(this.service.checkExistenceToken()) {
      this.svc.setLoginValue(true);
      this.router.navigate(['/home']);
    } else {
      this.svc.setLoginValue(false);
    }
  }

  //Validation rules - login form
  formModelLogin = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6), Validators.pattern("^([0-9A-Za-z]{1,16})$")]]
  });

  //Send data from login-form to API and process response
  async onSubmit() {
    this.service.login(this.formModelLogin.value)
    .pipe(
      mergeMap( res => {
        this.service.setAuthInfo(res);
        const id = this.decode(res);
        localStorage.setItem('id', id);
        this.svc.setUserId(id);
        return this.service.getIconInfo(id);
      })
    )
    .subscribe(
      res => {
        localStorage.setItem('photo', res.photo);
        localStorage.setItem('userName', res.userName);

        if(jwt_decode(localStorage.getItem('token')).role != 'Admin') {
          this.isUserSvc.setValue(false);
          this.router.navigate(['/home']);
        }
        else {
          this.isUserSvc.setValue(true);
          this.router.navigate(['/admin', 'users']);
        }

        this.svc.setLoginValue(true);
        this.toastr.success('Login successful.');
      },
      err => {
        if (err.error.info === 'User is deleted.') {
          this.router.navigateByUrl(`/account/restore?email=${this.formModelLogin.get('email').value}`);
        }
        this.toastr.error(err.error.info, err.error.message);
      }
    );
  }

  decode(token: TokenResponse) {
    return jwt_decode(token.token).UserID;
  }
}

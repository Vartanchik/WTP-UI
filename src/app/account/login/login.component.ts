import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AccountService } from 'src/app/services/account.service';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private service: AccountService, private router: Router, private toastr: ToastrService, private fb: FormBuilder) { }

  ngOnInit() {
    if(this.service.checkExistenceToken()){
      this.router.navigate(['/home']);
    }
  }

  //Validation rules - login form
  formModelLogin = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6), Validators.pattern("^([0-9A-Za-z]{1,16})$")]]
  });

  //Send data from login-form to API and process response
  onSubmit() {
    this.service.login(this.formModelLogin.value).subscribe(
      res => {
        this.service.setAuthInfo(res.accessToken);
        this.toastr.success(res.message);
        location.reload();
      },
      err => {
        this.toastr.error(err.error.message);
      }
    );
  }

}

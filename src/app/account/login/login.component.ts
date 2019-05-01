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
    Email: ['', [Validators.required, Validators.email]],
    Password: ['', [Validators.required, Validators.minLength(6), Validators.pattern("^([0-9A-Za-z]{1,16})$")]]
  });

  //Send data from login-form to API and process response
  onSubmit() {
    this.service.login(this.formModelLogin.value).subscribe(
      (res: any) => {
        this.service.setToken(res.token);
        //this.router.navigate(['/home']);
        location.reload();
   },
      err => {
        if (err.status == 400 || err.status == 401 || err.status == 500)
          this.toastr.error('Incorrect username or password.', 'Authentication failed.');
      }
    );
  }

}

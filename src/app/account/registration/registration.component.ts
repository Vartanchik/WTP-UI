import { Component, OnInit } from '@angular/core';
import { AccountService } from 'src/app/services/account.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

  constructor(private service: AccountService, private router: Router, private toastr: ToastrService, private fb: FormBuilder) { }

  ngOnInit() {
    this.formModelRegister.reset();
    
    if(this.service.checkExistenceToken()){
      this.router.navigate(['/home']);
    }
  }

  //Validation rules
  formModelRegister = this.fb.group({
    confirmCheckbox:  ['', Validators.required],
    UserName: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(30)]],
    Email: ['', [Validators.required, Validators.email]],
    Passwords: this.fb.group({
      Password: ['', [Validators.required, Validators.minLength(6), Validators.pattern("^([0-9A-Za-z]{1,16})$")]],
      ConfirmPassword: ['', Validators.required ]}, { validator: this.comparePasswords })
  });

  //Compare password on forms
  comparePasswords(fb: FormGroup) {
    let confirmPswrdCtrl = fb.get('ConfirmPassword');
    if (confirmPswrdCtrl.errors == null || 'passwordMismatch' in confirmPswrdCtrl.errors) {
      if (fb.get('Password').value != confirmPswrdCtrl.value)
        confirmPswrdCtrl.setErrors({ passwordMismatch: true });
      else
        confirmPswrdCtrl.setErrors(null);
    }
  }

  //Send data from register-form to API and process response
  onSubmit() {
    this.service.register(this.formModelRegister.value).subscribe(
      (res: any) => {
        if (res.succeeded) {
          this.formModelRegister.reset();
          this.router.navigateByUrl('/home');
          this.toastr.success('New user created!', 'Registration successful.');
        }
      },
      err => {
        (err.error.value).forEach(element => {
          if(element == "DuplicateUserName"){
            this.toastr.error('Username is already taken','Registration failed.');
          }
          else if(element == "DuplicateEmail"){
            this.toastr.error('Email is already taken','Registration failed.');
          }
          else{
            this.toastr.error("",'Registration failed.');
          }
      });
    });
  }

}

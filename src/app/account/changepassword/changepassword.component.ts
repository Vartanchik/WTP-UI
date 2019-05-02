import { Component, OnInit } from '@angular/core';
import { AccountService } from 'src/app/services/account.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { FormBuilder, Validators, ValidationErrors, FormGroup } from '@angular/forms';
import { WtpResponse } from '../../interfaces/wtpresponse';

@Component({
  selector: 'app-changepassword',
  templateUrl: './changepassword.component.html',
  styleUrls: ['./changepassword.component.css']
})
export class ChangePasswordComponent implements OnInit {

  constructor(private fb: FormBuilder, public service: AccountService, private router: Router, private toastr: ToastrService) { }

  ngOnInit() {
    this.formModelChangePassword.reset();
  }

  //Validation rules - changePassword form
  formModelChangePassword = this.fb.group({
    Passwords : this.fb.group({
        CurrentPassword : ['', [Validators.required]],
        NewPassword : ['', [Validators.required, Validators.minLength(6), Validators.pattern("^([0-9A-Za-z]{1,16})$")]],
        ConfirmPassword : ['', [Validators.required]]
    }, {validators : [this.checkPasswords]})
  });

  //Send data from changePassword form to API and process response
  onSubmit() {
    this.service.changePassword(this.formModelChangePassword.value).subscribe(
      res => {
        this.formModelChangePassword.reset();
        this.router.navigateByUrl('/home');
        this.toastr.success('', res.message);
      },
      (err) => {
        console.log(err);
        this.toastr.error('', err.error.message);
      }
    );
  }

  //Validate passwords in changePassword form
  checkPasswords(fb: FormGroup): ValidationErrors | null {
    let CurrentPassword = fb.get('CurrentPassword').value;
    let NewPassword = fb.get('NewPassword').value;
    let ConfirmPassword = fb.get('ConfirmPassword').value;
    
    return CurrentPassword !== NewPassword && NewPassword === ConfirmPassword
        ? null : { "notSame": true };
  }
}

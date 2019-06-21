import {Component, OnInit} from '@angular/core';
import {AccountService} from 'src/app/services/account.service';
import {ToastrService} from 'ngx-toastr';
import {Router} from '@angular/router';
import {FormBuilder, FormGroup, ValidationErrors, Validators} from '@angular/forms';

@Component({
  selector: 'app-changepassword',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

  //Validation rules - changePassword form
  formModelChangePassword = this.fb.group({
      currentPassword: ['', [Validators.required]],
      newPassword: ['', [Validators.required, Validators.minLength(6), Validators.pattern('^([0-9A-Za-z]{1,16})$')]],
      confirmPassword: ['', [Validators.required]]
    },
    {validators: [this.checkPasswords]}
  );

  constructor(private fb: FormBuilder, public service: AccountService, private router: Router, private toastr: ToastrService) {
  }

  ngOnInit() {
    this.formModelChangePassword.reset();
  }

  //Send data from changePassword form to API and process response
  onSubmit() {
    this.service.changePassword(this.formModelChangePassword.value).subscribe(
      res => {
        this.formModelChangePassword.reset();
        this.router.navigateByUrl('/home');
        this.toastr.success(res.info, res.message);
      },
      err => {
        this.toastr.error(err.error.info, err.error.message);
      }
    );
  }

  //Validate passwords in changePassword form
  checkPasswords(fb: FormGroup): ValidationErrors | null {
    let currentPassword = fb.get('currentPassword').value;
    let newPassword = fb.get('newPassword').value;
    let confirmPassword = fb.get('confirmPassword').value;

    return currentPassword !== newPassword && newPassword === confirmPassword
      ? null : {'notSame': true};
  }

}

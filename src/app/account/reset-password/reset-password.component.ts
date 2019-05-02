import { Component, OnInit } from '@angular/core';
import { AccountService } from 'src/app/services/account.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})

export class ResetPasswordComponent implements OnInit {

  userId: string;

  code: string;

  constructor(
    public service: AccountService,
    private router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private fb: FormBuilder
    ) { }

    formModelResetPassword = this.fb.group({
      Passwords: this.fb.group({
        Password: ['', [Validators.required, Validators.minLength(6), Validators.pattern('^([0-9A-Za-z]{1,16})$')]],
        ConfirmPassword: ['', Validators.required]
      }, { validator: this.comparePasswords })
    });

  comparePasswords(fb: FormGroup) {
      const confirmPswrdCtrl = fb.get('ConfirmPassword');
      if (confirmPswrdCtrl.errors == null || 'passwordMismatch' in confirmPswrdCtrl.errors) {
        if (fb.get('Password').value !== confirmPswrdCtrl.value) {
          confirmPswrdCtrl.setErrors({ passwordMismatch: true });
        } else {
          confirmPswrdCtrl.setErrors(null);
        }
      }
    }

  ngOnInit() {
    this.route.queryParamMap.subscribe(queryParams  => {
      this.userId = queryParams.get('userId');
      this.code = queryParams.get('code');
    });
  }

  onSubmit() {
    this.service.resetPassword({
      Id: this.userId,
      Password: this.formModelResetPassword.value.Passwords.Password,
      Code: this.code
    }).subscribe(
      () => {
        this.formModelResetPassword.reset();
        this.router.navigateByUrl('/home');
        this.toastr.success('Password has been reset!', 'Success!');
      },
      err => {
        err.error.value.forEach(element => {
          this.toastr.error(element, 'Error!');
        });
      }
    );
  }

}

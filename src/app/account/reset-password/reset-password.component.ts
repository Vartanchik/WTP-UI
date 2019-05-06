import { Component, OnInit } from '@angular/core';
import { AccountService } from 'src/app/services/account.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, Validators, FormGroup, ValidationErrors } from '@angular/forms';

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
    newPassword: ['', [Validators.required, Validators.minLength(6), Validators.pattern('^([0-9A-Za-z]{1,16})$')]],
    confirmPassword: ['', Validators.required]
  }, { validators : [this.checkPasswords] }
  );

  ngOnInit() {
    console.log("RESET PASSWORD");
    this.route.queryParamMap.subscribe(queryParams => {
      this.userId = queryParams.get('userId');
      this.code = queryParams.get('code');
    });

    console.log(this.userId);
    console.log(this.code);
  }

  onSubmit() {
    this.service.resetPassword({
      id: this.userId,
      newPassword: this.formModelResetPassword.get('newPassword').value,
      code: this.code
    }).subscribe(
      res => {
        this.formModelResetPassword.reset();
        this.router.navigateByUrl('/home');
        this.toastr.success('', res.message);
      },
      err => {
        console.log(err);
        this.toastr.error('', err.error.message);
      }
    );
  }

  checkPasswords(fb: FormGroup): ValidationErrors | null {
    let newPassword = fb.get('newPassword').value;
    let confirmPassword = fb.get('confirmPassword').value;
    
    console.log(newPassword);
    console.log(confirmPassword);

    return newPassword === confirmPassword
        ? null : { "notSame": true };
  }

}

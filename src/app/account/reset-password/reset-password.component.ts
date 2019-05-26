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
    this.route.queryParamMap.subscribe(queryParams => {
      this.userId = queryParams.get('userId');
      this.code = encodeURIComponent(queryParams.get('code'));
    });
  }

  onSubmit() {
    this.service.resetPassword({
      id: this.userId,
      newPassword: this.formModelResetPassword.get('newPassword').value,
      token: this.code
    }).subscribe(
      res => {
        this.formModelResetPassword.reset();
        this.router.navigateByUrl('/home');
        this.toastr.success(res.info, res.message);
      },
      err => {
        this.toastr.error(err.error.info, err.error.message);
      }
    );
  }

  checkPasswords(fb: FormGroup): ValidationErrors | null {
    const newPassword = fb.get('newPassword').value;
    const confirmPassword = fb.get('confirmPassword').value;
    return newPassword === confirmPassword
        ? null : { notSame: true };
  }
}

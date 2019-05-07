import { Component, OnInit } from '@angular/core';
import { AccountService } from 'src/app/services/account.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})

export class ForgotPasswordComponent implements OnInit {

  constructor(
    private service: AccountService,
    private router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private fb: FormBuilder
    ) { }

  formModelForgotPassword = this.fb.group({
    email: ['', [Validators.required, Validators.email]]
  });

  ngOnInit() {
    this.route.queryParamMap.subscribe(queryParam => {
      if (queryParam.get('resetIsFailed') === 'true') {
        this.toastr.error('Something went wrong! Please, try again.', 'Error!');
      }
    });
  }

  onSubmit() {
    this.service.forgotPassword(this.formModelForgotPassword.value).subscribe(
      res => {
        this.formModelForgotPassword.reset();
        this.router.navigateByUrl('/home');
        this.toastr.info(res.info, 'Note!', {disableTimeOut: true, closeButton: true});
        this.toastr.success(res.message, 'Success!');
      },
      err => {
        this.toastr.error(err.error.message, 'Error!');
      }
    );
  }
}

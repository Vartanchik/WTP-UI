import { Component, OnInit } from '@angular/core';
import { AccountService } from 'src/app/services/account.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

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
    Email: ['', [Validators.required, Validators.email]]
  });

  ngOnInit() {
    this.route.queryParamMap.subscribe(queryParam  => {
      if (queryParam.get('fell') === 'true') {
        this.toastr.error('Something went wrong! Please, try again.', 'Error!');
      }
    });
  }

  onSubmit() {
    this.service.forgotPassword(this.formModelForgotPassword.value).subscribe(
      () => {
        this.formModelForgotPassword.reset();
        this.router.navigateByUrl('/home');
        this.toastr.info('If there is no user with such email, or email is not confirmed - the letter won\'t be delivered!',
         'Note!',
          {disableTimeOut: true, closeButton: true});
        this.toastr.success('Instructions were sent. Please, check Your email.', 'Success!');
      },
      err => {
        err.error.value.forEach(element => {
          this.toastr.error(element, 'Error!');
        });
      }
    );
  }

}

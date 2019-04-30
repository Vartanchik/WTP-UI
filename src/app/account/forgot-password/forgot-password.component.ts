import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})

export class ForgotPasswordComponent implements OnInit {

  constructor(
    private service: UserService,
    private router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrService
    ) { }

  ngOnInit() {
    this.route.queryParamMap.subscribe(queryParam  => {
      if (queryParam.get('fell') === 'true') {
        this.toastr.error('Something went wrong! Please, try again.', 'Error!', {disableTimeOut: true, closeButton: true});
      }
    });
  }

  onSubmit() {
    this.service.forgotPassword().subscribe(
      () => {
        this.service.formModelForgotPassword.reset();
        this.router.navigateByUrl('/home');
        this.toastr.info('If there is no user with such email, or email is not confirmed - the letter won\'t be delivered!',
         'Note!',
          {disableTimeOut: true, closeButton: true});
        this.toastr.success('Instructions were sent. Please, check Your email.',
         'Success!',
         {disableTimeOut: true, closeButton: true});

      },
      err => {
        err.error.value.forEach(element => {
          this.toastr.error(element, 'Error!', {disableTimeOut: true, closeButton: true});
        });
      }
    );
  }

}

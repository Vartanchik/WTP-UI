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
        this.toastr.error('Please, try again.', 'Something went wrong!');
      }
    });
  }

  onSubmit() {
    this.service.forgotPassword().subscribe(
      () => {
        this.service.formModelForgotPassword.reset();
        this.router.navigateByUrl('/home');
        this.toastr.success('Please, Check Your email.', 'Instructions were sent!');
      },
      err => {
        err.error.value.forEach(element => {
          this.toastr.error(element);
        });
      }
    );
  }

}

import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})

export class ResetPasswordComponent implements OnInit {

  userId: string;

  code: string;

  constructor(
    public service: UserService,
    private router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrService
    ) { }

  ngOnInit() {
    this.route.queryParamMap.subscribe(queryParams  => {
      this.userId = queryParams.get('userId');
      this.code = queryParams.get('code');
    });
  }

  onSubmit() {
    this.service.resetPassword(this.userId, this.code).subscribe(
      () => {
        this.service.formModel.reset();
        this.router.navigateByUrl('/home');
        this.toastr.success('Password has been reset succeed!');
      },
      err => {
        err.error.value.forEach(element => {
          this.toastr.error(element);
        });
      }
    );
  }

}

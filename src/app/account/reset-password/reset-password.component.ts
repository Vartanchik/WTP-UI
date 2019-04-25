import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { HttpClient } from '@angular/common/http';
import { forEach } from '@angular/router/src/utils/collection';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {

  constructor(public service: UserService, private router: Router,private http: HttpClient, private toastr: ToastrService) { }
  
  userId: string;

  code: string;

  ngOnInit() {
    this.http.get('http://localhost:61836/api/Account/ResetPassword').subscribe(
      (res: any) => {
        this.userId = res.id,
        this.code = res.token;
      }
    )
  }

  onSubmit() {
    this.service.resetPassword(this.userId, this.code).subscribe(
      (res: any) => {
        if (res.succeeded) {
          this.service.formModel.reset();
          this.router.navigateByUrl('/home');
          this.toastr.success('Password has been reset!', 'Reseting is successful.');
        }
      },
      err => {
        (err.error.value).forEach(element => {
            this.toastr.error(element);
      });
    });
  }

}

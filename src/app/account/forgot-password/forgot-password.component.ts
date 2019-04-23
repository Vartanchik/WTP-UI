import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {

  constructor(private service: UserService, private router: Router, private toastr: ToastrService) { }

  ngOnInit() {
  }

  onSubmit() {
    this.service.forgotPassword().subscribe(
      (res: any) => {
        if (res.succeeded) {
          this.service.formModelForgotPassword.reset();
          this.router.navigateByUrl('/home');
          this.toastr.success('Instructions were sent!', 'Check Your email.');
        }
      // },
      // err => {
      //   (err.error.value).forEach(element => {
      //     if(element == "DuplicateUserName"){
      //       this.toastr.error('Username is already taken','Registration failed.');
      //     }
      //     else if(element == "DuplicateEmail"){
      //       this.toastr.error('Email is already taken','Registration failed.');
      //     }
      //     else{
      //       this.toastr.error("",'Registration failed.');
      //     }
      // });
    });
  }

}

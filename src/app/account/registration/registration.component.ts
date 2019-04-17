import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  constructor(public service: UserService, private router: Router, private toastr: ToastrService) { }

  ngOnInit() {
    this.service.formModel.reset();
    if (localStorage.getItem('token') != null)
    this.router.navigate(['/home']);
  }

  onSubmit() {
    this.service.register().subscribe(
      (res: any) => {
        if (res.succeeded) {
          this.service.formModel.reset();
          this.router.navigateByUrl('/home');
          this.toastr.success('New user created!', 'Registration successful.');
        }
      },
      err => {
        (err.error.value).forEach(element => {
          if(element == "DuplicateUserName"){
            this.toastr.error('Username is already taken','Registration failed.');
          }
          else if(element == "DuplicateEmail"){
            this.toastr.error('Email is already taken','Registration failed.');
          }
          else{
            this.toastr.error("",'Registration failed.');
          }
      });
    });
  }
}

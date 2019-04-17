import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-authdetails',
  templateUrl: './authdetails.component.html',
  styleUrls: ['./authdetails.component.css']
})
export class AuthdetailsComponent implements OnInit {
  
  userDetails;

  constructor(private router: Router, private service: UserService) { }

  private isValid: boolean = true;

  ngOnInit() {
    if(localStorage.getItem('token')){
      this.isValid = false; 

      this.service.getUserProfile().subscribe(
        res => {
          this.userDetails = res;
        },
        err => {
          console.log(err);
        },
      );
      
    }
  }

  onLogout() {
    localStorage.removeItem('token');
    this.router.navigate(['/home']);
    location.reload();
  }
}
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from '../services/account.service';
import { User } from '../interfaces/user';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {

  private photo: string;
  private userName: string;

  constructor(private router: Router, private service: AccountService) { }
  private isValid: boolean = true;

  ngOnInit() {
    if(this.service.checkExistenceToken()){
      this.isValid = false; 

      //Get user info for navBar - avatar and userName
      this.service.getUserProfile().subscribe(
        (res: User) => {
          this.photo = res.photo;
          this.userName = res.userName;
        },
        err => {
          //console.log(err);
        }
      );      
    }
  }

  //Logout user and delete JWT from local storage
  onLogout() {
    this.service.removeToken();
    this.router.navigate(['/home']);
    location.reload();
  }

}
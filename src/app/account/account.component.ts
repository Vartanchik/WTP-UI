import {Component, OnInit} from '@angular/core';
import {AccountService} from '../services/account.service';
import {CommunicationService} from '../services/communication.service';
import {of, Subscription} from 'rxjs';
import {flatMap} from 'rxjs/operators';
import {ToastrService} from 'ngx-toastr';
import {IconInfo} from '../interfaces/icon-info';
import {IsUserService} from '../services/is-user.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {

  disposable: Subscription = new Subscription();
  private isLogin: boolean = false;

  private photo: string;
  private userName: string;

  constructor(
    private toastr: ToastrService,
    private service: AccountService,
    private svc: CommunicationService,
    private isUserSvc: IsUserService) {
  }

  ngOnInit() {
    this.disposable.add(
      this.svc.getLoginValue()
        .pipe(
          flatMap(val => {
            if (val) {
              return this.service.getPhotoAndName();
            } else {
              return of({});
            }
          })
        )
        .subscribe(
          obj => {
            if (obj && obj.hasOwnProperty('photo')) {
              this.isLogin = true;
              this.photo = (obj as IconInfo).photo;
              this.userName = (obj as IconInfo).userName;
            } else {
              this.isLogin = false;
            }
          }
        )
    );
    this.service.checkExistenceTokenAsync();
  }

  //Logout user and delete JWT from local storage
  onLogout() {
    this.isLogin = false;
    this.isUserSvc.setValue(true);
    this.service.removeAuthInfo();
    this.toastr.success('Logged out.', 'Completed.');
  }

}

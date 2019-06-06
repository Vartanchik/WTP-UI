import { Component, OnInit } from '@angular/core';
import { Player } from 'src/app/interfaces/player';
import { PlayerForPlayerPage } from 'src/app/interfaces/player-for-player-page';
import { Subscription, of } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { AccountService } from 'src/app/services/account.service';
import { CommunicationService } from 'src/app/services/communication.service';
import { flatMap } from 'rxjs/operators';

@Component({
  selector: 'app-player-page',
  templateUrl: './player-page.component.html',
  styleUrls: ['./player-page.component.scss']
})
export class PlayerPageComponent implements OnInit {

  constructor(
    private toastr: ToastrService,
    private service: AccountService,
    private svc: CommunicationService
  ) { }

  disposable: Subscription = new Subscription();

  isAvailable = true;

  isLogin = false;

  player: PlayerForPlayerPage = {
    id: 0,
    photo: 'https://pbs.twimg.com/profile_images/900338165113815045/aA0Wx0uR_400x400.jpg',
    age: 18,
    name: 'name',
    rank: 'rank',
    goal: 'goal',
    decency: 1,
    server: 'server',
    country: 'country',
    languages: ['lan1', 'lan2'],
    about: 'about',
    teamId: 0,
    teamName: 'team name',
    teamLogo: 'http://localhost:5000/api/Team/Logo/12e4ead2-d52f-4d7f-b796-4b524026fc64'
  };


  ngOnInit() {
    this.disposable.add(
      this.svc.getLoginValue()
        .pipe(
          flatMap(val => {
            if (val) {
              return this.service.getPhotoAndName();
            }
            else {
              return of({});
            }
          })
        )
        .subscribe(
          obj => {
            if (obj && obj.hasOwnProperty('photo')) {
              this.isLogin = true;
            } else {
              this.isLogin = false;
            }
          }
        )
    );

  }

  invite() {

  }

}

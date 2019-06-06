import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { PlayerForPlayerPage } from 'src/app/interfaces/player-for-player-page';
import { Subscription, of } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { AccountService } from 'src/app/services/account.service';
import { CommunicationService } from 'src/app/services/communication.service';
import { flatMap } from 'rxjs/operators';
import { InfoService } from 'src/app/services/info.service';
import { TeamService } from 'src/app/services/team.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-player-page',
  templateUrl: './player-page.component.html',
  styleUrls: ['./player-page.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class PlayerPageComponent implements OnInit {

  constructor(
    private toastr: ToastrService,
    private serviceAccount: AccountService,
    private svc: CommunicationService,
    private serviceInfo: InfoService,
    private service: TeamService,
    private modalService: NgbModal
  ) { }

  closeResult: string;

  disposable: Subscription = new Subscription();

  isAvailable = true;

  isLogin = false;

  gameId = 0;

  // team which whant to invite this player
  teamId = 0;

  playerQty = -1;

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
    // check if user logined
    this.disposable.add(
      this.svc.getLoginValue()
        .pipe(
          flatMap(val => {
            if (val) {
              return this.serviceAccount.getPhotoAndName();
            } else {
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

    // get game id
    this.gameId = this.serviceInfo.getSelectedGame().id;

    // get team players quantity
    this.service.getTeamPlayersQuantity(this.gameId).subscribe(
      res => {
        this.playerQty = res;
      }
    );
  }

  invite(content) {
    if (!this.isLogin || this.isAvailable || this.playerQty === -1 || this.playerQty > 4) {
      this.openVerticallyCentered(content);
    } else {
      this.service.invitePlayer(this.player.id, this.teamId).subscribe(
        res => {
          this.toastr.success(res.info, res.message);
        },
        err => {
          this.toastr.error(err.error.message);
        }
      );
    }

  }

  openVerticallyCentered(content) {
    this.modalService.open(content, { centered: true });
  }
}

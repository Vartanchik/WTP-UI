import { Component, OnInit } from '@angular/core';
import { TeamForTeamPage } from 'src/app/interfaces/team-for-team-page';
import { ActivatedRoute } from '@angular/router';
import { Subscription, of } from 'rxjs';
import { CommunicationService } from 'src/app/services/communication.service';
import { flatMap } from 'rxjs/operators';
import { AccountService } from 'src/app/services/account.service';
import { InfoService } from 'src/app/services/info.service';
import { PlayerService } from 'src/app/services/player.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TeamService } from 'src/app/services/team.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-team-page',
  templateUrl: './team-page.component.html',
  styleUrls: ['./team-page.component.scss']
})
export class TeamPageComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private svc: CommunicationService,
    private serviceAccount: AccountService,
    private serviceInfo: InfoService,
    private servicePlayer: PlayerService,
    private modalService: NgbModal,
    private service: TeamService,
    private toastr: ToastrService
  ) { }

  // closeResult: string;
  disposable: Subscription = new Subscription();

  isLogin = false;

  game = '';

  maxTeamSize = 5;

  playersAge: number[] = [];
  minAge = 0;
  maxAge = 0;

  playersDecency: number[] = [];
  minDecency = 0;
  maxDecency = 0;

  // fields of user who want to send invite
  playerId = 0;
  userId = 0;

  team: TeamForTeamPage = {
    id: 0,
    name: '',
    photo: '',
    appUser: 0,
    game: '',
    server: '',
    goal: '',
    players: [],
    winRate: 0
  };

  ngOnInit() {
    this.route.paramMap.subscribe(
      params =>
        this.team.id = +params.get('id')
    );

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
              // get game id
              this.game = this.serviceInfo.getSelectedGame().name;
              // get player id
              this.userId = +localStorage.getItem('id');
              this.servicePlayer.getPlayersByUserId(this.userId).subscribe(
                res => {
                  if (res.length === 0) {
                    this.playerId = res.find(t => t.game === this.game).id;
                  }
                }
              );
            } else {
              this.isLogin = false;
            }
          }
        )
    );

    if (this.isLogin) {
    }

    // get team
    this.service.getTeamById(this.team.id).subscribe(
      res => {
        this.team = res;
        if (this.team.players.length !== 0) {
          this.team.players.forEach(player => {
            this.playersAge.push(player.age);
          });

          this.team.players.forEach(player => {
            this.playersDecency.push(player.decency);
          });

          this.minAge = Math.min(...this.playersAge);
          this.maxAge = Math.max(...this.playersAge);
          this.minDecency = Math.min(...this.playersDecency);
          this.maxDecency = Math.max(...this.playersDecency);
        }
      },
      err => {
        this.toastr.error(err.error.info, err.error.message);
      }
    );
  }


  makeOffer(content) {
    if (!this.isLogin) {
      this.openVerticallyCentered(content);
    } else {
      this.service.invite(this.playerId, this.team.id).subscribe(
        res => {
          this.toastr.success(res.info, res.message);
        },
        err => {
          this.toastr.error(err.error.info, err.error.message);
        }
      );
    }

  }

  openVerticallyCentered(content) {
    this.modalService.open(content, { centered: true });
  }
}

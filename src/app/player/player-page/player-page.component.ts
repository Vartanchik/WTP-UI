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
import { ActivatedRoute } from '@angular/router';
import { PlayerService } from 'src/app/services/player.service';
import { TeamSize } from 'src/app/interfaces/team-size';

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
    private serviceTeam: TeamService,
    private service: PlayerService,
    private modalService: NgbModal,
    private route: ActivatedRoute,
  ) { }

  // closeResult: string;

  disposable: Subscription = new Subscription();

  isAvailable = true;

  isLogin = false;

  gameId = 0;

  // team which whant to invite this player
  teamSize: TeamSize = {
    teamId: 0,
    playerQuantity: 0
  };

  player: PlayerForPlayerPage = {
    id: 0,
    photo: '',
    age: 0,
    name: '',
    rank: '',
    goal: '',
    decency: 1,
    server: '',
    country: '',
    languages: [],
    about: '',
    teamId: 0,
    teamName: '',
    teamPhoto: ''
  };

  ngOnInit() {

    this.route.paramMap.subscribe(
      params =>
        this.player.id = +params.get('id')
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
            } else {
              this.isLogin = false;
            }
          }
        )
    );

    // get game id
    this.gameId = this.serviceInfo.getSelectedGame().id;

    // get player
    this.service.getPlayerById(this.player.id).subscribe(
      res => {
        this.player = res;
        if (this.player.teamId === 0) {
          this.isAvailable = true;
        } else { this.isAvailable = false; }
      },
      err => {
        this.toastr.error(err.error.info, err.error.message);
      }
    );

    if (this.isLogin) {
      // get potential team size
      this.serviceTeam.getTeamSize(this.gameId).subscribe(
        res => {
          this.teamSize = res;
        },
        err => {
          this.toastr.error(err.error.info, err.error.message);
        }
      );
    }

  }

  invite(content) {
    if (!this.isLogin || this.teamSize.teamId === 0 || this.teamSize.playerQuantity > 4) {
      this.openVerticallyCentered(content);
    } else {
      this.serviceTeam.invite(this.player.id, this.teamSize.teamId).subscribe(
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

import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {PlayerForPlayerPage} from 'src/app/interfaces/player-for-player-page';
import {of, Subscription} from 'rxjs';
import {ToastrService} from 'ngx-toastr';
import {AccountService} from 'src/app/services/account.service';
import {CommunicationService} from 'src/app/services/communication.service';
import {flatMap} from 'rxjs/operators';
import {InfoService} from 'src/app/services/info.service';
import {TeamService} from 'src/app/services/team.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {ActivatedRoute} from '@angular/router';
import {PlayerService} from 'src/app/services/player.service';

@Component({
  selector: 'app-player-page',
  templateUrl: './player-page.component.html',
  styleUrls: ['./player-page.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class PlayerPageComponent implements OnInit {

  disposable: Subscription = new Subscription();

  // closeResult: string;
  isAvailable = true;
  isLogin = false;
  game = '';
  // fields of user who want to send invite
  teamId = 0;
  userId = 0;
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

  constructor(
    private toastr: ToastrService,
    private serviceAccount: AccountService,
    private svc: CommunicationService,
    private serviceInfo: InfoService,
    private serviceTeam: TeamService,
    private service: PlayerService,
    private modalService: NgbModal,
    private route: ActivatedRoute,
  ) {
  }

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
              // get game id
              this.game = this.serviceInfo.getSelectedGame().name;
              // get team id
              this.userId = +localStorage.getItem('id');
              this.serviceTeam.getTeams(this.userId).subscribe(
                res => {
                  this.teamId = res.find(t => t.game === this.game).id;
                }
              );
            } else {
              this.isLogin = false;
            }
          }
        )
    );

    // get player
    this.service.getPlayerById(this.player.id).subscribe(
      res => {
        this.player = res;
        if (this.player.teamId === 0) {
          this.isAvailable = true;
        } else {
          this.isAvailable = false;
        }
      },
      err => {
        this.toastr.error(err.error.info, err.error.message);
      }
    );

  }

  invite(content) {
    if (!this.isLogin) {
      this.openVerticallyCentered(content);
    } else {
      this.serviceTeam.invite(this.player.id, this.teamId).subscribe(
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
    this.modalService.open(content, {centered: true});
  }
}

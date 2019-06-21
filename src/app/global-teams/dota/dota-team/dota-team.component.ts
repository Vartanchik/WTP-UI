import {Component, Input, OnInit} from '@angular/core';
import {Team} from '../../models/team.model';
import {PlayerService} from 'src/app/services/player.service';
import {Player} from 'src/app/global-players/models/player.model';

@Component({
  selector: 'app-dota-team',
  templateUrl: './dota-team.component.html',
  styleUrls: ['./dota-team.component.scss']
})
export class DotaTeamComponent implements OnInit {

  @Input() team: Team;

  players: Player [];
  slotAvailable: boolean;
  showButoon: boolean;
  playersCount: number;

  constructor(
    private playerService: PlayerService,
  ) {
  }

  ngOnInit() {
    this.playerService.getPlayersByTeamId(this.team.id).subscribe(
      res => {
        this.players = res;

        this.playersCount = this.players.length;

        if (this.playersCount >= 5) {
          this.slotAvailable = false;
        } else if (this.playersCount < 5) {
          this.slotAvailable = true;
        }

      })
  }
}

import { Component, OnInit, Input } from '@angular/core';
import { Team } from 'src/app/global-teams/models/team.model';
import { PlayerService } from 'src/app/services/player.service';
import { Player } from 'src/app/global-players/models/player.model';

@Component({
  selector: 'app-team-player',
  templateUrl: './team-player.component.html',
  styleUrls: ['./team-player.component.scss']
})
export class TeamPlayerComponent implements OnInit {

  @Input() player: Player;

  showButton: boolean = false;

  constructor(
  ) { }

  ngOnInit() {
    
  }
}

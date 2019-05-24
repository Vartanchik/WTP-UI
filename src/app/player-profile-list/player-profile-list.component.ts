import { Component, OnInit, Output, EventEmitter, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Player } from '../interfaces/player';
import { PlayerService } from '../services/player.service';

@Component({
  selector: 'app-player-profile-list',
  templateUrl: './player-profile-list.component.html',
  styleUrls: ['./player-profile-list.component.scss']
})
export class PlayerProfileListComponent implements OnChanges {

  constructor(private playerService: PlayerService) { }

  @Input() userId = -1;
  @Output() createButtonPushed = new EventEmitter<boolean>();

  players: Player[] = [{
    id: 0,
    name: 'Default',
    game: 'Default',
    server: '',
    goal: '',
    about: '',
    rank: ''
  }];

  ngOnChanges(changes: SimpleChanges) {
    console.log(this.userId);
    this.playerService.getPlayersOfUser(this.userId).subscribe(
      res => {
        this.players = res;
      }
    );
  }

  createPlayer() {
    this.createButtonPushed.emit(true);
  }

}

import { Component, OnInit, Output, EventEmitter, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Player } from '../interfaces/player';
import { PlayerService } from '../services/player.service';
import { PlayerCommunicationServer } from '../services/player.communication.service';

@Component({
  selector: 'app-player-profile-list',
  templateUrl: './player-profile-list.component.html',
  styleUrls: ['./player-profile-list.component.scss']
})
export class PlayerProfileListComponent implements OnInit {

  constructor(private playerService: PlayerService, private data: PlayerCommunicationServer) { }

  public userId: number;

  private players: Player[] = [{
    id: 0,
    name: 'Default',
    game: 'Default',
    server: '',
    goal: '',
    about: '',
    rank: ''
  }];

  ngOnInit() {
    this.data.currentUserId.subscribe(id => this.userId = id);
    this.playerService.getPlayersOfUser(this.userId).subscribe(
      res => {
        this.players = res;
      }
    );
  }

  createPlayer() {
    this.data.changeListOfPlayers(false);
    this.data.changeCreatePlayer(true);
  }

}

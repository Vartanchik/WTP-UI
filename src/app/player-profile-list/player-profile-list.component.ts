import { Component, OnInit, Output, EventEmitter, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Player } from '../interfaces/player';
import { PlayerService } from '../services/player.service';
import { PlayerCommunicationServer } from '../services/player.communication.service';
import { dropdownListGamesConfig } from '../services/dataconfig';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-player-profile-list',
  templateUrl: './player-profile-list.component.html',
  styleUrls: ['./player-profile-list.component.scss']
})
export class PlayerProfileListComponent implements OnInit {

  constructor(
    private playerService: PlayerService,
    private data: PlayerCommunicationServer,
    private toastr: ToastrService) { }

  public userId: number;

  public numberOfGames: number;

  private players: Player[] = [{
    id: 0,
    name: 'Default',
    game: 'Default',
    server: '',
    goal: '',
    about: '',
    rank: '',
    decency: 0
  }];

  ngOnInit() {
    this.numberOfGames = dropdownListGamesConfig.length;
    this.data.currentUserId.subscribe(id => this.userId = id);
    this.playerService.getPlayersByUserId(this.userId).subscribe(
      res => {
        this.players = res;
      }
    );
  }

  createPlayer() {
    // Set dropdownListGame to show only uncreated game team
    const existingGames: string[] = [];
    for (let i = 0; i < this.players.length; i++) {
      existingGames.push(this.players[i].game);
    }
    this.data.setExistingGames(existingGames);
    this.data.changeListOfPlayers(false);
    this.data.changeCreatePlayer(true);
  }

  editPlayer(player: Player) {
    this.data.changeListOfPlayers(false);
    this.data.changeEditPlayer(true);
    this.data.changePlayerToEdit(player);
  }

  deletePlayer(game: string) {
    const gameId: number = dropdownListGamesConfig.find(g => g.name === game).id;
    if (confirm('Are you sure to delete ' + game + ' player?')) {
      this.playerService.deletePlayer(gameId).subscribe(
        res => {
          const index: number = this.players.indexOf(
            this.players.find(p => p.game === game)
          );
          if (index !== -1) {
            this.players.splice(index, 1);
          }
          this.toastr.success(res.info, res.message);
        },
        err => {
          this.toastr.error(err.error.message);
        }
      );
    }
  }

}

import { Component, OnInit, Output, EventEmitter, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Player } from '../../interfaces/player';
import { PlayerService } from '../../services/player.service';
import { PlayerCommunicationServer } from '../../services/player.communication.service';
import { dropdownListGamesConfig } from '../../services/dataconfig';
import { ToastrService } from 'ngx-toastr';
import { Invitation } from '../../interfaces/invitation';
import { TeamService } from '../../services/team.service';

@Component({
  selector: 'app-player-profile-list',
  templateUrl: './player-profile-list.component.html',
  styleUrls: ['./player-profile-list.component.scss']
})
export class PlayerProfileListComponent implements OnInit {

  constructor(
    private playerService: PlayerService,
    private teamService: TeamService,
    private data: PlayerCommunicationServer,
    private toastr: ToastrService) { }

  public userId: number;

  public numberOfGames: number;

  public inviteList: Invitation[] = [];

  private players: Player[] = [];

  ngOnInit() {
    this.numberOfGames = dropdownListGamesConfig.length;
    this.data.currentUserId.subscribe(id => this.userId = id);
    this.playerService.getPlayersByUserId(this.userId).subscribe(
      res => {
        this.players = res;

        this.players.forEach(player => {
          player.invitations.forEach(invitation => {
            this.inviteList.push(invitation);
          });
        });
      },
      err => {
        this.toastr.error(err.error.info, err.error.message);
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
          this.toastr.error(err.error.info, err.error.message);
        }
      );
    }
  }

  accept(invitationId: number) {
    this.teamService.acceptInvitation(invitationId, true).subscribe(
      res => {
        let index: number = this.inviteList.indexOf(
          this.inviteList.find(i => i.id === invitationId)
        );
        if (index !== -1) {
          this.inviteList.splice(index, 1);
        }
      },
      err => {
        this.toastr.error(err.error.info, err.error.message);
      }
    );
  }

  decline(invitationId: number) {
    this.teamService.acceptInvitation(invitationId, false).subscribe(
      res => {
        let index: number = this.inviteList.indexOf(
          this.inviteList.find(i => i.id === invitationId)
        );
        if (index !== -1) {
          this.inviteList.splice(index, 1);
        }
      },
      err => {
        this.toastr.error(err.error.info, err.error.message);
      }
    );
  }

}

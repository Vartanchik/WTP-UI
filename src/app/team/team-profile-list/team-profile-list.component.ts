import { Component, OnInit, OnChanges } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Team } from '../../interfaces/team';
import { TeamCommunicationService } from '../../services/team.communication.service';
import { TeamService } from '../../services/team.service';
import { dropdownListGamesConfig } from '../../services/dataconfig';
import { Invitation } from '../../interfaces/invitation';

@Component({
  selector: 'app-team-profile-list',
  templateUrl: './team-profile-list.component.html',
  styleUrls: ['./team-profile-list.component.scss']
})
export class TeamProfileListComponent implements OnInit {

  constructor(
    private teamService: TeamService,
    private data: TeamCommunicationService,
    private toastr: ToastrService) { }

  public userId: number;

  public numberOfGames: number;

  public invitations: Invitation[] = [{
    id: 0,
    playerName: '',
    teamName: '',
    author: ''
  }];

  private teams: Team[] = [{
    id: 0,
    name: '',
    photo: '',
    coach: 0,
    game: '',
    server: '',
    goal: '',
    language: '',
    players: [],
    winRate: 0
  }];

  ngOnInit() {
    this.numberOfGames = dropdownListGamesConfig.length;
    this.data.currentUserId.subscribe(id => this.userId = id);
    this.teamService.getTeams(this.userId).subscribe(
      res => {
        this.teams = res;
      }
    );

    this.teamService.getInvitationsByUserId().subscribe(
      res => {
        if (res !== null) {
          this.invitations = res;
        }
      }
    );
  }

  createTeam() {
    // Set dropdownListGame to show only uncreated game team
    const existingGames: string[] = [];
    for (let i = 0; i < this.teams.length; i++) {
      existingGames.push(this.teams[i].game);
    }
    this.data.setExistingGames(existingGames);
    this.data.changeListOfTeams(false);
    this.data.changeCreateTeam(true);
  }

  editTeam(team: Team) {
    this.data.changeTeamToEdit(team);
    this.data.changeListOfTeams(false);
    this.data.changeEditTeam(true);
  }

  deleteTeam(teamId: number) {
    if (confirm('Are you sure to delete this team?')) {
      this.teamService.deleteTeam(teamId).subscribe(
        res => {
          const index: number = this.teams.indexOf(
            this.teams.find(t => t.id === teamId)
          );
          if (index !== -1) {
            this.teams.splice(index, 1);
          }
          this.toastr.success(res.info, res.message);
        },
        err => {
          this.toastr.error(err.error.message);
        }
      );
    }
  }

  accept(invitationId: number) {
    this.teamService.acceptInvitation(invitationId).subscribe(
      res => {
        let index: number = this.invitations.indexOf(
          this.invitations.find(i => i.id === invitationId)
        );
        if (index !== -1) {
          this.invitations.splice(index, 1);
        }
      }
    );
  }

  decline(invitationId: number) {
    this.teamService.declineInvitation(invitationId).subscribe(
      res => {
        let index: number = this.invitations.indexOf(
          this.invitations.find(i => i.id === invitationId)
        );
        if (index !== -1) {
          this.invitations.splice(index, 1);
        }
      }
    );
  }

}

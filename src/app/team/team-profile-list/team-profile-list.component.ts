import {Component, OnInit} from '@angular/core';
import {ToastrService} from 'ngx-toastr';
import {Team} from '../../interfaces/team';
import {TeamCommunicationService} from '../../services/team.communication.service';
import {TeamService} from '../../services/team.service';
import {dropdownListGamesConfig} from '../../services/dataconfig';
import {Invitation} from '../../interfaces/invitation';

@Component({
  selector: 'app-team-profile-list',
  templateUrl: './team-profile-list.component.html',
  styleUrls: ['./team-profile-list.component.scss']
})
export class TeamProfileListComponent implements OnInit {

  public userId: number;
  public numberOfGames: number;
  public inviteList: Invitation[] = [];
  private teams: Team[] = [];

  constructor(
    private teamService: TeamService,
    private data: TeamCommunicationService,
    private toastr: ToastrService) {
  }

  ngOnInit() {
    this.numberOfGames = dropdownListGamesConfig.length;
    this.data.currentUserId.subscribe(id => this.userId = id);
    this.teamService.getTeams(this.userId).subscribe(
      res => {
        this.teams = res;

        this.teams.forEach(team => {
          team.invitations.forEach(invitation => {
            this.inviteList.push(invitation);
          });
        });
      },
      err => {
        this.toastr.error(err.error.info, err.error.message);
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

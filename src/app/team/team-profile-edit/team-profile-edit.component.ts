import { PlayerService } from '../../services/player.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import {
  dropdownListGoalsConfig,
  dropdownSettingsGoalsConfig,
  dropdownListServersConfig,
  dropdownSettingsServersConfig,
  dropdownListLanguagesConfig,
  dropdownSettingsLanguagesConfig
} from '../../services/dataconfig';
import { ToastrService } from 'ngx-toastr';
import { TeamService } from '../../services/team.service';
import { TeamCommunicationService } from '../../services/team.communication.service';
import { Team } from '../../interfaces/team';
import { IdItem } from '../../interfaces/id-item';
import { Item } from '../../player/player-profile-edit/item';

@Component({
  selector: 'app-team-profile-edit',
  templateUrl: './team-profile-edit.component.html',
  styleUrls: ['./team-profile-edit.component.scss']
})
export class TeamProfileEditComponent implements OnInit {

  constructor(
    private teamService: TeamService,
    private playerService: PlayerService,
    private fb: FormBuilder,
    private toastr: ToastrService,
    private data: TeamCommunicationService) { }

  team: Team = {
    id: 0,
    name: '',
    photo: '',
    appUser: 0,
    game: '',
    server: '',
    goal: '',
    language: '',
    players: [],
    winRate: 0,
    invitations: []
  };

  formModelTeam = this.fb.group({
    id: 0,
    name: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(16)]],
    server: ['', Validators.required],
    goal: ['', Validators.required],
    // language: ['', Validators.required],
    players: []
  });

  // Multiselect-dropdown - Server
  dropdownListServer = [];
  selectedServer: IdItem[] = null;
  dropdownSettingsServer = {};

  // Multiselect-dropdown - Goal
  dropdownListGoal = [];
  selectedGoal: IdItem[] = null;
  dropdownSettingsGoal = {};

  // Multiselect-dropdown - Languege
  // dropdownListLanguage = [];
  // selectedLanguage: IdItem[] = null;
  // dropdownSettingsLanguage = {};

  ngOnInit() {
    this.data.currentTeamToEdit.subscribe(p => this.team = p);
    if (this.team !== null) {
      this.setCurrentUserInfo();
      this.formModelTeam.get('id').setValue(this.team.id);
    }
    this.initializeDefaultConfig();
    this.playerService.getPlayersByTeamId(this.team.id).subscribe(
      res => {
        this.team.players = res;
      },
      err => {
        this.toastr.error(err.error.info, err.error.message);
      }
    );
  }

  onSubmit() {
    this.teamService.updateTeam(this.formModelTeam.value).subscribe(
      res => {
        this.cancel();
        this.toastr.success('Player updated.', res.message);
      },
      err => {
        this.toastr.error(err.error.info, err.error.message);
      }
    );
  }

  removePlayer(playerId: number) {
    if (confirm('Are you sure to remove player from team?')) {
      this.teamService.removePlayerFromTeam(playerId, this.team.id).subscribe(
        res => {
          this.ngOnInit();
          this.toastr.success(res.info, res.message);
        },
        err => {
          this.toastr.error(err.error.info, err.error.message);
        }
      );
    }
  }

  onFileChange(event) {
    if (event.target.files.length > 0) {
      const file: File = event.target.files[0];
      const formData = new FormData();
      formData.append('file', file);
      this.teamService.sendPhoto(formData, this.team.id).subscribe(
        res => {
          this.team.photo = res.info;
          localStorage.setItem('teamLogo', res.info);
        },
        err => {
          this.toastr.error(err.error.info, err.error.message);
        }
      );
    }
  }

  cancel() {
    this.data.changeEditTeam(false);
    this.data.changeListOfTeams(true);
  }

  private initializeDefaultConfig() {
    this.dropdownListServer = [...dropdownListServersConfig];
    this.dropdownSettingsServer = dropdownSettingsServersConfig;

    this.dropdownListGoal = [...dropdownListGoalsConfig];
    this.dropdownSettingsGoal = dropdownSettingsGoalsConfig;

    // this.dropdownListLanguage = [...dropdownListLanguagesConfig];
    // this.dropdownSettingsLanguage = dropdownSettingsLanguagesConfig;
  }

  private setCurrentUserInfo() {
    this.selectedServer = [new Item(
      dropdownListServersConfig.find(s => s.name === this.team.server).id,
      this.team.server)];

    this.selectedGoal = [new Item(
      dropdownListGoalsConfig.find(g => g.name === this.team.goal).id,
      this.team.goal)];

    // this.selectedLanguage = [new Item(
    //   dropdownListLanguagesConfig.find(l => l.name === this.team.language).id,
    //   this.team.language)];
  }

}

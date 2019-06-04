import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import {
  dropdownListGoalsConfig,
  dropdownSettingsGoalsConfig,
  dropdownListServersConfig,
  dropdownSettingsServersConfig,
  dropdownSettingsGamesConfig,
  dropdownListGamesConfig,
  dropdownListLanguagesConfig,
  dropdownSettingsLanguagesConfig
} from '../../services/dataconfig';
import { ToastrService } from 'ngx-toastr';
import { TeamService } from '../../services/team.service';
import { TeamCommunicationService } from '../../services/team.communication.service';

@Component({
  selector: 'app-team-profile-create',
  templateUrl: './team-profile-create.component.html',
  styleUrls: ['./team-profile-create.component.scss']
})
export class TeamProfileCreateComponent implements OnInit {

  constructor(
    private service: TeamService,
    private fb: FormBuilder,
    private toastr: ToastrService,
    private data: TeamCommunicationService) { }

  private existingGames: string[];

  formModelTeam = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(16)]],
    game: ['', Validators.required],
    server: ['', Validators.required],
    goal: ['', Validators.required]
    // language: ['', Validators.required]
  });

  // Multiselect-dropdown - Game
  dropdownListGame = [];
  dropdownSettingsGame = {};

  // Multiselect-dropdown - Server
  dropdownListServer = [];
  dropdownSettingsServer = {};

  // Multiselect-dropdown - Goal
  dropdownListGoal = [];
  dropdownSettingsGoal = {};

  // Multiselect-dropdown - Languege
  // dropdownListLanguage = [];
  // dropdownSettingsLanguage = {};

  ngOnInit() {
    this.initializeDefaultConfig();
    // Set dropdownListGame to show only uncreated game team
    this.data.getExistingGames.subscribe(t => this.existingGames = t);
    for (let i = 0; i < this.existingGames.length; i++) {
      let index: number = this.dropdownListGame.indexOf(
        this.dropdownListGame.find(g => g.name === this.existingGames[i])
      );
      if (index !== -1) {
        this.dropdownListGame.splice(index, 1);
      }
    }
  }

  onSubmit() {
    this.service.createTeam(this.formModelTeam.value).subscribe(
      res => {
        this.cancel();
        this.toastr.success(res.info, res.message);
      },
      err => {
        this.toastr.error(err.error.message);
      }
    );
  }

  cancel() {
    this.data.changeCreateTeam(false);
    this.data.changeListOfTeams(true);
  }

  private initializeDefaultConfig() {
    this.dropdownListGame = [...dropdownListGamesConfig];
    this.dropdownSettingsGame = dropdownSettingsGamesConfig;

    this.dropdownListServer = [...dropdownListServersConfig];
    this.dropdownSettingsServer = dropdownSettingsServersConfig;

    this.dropdownListGoal = [...dropdownListGoalsConfig];
    this.dropdownSettingsGoal = dropdownSettingsGoalsConfig;

    // this.dropdownListLanguage = [...dropdownListLanguagesConfig];
    // this.dropdownSettingsLanguage = dropdownSettingsLanguagesConfig;
  }

}

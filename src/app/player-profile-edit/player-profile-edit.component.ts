import { Component, OnInit } from '@angular/core';
import { PlayerService } from '../services/player.service';
import { PlayerCommunicationServer } from '../services/player.communication.service';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, Validators } from '@angular/forms';
import { Player } from '../interfaces/player';
import {
  dropdownListGamesConfig,
  dropdownSettingsGamesConfig,
  dropdownListServersConfig,
  dropdownSettingsServersConfig,
  dropdownListGoalsConfig,
  dropdownSettingsGoalsConfig,
  dropdownListRanksConfig,
  dropdownSettingsRanksConfig
} from '../services/dataconfig';

@Component({
  selector: 'app-player-profile-edit',
  templateUrl: './player-profile-edit.component.html',
  styleUrls: ['./player-profile-edit.component.scss']
})
export class PlayerProfileEditComponent implements OnInit {

  constructor(
    private service: PlayerService,
    private fb: FormBuilder,
    private toastr: ToastrService,
    private data: PlayerCommunicationServer) { }

    player: Player = {
      id: 0,
      name: '',
      game: '',
      server: '',
      goal: '',
      about: '',
      rank: '',
      decency: 0
    };

    formModelPlayer = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(16)]],
      game: ['', Validators.required],
      server: ['', Validators.required],
      goal: ['', Validators.required],
      about: [''],
      rank: ['', Validators.required],
      decency: [0, [Validators.required, Validators.min(1), Validators.max(10000)]]
    });

    // Multiselect-dropdown - Game
    dropdownListGame = [];
    selectedGame: string = null;
    dropdownSettingsGame = {};

    // Multiselect-dropdown - Server
    dropdownListServer = [];
    selectedServer: string = null;
    dropdownSettingsServer = {};

    // Multiselect-dropdown - Goal
    dropdownListGoal = [];
    selectedGoal: string = null;
    dropdownSettingsGoal = {};

    // Multiselect-dropdown - Rank
    dropdownListRank = [];
    selectedRank: string = null;
    dropdownSettingsRank = {};

  ngOnInit() {
    this.data.currentPlayerToEdit.subscribe(p => this.player = p);
    if (this.player !== null) {
      this.setCurrentUserInfo();
    }
    this.initializeDefaultConfig();
  }

  onSubmit() {
    this.service.createOrUpdatePlayer(this.formModelPlayer.value).subscribe(
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
    this.data.changeEditPlayer(false);
    this.data.changeListOfPlayers(true);
  }

  private initializeDefaultConfig() {
    this.dropdownListGame = dropdownListGamesConfig;
    this.dropdownSettingsGame = dropdownSettingsGamesConfig;

    this.dropdownListServer = dropdownListServersConfig;
    this.dropdownSettingsServer = dropdownSettingsServersConfig;

    this.dropdownListGoal = dropdownListGoalsConfig;
    this.dropdownSettingsGoal = dropdownSettingsGoalsConfig;

    this.dropdownListRank = dropdownListRanksConfig;
    this.dropdownSettingsRank = dropdownSettingsRanksConfig;
  }

  private setCurrentUserInfo() {
    this.selectedGame = (this.player.game);
    this.selectedServer = (this.player.server);
    this.selectedGoal = (this.player.goal);
    this.selectedRank = (this.player.rank);
  }

}

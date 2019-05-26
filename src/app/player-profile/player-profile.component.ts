import { Component, OnInit } from '@angular/core';
import { PlayerService } from '../services/player.service';
import { Player } from '../interfaces/player';
import { FormBuilder, Validators } from '@angular/forms';
import {
  dropdownListRanksConfig,
  dropdownSettingsRanksConfig,
  dropdownListGoalsConfig,
  dropdownSettingsGoalsConfig,
  dropdownListServersConfig,
  dropdownSettingsServersConfig,
  dropdownSettingsGamesConfig,
  dropdownListGamesConfig
} from '../services/dataconfig';
import { ToastrService } from 'ngx-toastr';
import { PlayerCommunicationServer } from '../services/player.communication.service';

@Component({
  selector: 'app-player-profile',
  templateUrl: './player-profile.component.html',
  styleUrls: ['./player-profile.component.scss']
})

export class PlayerProfileComponent implements OnInit {

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
  dropdownSettingsGame = {};

  // Multiselect-dropdown - Server
  dropdownListServer = [];
  dropdownSettingsServer = {};

  // Multiselect-dropdown - Goal
  dropdownListGoal = [];
  dropdownSettingsGoal = {};

  // Multiselect-dropdown - Rank
  dropdownListRank = [];
  dropdownSettingsRank = {};

  ngOnInit() {
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
    this.data.changeCreatePlayer(false);
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
}

import { Component, OnInit } from '@angular/core';
import { PlayerService } from '../../services/player.service';
import { PlayerCommunicationServer } from '../../services/player.communication.service';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, Validators } from '@angular/forms';
import { Player } from '../../interfaces/player';
import {
  dropdownListServersConfig,
  dropdownSettingsServersConfig,
  dropdownListGoalsConfig,
  dropdownSettingsGoalsConfig,
  dropdownListRanksConfig,
  dropdownSettingsRanksConfig
} from '../../services/dataconfig';
import { IdItem } from '../../interfaces/id-item';
import { Item } from './item';

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
    id: 0,
    name: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(16)]],
    server: ['', Validators.required],
    goal: ['', Validators.required],
    about: [''],
    rank: ['', Validators.required],
    decency: [0, [Validators.required, Validators.min(1), Validators.max(10000)]]
  });

  // Multiselect-dropdown - Server
  dropdownListServer = [];
  selectedServer: IdItem[] = null;
  dropdownSettingsServer = {};

  // Multiselect-dropdown - Goal
  dropdownListGoal = [];
  selectedGoal: IdItem[] = null;
  dropdownSettingsGoal = {};

  // Multiselect-dropdown - Rank
  dropdownListRank = [];
  selectedRank: IdItem[] = null;
  dropdownSettingsRank = {};

  ngOnInit() {
    this.data.currentPlayerToEdit.subscribe(p => this.player = p);
    if (this.player !== null) {
      this.setCurrentUserInfo();
      this.formModelPlayer.get('id').setValue(this.player.id);
    }
    this.initializeDefaultConfig();
  }

  onSubmit() {
    this.service.updatePlayer(this.formModelPlayer.value).subscribe(
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
    this.dropdownListServer = [...dropdownListServersConfig];
    this.dropdownSettingsServer = dropdownSettingsServersConfig;

    this.dropdownListGoal = [...dropdownListGoalsConfig];
    this.dropdownSettingsGoal = dropdownSettingsGoalsConfig;

    this.dropdownListRank = [...dropdownListRanksConfig];
    this.dropdownSettingsRank = dropdownSettingsRanksConfig;
  }

  private setCurrentUserInfo() {
    this.selectedServer = [new Item(
      dropdownListServersConfig.find(s => s.name === this.player.server).id,
      this.player.server)];

    this.selectedGoal = [new Item(
      dropdownListGoalsConfig.find(g => g.name === this.player.goal).id,
      this.player.goal)];

    this.selectedRank = [new Item(
      dropdownListRanksConfig.find(r => r.name === this.player.rank).id,
      this.player.rank)];
  }

}

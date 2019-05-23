import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { PlayerService } from '../services/player.service';
import { User } from '../interfaces/user';
import { Player } from '../interfaces/player';
import { FormBuilder, Validators, FormGroup, PatternValidator, FormControl} from '@angular/forms';
import { IdItem } from '../interfaces/id-item';
import {  dropdownListRanksConfig,
          dropdownSettingsRanksConfig,
          dropdownListGoalsConfig,
          dropdownSettingsGoalsConfig,
          dropdownListServersConfig,
          dropdownSettingsServersConfig,
          dropdownSettingsGamesConfig,
          dropdownListGamesConfig
        } from '../services/dataconfig';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-player-profile',
  templateUrl: './player-profile.component.html',
  styleUrls: ['./player-profile.component.scss']
})
export class PlayerProfileComponent implements OnInit {

  constructor(
    private service: PlayerService,
    private fb: FormBuilder,
    private toastr: ToastrService) { }

  public createButton = true;
  private playerProfile = false;

  private userProfile: User = {
    id: 0,
    userName: '',
    email: '',
    photo: '',
    gender: {id: 0, name: ''},
    dateOfBirth: '',
    country: {id: 0, name: ''},
    steam: '',
    languages: [{id: 0, name: ''}],
    players: [],
    teams: []
  };

  players: Player[] = [{
    id: 0,
    name: '',
    user: this.userProfile,
    game: {id: 0, name: ''},
    server: {id: 0, name: ''},
    goal: {id: 0, name: ''},
    about: '',
    rank: {id: 0, name: ''}
  }];

  formModelPlayer = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(16)]],
    game: ['', Validators.required],
    server: ['', Validators.required],
    goal: ['', Validators.required],
    about: [''],
    rank: ['', Validators.required]
  });
  
  //Multiselect-dropdown - Game
  dropdownListGame = [];
  selectedItemsGame: IdItem[] = null;
  dropdownSettingsGame = {};
  
  //Multiselect-dropdown - Server
  dropdownListServer = [];
  selectedItemsServer: IdItem[] = null;
  dropdownSettingsServer = {};
  
  //Multiselect-dropdown - Goal
  dropdownListGoal = [];
  selectedItemsGoal: IdItem[] = null;
  dropdownSettingsGoal = {};
  
  //Multiselect-dropdown - Rank
  dropdownListRank = [];
  selectedItemsRank: IdItem[] = null;
  dropdownSettingsRank = {};
  
  ngOnInit() {
    this.service.getPlayersOfUser().subscribe(
      res => {
        if (res.length === 0) {
          this.createButton = true;
          this.playerProfile = false;
        }
        this.createButton = false;
        this.playerProfile = true;
        this.players = res;
        this.setCurrentUserInfo();
      }
    );
    this.initializeDefaultConfig();
  }

  onSubmit(){
    this.service.createOrUpdatePlayer(this.formModelPlayer.value).subscribe(
      res => {
        this.toastr.success(res.info, res.message);
      },
      err => {
        this.toastr.error(err.error.message);
      }
    );

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

  createPlayer(){
    this.createButton = false;
    this.playerProfile = true;
  }

  performDelete() {
    //this._modalService.open(ConfirmDeleteComponent);
  }

  private setCurrentUserInfo() {
    this.selectedItemsGame = [(this.players[0].game)];
    this.selectedItemsServer = [(this.players[0].server)];
    this.selectedItemsGoal = [(this.players[0].goal)];
    this.selectedItemsRank = [(this.players[0].rank)];
  }

}

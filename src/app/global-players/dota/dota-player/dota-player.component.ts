import { Component, OnInit, Input } from '@angular/core';
import { Player } from '../../player.model';

@Component({
  selector: 'app-dota-player',
  templateUrl: './dota-player.component.html',
  styleUrls: ['./dota-player.component.scss']
})
export class DotaPlayerComponent implements OnInit {

  @Input() player: Player[];

  // player = { 
  //   "id": 1, 
  //   "name": "PlayerName", 
  //   "game": "Dota 2", 
  //   "rank": "Uncalibrated", 
  //   "server": "East", 
  //   "goal": "Fun", 
  //   "about": "xdd" 
  // };
  constructor() { }

  ngOnInit() {
  }

}

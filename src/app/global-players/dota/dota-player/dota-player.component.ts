import { Component, OnInit, Input } from '@angular/core';
import { Player } from '../../models/player.model';

@Component({
  selector: 'app-dota-player',
  templateUrl: './dota-player.component.html',
  styleUrls: ['./dota-player.component.scss']
})
export class DotaPlayerComponent implements OnInit {

  @Input() player: Player;

  constructor() { }

  ngOnInit() {
  }

}

import {Component, Input, OnInit} from '@angular/core';
import {Player} from '../../models/player.model';

@Component({
  selector: 'app-gta-player',
  templateUrl: './gta-player.component.html',
  styleUrls: ['./gta-player.component.scss']
})
export class GtaPlayerComponent implements OnInit {

  @Input() player: Player;

  constructor() {
  }

  ngOnInit() {
  }

}

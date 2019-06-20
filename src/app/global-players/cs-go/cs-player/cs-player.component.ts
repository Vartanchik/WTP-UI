import { Component, OnInit, Input } from '@angular/core';
import { Player } from '../../models/player.model';

@Component({
  selector: 'app-cs-player',
  templateUrl: './cs-player.component.html',
  styleUrls: ['./cs-player.component.scss']
})
export class CsPlayerComponent implements OnInit {

  @Input() player: Player;

  constructor() { }

  ngOnInit() {
  }

}

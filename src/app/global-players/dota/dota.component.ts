import { Component, OnInit } from '@angular/core';
import { GlobalPlayersService } from '../global-players.service';
import { Player } from '../player.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-dota',
  templateUrl: './dota.component.html',
  styleUrls: ['./dota.component.scss']
})
export class DotaComponent implements OnInit {

  players: Observable<Player[]>;

  constructor(
    private globalPlayersService: GlobalPlayersService
  ) { }

  ngOnInit() {
    this.players = this.globalPlayersService.getPlayers(1);
  }

}

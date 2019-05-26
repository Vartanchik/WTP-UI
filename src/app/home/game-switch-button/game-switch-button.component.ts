import {Component, OnInit} from '@angular/core';
import { IdItem } from 'src/app/interfaces/id-item';
import { InfoService } from 'src/app/services/info.service';

@Component({
  selector: 'app-game-switch-button',
  templateUrl: './game-switch-button.component.html',
  styleUrls: ['./game-switch-button.component.scss']
})

export class GameSwitchButtonComponent implements OnInit {

  games: IdItem[] = [{name: 'Games', id: -1}];

  constructor(private service: InfoService) { }

  ngOnInit() {
    this.service.getAllGames().subscribe(
      (res: IdItem[]) => {
        this.games = res;
        this.service.setSelectedGame(res[0]);
      }
    );
  }

  setCurrentGame(game: IdItem): void {
    this.service.setSelectedGame(game);
  }
}

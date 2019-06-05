import { Component, OnInit } from '@angular/core';
import { IdItem } from 'src/app/interfaces/id-item';
import { InfoService } from 'src/app/services/info.service';

@Component({
  selector: 'app-game-switch-button',
  templateUrl: './game-switch-button.component.html',
  styleUrls: ['./game-switch-button.component.scss']
})

export class GameSwitchButtonComponent implements OnInit {

  games: IdItem[] = [{ name: 'default', id: -1 }];

  selectedGame: IdItem = { name: 'default', id: -1 };

  gameByDefault = 'Dota 2';

  constructor(private service: InfoService) { }

  ngOnInit() {
    this.service.getAllGames().subscribe(
      (res: IdItem[]) => {
        this.games = res;

        const index: number = this.games.indexOf(
          this.games.find(g => g.name === this.gameByDefault)
        );
        if (index !== -1) {
          this.selectedGame = this.games[index];
        }

        this.service.setSelectedGame(this.selectedGame);
      }
    );
  }

  setCurrentGame(game: IdItem): void {
    this.selectedGame = game;
    this.service.setSelectedGame(game);
  }
}

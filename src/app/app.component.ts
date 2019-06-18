import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { InfoService } from './services/info.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {

  constructor(
    private router: Router,
    private infoService: InfoService
  ) {}

  title = 'wtp-ui';
  isUser = true;

  navigateToPlayers(): void {
    const selectedGame = this.infoService.getSelectedGame();

    switch (selectedGame.id) {
      case 1:
        this.router.navigate(['/players/dota']);
        break;
      case 2: 
        this.router.navigate(['/players/cs-go']);
        break;
      case 3: 
        this.router.navigate(['/players/gta']);
        break;
    }
  }

  navigateToTeams(): void {
    const selectedGame = this.infoService.getSelectedGame();

    switch (selectedGame.id) {
      case 1:
        this.router.navigate(['/teams/dota']);
        break;
      case 2: 
        this.router.navigate(['/teams/cs-go']);
        break;
      case 3: 
        this.router.navigate(['/teams/gta']);
        break;
    }
  }
}
